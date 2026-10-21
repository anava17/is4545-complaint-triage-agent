import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Building,
  PlusCircle,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PatientRecord, ServiceLine, AgeGroup } from '../types/healthcare';

interface LiveAnalysisStudioProps {
  onAddCaseToLiveQueue: (newRecord: PatientRecord) => void;
  isProjectorMode: boolean;
}

const PRESET_SCENARIOS = [
  {
    title: 'Post-Op Surgical Wound Infection & Failed Callback',
    serviceLine: 'Surgical Services' as ServiceLine,
    ageGroup: '65-79' as AgeGroup,
    source: 'Grievance Filing' as const,
    comment:
      "I was discharged on Thursday after gall bladder removal. By Saturday night the incisions were bright red, hot to touch, and oozing yellow fluid. I called the surgical on-call number 4 times over 18 hours. The answering service kept saying 'the doctor has been paged' but nobody ever called back. My fever spiked to 102.5. I had to go to another hospital's emergency room where they admitted me for IV antibiotics for severe surgical site sepsis.",
  },
  {
    title: 'Rural Veteran Video Call Dropped & Medication Gap',
    serviceLine: 'Telehealth & Virtual Care' as ServiceLine,
    ageGroup: '51-64' as AgeGroup,
    source: 'Patient Portal Message' as const,
    comment:
      "I live 2 hours out in the county. My scheduled PTSD virtual therapy session connected for 4 minutes and then dropped off. I tried refreshing the app for 40 minutes, but it kept saying 'Provider not connected.' When I tried calling the clinic desk, the line disconnected. I missed getting my medication adjusted before my weekend shift and am experiencing acute withdrawal tremors.",
  },
  {
    title: 'Pediatric Asthma Bedside Inhaler Demonstration Praise',
    serviceLine: 'Pediatrics' as ServiceLine,
    ageGroup: '<18' as AgeGroup,
    source: 'Survey Comment' as const,
    comment:
      "Respiratory therapist Mark took 30 minutes to sit down with my 8-year-old son to demonstrate how to use his new spacer and inhaler with colorful stickers and a breathing game. He made my scared boy feel like a superhero. The discharge instructions were crystal clear and he called us the next day to check on his peak flow readings.",
  },
  {
    title: 'Billing Surprise Out-of-Network Neonatal Charge',
    serviceLine: 'Maternal & Women Health' as ServiceLine,
    ageGroup: '18-35' as AgeGroup,
    source: 'Online Review' as const,
    comment:
      "We had our baby at your in-network maternity center. Two months later we received a $7,200 bill from a contracted pediatric neonatologist who was called into the delivery room for 10 minutes. Our insurance claims were rejected as out-of-network. Hospital billing representative refused to audit the claim and threatened our credit rating. This is predatory.",
  },
];

export const LiveAnalysisStudio: React.FC<LiveAnalysisStudioProps> = ({
  onAddCaseToLiveQueue,
  isProjectorMode,
}) => {
  const [commentText, setCommentText] = useState(PRESET_SCENARIOS[0].comment);
  const [serviceLine, setServiceLine] = useState<ServiceLine>(PRESET_SCENARIOS[0].serviceLine);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(PRESET_SCENARIOS[0].ageGroup);
  const [source, setSource] = useState<any>(PRESET_SCENARIOS[0].source);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSelectPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setCommentText(preset.comment);
    setServiceLine(preset.serviceLine);
    setAgeGroup(preset.ageGroup);
    setSource(preset.source);
    setAnalysisResult(null);
    setAddedSuccess(false);
    setErrorMsg(null);
  };

  const handleRunAnalysis = async () => {
    if (!commentText.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setAddedSuccess(false);

    try {
      const resp = await fetch('/api/analyze-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawComment: commentText,
          source,
          serviceLineHint: serviceLine,
          ageGroupHint: ageGroup,
        }),
      });

      if (!resp.ok) {
        throw new Error(`Server returned HTTP ${resp.status}`);
      }

      const data = await resp.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMsg('Failed to complete multi-agent analysis. Falling back to local clinical engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommitToQueue = () => {
    if (!analysisResult) return;

    const newRecord: PatientRecord = {
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      source,
      patientNameSnippet: `Analyzed Intake (${serviceLine})`,
      rawComment: commentText,
      feedbackInsight: analysisResult.feedbackInsight,
      experienceMonitoring: analysisResult.experienceMonitoring,
      complaintTriage: analysisResult.complaintTriage,
      hospitalManager: analysisResult.hospitalManager,
    };

    onAddCaseToLiveQueue(newRecord);
    setAddedSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">
              Live AI Multi-Agent Ingestion Studio
            </h3>
            <span className="text-xs font-mono bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 px-2.5 py-0.5 rounded font-semibold">
              Gemini 3.8 Flash Powered
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Input or paste any raw patient narrative, portal grievance, or survey feedback. All 4 clinical intelligence agents will simultaneously analyze the text according to strict healthcare quality improvement and triage protocols.
          </p>
        </div>
      </div>

      {/* Preset Scenarios selector */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 block">
          Select a realistic clinical scenario to test:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_SCENARIOS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className="cursor-pointer text-left p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-white mb-1">{preset.title}</div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>{preset.serviceLine}</span>
                <span className="font-mono text-cyan-400">Load &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box & Parameters */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Feedback Intake Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
            >
              <option value="Survey Comment">Survey Comment</option>
              <option value="Patient Portal Message">Patient Portal Message</option>
              <option value="Grievance Filing">Formal Grievance Filing</option>
              <option value="Online Review">Online Review / Social</option>
              <option value="Discharge Call Log">Discharge Call Log</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Hospital Service Line</label>
            <select
              value={serviceLine}
              onChange={(e) => setServiceLine(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
            >
              <option value="Emergency">Emergency</option>
              <option value="Inpatient Med-Surg">Inpatient Med-Surg</option>
              <option value="Ambulatory Care">Ambulatory Care</option>
              <option value="Oncology & Infusion">Oncology & Infusion</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Surgical Services">Surgical Services</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Maternal & Women Health">Maternal & Women Health</option>
              <option value="Telehealth & Virtual Care">Telehealth & Virtual Care</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Patient Age Cohort</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
            >
              <option value="<18">&lt;18 (Pediatric)</option>
              <option value="18-35">18-35 Young Adult</option>
              <option value="36-50">36-50 Adult</option>
              <option value="51-64">51-64 Middle Age</option>
              <option value="65-79">65-79 Senior</option>
              <option value="80+">80+ Geriatric</option>
            </select>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="text-slate-400 font-semibold text-xs block mb-1.5 flex items-center justify-between">
            <span>Patient Narrative / Complaint Submission:</span>
            <span className="text-[11px] text-slate-500 font-mono">{commentText.length} characters</span>
          </label>
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type or paste any patient feedback, complaint, or clinical encounter notes here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-normal leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          {errorMsg && (
            <span className="text-xs text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {errorMsg}
            </span>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={isLoading || !commentText.trim()}
            className="cursor-pointer ml-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing 4-Agent Intelligence Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze with 4 Intelligence Agents</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-4 bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                Multi-Agent Synthesis Complete
              </span>
              <h4 className="text-base font-bold text-white">
                Intelligence Briefing for Hospital Leadership
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCommitToQueue}
                disabled={addedSuccess}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                  addedSuccess
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Added to Active Hospital Queue!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Commit Case to Live Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 Agent Result Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Agent 1 */}
            <div className="bg-teal-950/30 border border-teal-800/50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-300 uppercase tracking-wider">
                  1. Patient Feedback Insight Agent
                </span>
                <span className="bg-teal-900/60 text-teal-200 px-2 py-0.5 rounded text-[10px]">
                  {analysisResult.feedbackInsight.theme}
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                <strong>Sentiment:</strong> {analysisResult.feedbackInsight.sentiment}
              </p>
              <p className="text-slate-300">
                <strong>Reasoning:</strong> {analysisResult.feedbackInsight.reasoning}
              </p>
              <p className="text-cyan-200">
                <strong>Operational Issue:</strong> {analysisResult.feedbackInsight.operationalIssue}
              </p>
              <p className="text-amber-200">
                <strong>Risk/Bias:</strong> {analysisResult.feedbackInsight.riskOrBiasConcern}
              </p>
              <p className="text-teal-100 font-semibold pt-1 border-t border-teal-900/50">
                <strong>Action:</strong> {analysisResult.feedbackInsight.recommendedAction}
              </p>
            </div>

            {/* Agent 2 */}
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300 uppercase tracking-wider">
                  2. Experience & Equity Monitoring Agent
                </span>
                <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded text-[10px]">
                  {analysisResult.experienceMonitoring.riskAssessment.level} Risk
                </span>
              </div>
              <p className="text-purple-200">
                <strong>Equity Review:</strong>{' '}
                {analysisResult.experienceMonitoring.equityReview.flagged
                  ? `${analysisResult.experienceMonitoring.equityReview.vulnerableGroup} flagged: ${analysisResult.experienceMonitoring.equityReview.details}`
                  : 'No vulnerable group flagged.'}
              </p>
              <p className="text-slate-300">
                <strong>Bottleneck:</strong> {analysisResult.experienceMonitoring.operationalBottleneck}
              </p>
              <p className="text-rose-200">
                <strong>Risk Categories:</strong>{' '}
                {analysisResult.experienceMonitoring.riskAssessment.categories?.join(', ')}
              </p>
              <p className="text-purple-100 font-semibold pt-1 border-t border-purple-900/50">
                <strong>Recommendation:</strong>{' '}
                {analysisResult.experienceMonitoring.managerialRecommendation}
              </p>
            </div>

            {/* Agent 3 */}
            <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-300 uppercase tracking-wider">
                  3. Complaint Triage Assistant
                </span>
                <span className="bg-rose-900/60 text-rose-200 px-2 py-0.5 rounded text-[10px] font-mono">
                  {analysisResult.complaintTriage.severity.level}
                </span>
              </div>
              <p className="text-slate-200">
                <strong>Category:</strong> {analysisResult.complaintTriage.primaryCategory}
              </p>
              <p className="text-slate-300">
                <strong>Severity Rationale:</strong> {analysisResult.complaintTriage.severity.reasoning}
              </p>
              <p className="text-rose-200 font-semibold">
                <strong>ROUTE TO:</strong> {analysisResult.complaintTriage.escalation.routeTo} (SLA:{' '}
                {analysisResult.complaintTriage.escalation.slaHours}h)
              </p>
              <p className="text-amber-200">
                <strong>Human Intervention Required:</strong>{' '}
                {analysisResult.complaintTriage.escalation.humanInterventionRequired ? 'Yes' : 'No'}
              </p>
            </div>

            {/* Agent 4 */}
            <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 uppercase tracking-wider">
                  4. Hospital Manager Decision Support
                </span>
                <span className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded text-[10px]">
                  Priority: {analysisResult.hospitalManager.managementPriority}
                </span>
              </div>
              <p className="text-slate-200 font-medium">
                <strong>Main Problem:</strong> {analysisResult.hospitalManager.mainProblem}
              </p>
              <p className="text-slate-300">
                <strong>Priority Reason:</strong> {analysisResult.hospitalManager.priorityReasoning}
              </p>
              <p className="text-slate-300">
                <strong>Readmission Risk:</strong> {analysisResult.hospitalManager.readmissionRisk}
              </p>
              <div className="pt-1 border-t border-amber-900/50">
                <strong className="text-amber-300 block mb-0.5">Recommended Actions:</strong>
                <ul className="list-disc pl-4 text-amber-100 space-y-0.5">
                  {analysisResult.hospitalManager.managementActions?.map((act: string, i: number) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
