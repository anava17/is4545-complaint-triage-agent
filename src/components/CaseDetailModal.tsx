import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Send,
  Building,
  User,
  HeartPulse,
  Scale,
  Sparkles,
  AlertTriangle,
  Clock,
  Printer,
  CheckCircle,
  Layers,
  MessageSquare,
  FileSpreadsheet
} from 'lucide-react';
import { PatientRecord, RouteTarget } from '../types/healthcare';

interface CaseDetailModalProps {
  record: PatientRecord | null;
  onClose: () => void;
  onUpdateRecordRoute?: (recordId: string, newRoute: RouteTarget) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  record,
  onClose,
  onUpdateRecordRoute,
}) => {
  const [activeTab, setActiveTab] = useState<'unified' | 'agent1' | 'agent2' | 'agent3' | 'agent4'>('unified');
  const [acknowledged, setAcknowledged] = useState(false);

  if (!record) return null;

  const fi = record.feedbackInsight;
  const em = record.experienceMonitoring;
  const ct = record.complaintTriage;
  const hm = record.hospitalManager;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded">
                CASE {record.id}
              </span>
              <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                {record.source}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {record.timestamp}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  ct.severity.level.includes('Level 4')
                    ? 'bg-rose-500 text-white'
                    : ct.severity.level.includes('Level 3')
                    ? 'bg-orange-500 text-slate-950'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {ct.severity.level}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {hm.patientPersona}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Service Line: <span className="text-slate-200 font-medium">{hm.serviceLine}</span> • Visit Type: {hm.visitType} • Age: {hm.ageGroup}
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-5 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('unified')}
            className={`cursor-pointer py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'unified'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4-Agent Unified Executive Synthesis</span>
          </button>

          <button
            onClick={() => setActiveTab('agent1')}
            className={`cursor-pointer py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'agent1'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>Agent 1: Feedback Insight</span>
          </button>

          <button
            onClick={() => setActiveTab('agent2')}
            className={`cursor-pointer py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'agent2'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>Agent 2: Experience & Equity</span>
          </button>

          <button
            onClick={() => setActiveTab('agent3')}
            className={`cursor-pointer py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'agent3'
                ? 'border-rose-400 text-rose-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>Agent 3: Complaint Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('agent4')}
            className={`cursor-pointer py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'agent4'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>Agent 4: Decision Support</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Verbatim Patient Comment Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> Verbatim Patient Narrative
              </span>
              <span>Source: {record.source}</span>
            </div>
            <p className="text-sm text-slate-100 italic leading-relaxed bg-slate-900/60 p-3 rounded-lg border-l-3 border-cyan-500">
              "{record.rawComment}"
            </p>
          </div>

          {/* Unified View */}
          {activeTab === 'unified' && (
            <div className="space-y-6">
              {/* Top synthesis metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Primary Theme</span>
                  <span className="text-white font-bold text-sm">{fi.theme}</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">Sentiment: {fi.sentiment}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Severity Assessment</span>
                  <span className="text-rose-400 font-bold text-sm">{ct.severity.level}</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">Target SLA: {ct.escalation.slaHours}h</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Escalation Target</span>
                  <span className="text-amber-400 font-bold text-sm truncate block">{ct.escalation.routeTo}</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">
                    Human Review: {ct.escalation.humanInterventionRequired ? 'Required' : 'Automated'}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Management Priority</span>
                  <span className="text-cyan-400 font-bold text-sm">{hm.managementPriority} Priority</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">Readmission Risk: {hm.readmissionRisk}</span>
                </div>
              </div>

              {/* 4 Agent Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Agent 1 Card */}
                <div className="bg-teal-950/20 border border-teal-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                      Agent 1: Feedback Insight
                    </span>
                    <span className="text-[10px] bg-teal-900/60 text-teal-200 px-2 py-0.5 rounded">
                      Clinical Tone
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Reasoning:</strong>
                      <p className="text-slate-300 text-[11px]">{fi.reasoning}</p>
                    </div>
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Operational Issue:</strong>
                      <p className="text-slate-300 text-[11px]">{fi.operationalIssue}</p>
                    </div>
                    <div>
                      <strong className="text-amber-400 block text-[11px]">Risk or Bias Concern:</strong>
                      <p className="text-slate-300 text-[11px]">{fi.riskOrBiasConcern}</p>
                    </div>
                    <div className="pt-1.5 border-t border-teal-900/40">
                      <strong className="text-teal-300 block text-[11px]">Recommended Action:</strong>
                      <p className="text-teal-100 font-medium text-[11px]">{fi.recommendedAction}</p>
                    </div>
                  </div>
                </div>

                {/* Agent 2 Card */}
                <div className="bg-purple-950/20 border border-purple-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Agent 2: Experience & Equity
                    </span>
                    <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded">
                      Vulnerable Groups
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Healthcare Equity Review:</strong>
                      <p className="text-purple-200 text-[11px]">
                        {em.equityReview.flagged
                          ? `Flagged: ${em.equityReview.vulnerableGroup} — ${em.equityReview.details}`
                          : 'No demographic disparity flagged.'}
                      </p>
                    </div>
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Operational Bottleneck:</strong>
                      <p className="text-slate-300 text-[11px]">{em.operationalBottleneck}</p>
                    </div>
                    <div>
                      <strong className="text-rose-400 block text-[11px]">
                        Risk Level ({em.riskAssessment.level}):
                      </strong>
                      <p className="text-slate-300 text-[11px]">{em.riskAssessment.rationale}</p>
                    </div>
                    <div className="pt-1.5 border-t border-purple-900/40">
                      <strong className="text-purple-300 block text-[11px]">Managerial Recommendation:</strong>
                      <p className="text-purple-100 font-medium text-[11px]">{em.managerialRecommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Agent 3 Card */}
                <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                      Agent 3: Complaint Triage
                    </span>
                    <span className="text-[10px] bg-rose-900/60 text-rose-200 px-2 py-0.5 rounded">
                      Routing & Safety
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Category:</strong>
                      <span className="text-slate-200 text-[11px] font-semibold">{ct.primaryCategory}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Severity Rationale:</strong>
                      <p className="text-slate-300 text-[11px]">{ct.severity.reasoning}</p>
                    </div>
                    <div>
                      <strong className="text-amber-400 block text-[11px]">Detected Risks:</strong>
                      <ul className="list-disc pl-4 text-slate-300 text-[11px] space-y-0.5">
                        {ct.riskDetection.map((r, i) => (
                          <li key={i}>
                            <strong>{r.riskType}:</strong> {r.explanation}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-1.5 border-t border-rose-900/40">
                      <strong className="text-rose-300 block text-[11px]">Escalation Route:</strong>
                      <p className="text-rose-100 font-medium text-[11px]">
                        Route to {ct.escalation.routeTo} (SLA: {ct.escalation.slaHours}h)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agent 4 Card */}
                <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Agent 4: Decision Support
                    </span>
                    <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded">
                      Hospital Management
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Main Problem:</strong>
                      <p className="text-slate-200 text-[11px] font-semibold">{hm.mainProblem}</p>
                    </div>
                    <div>
                      <strong className="text-slate-400 block text-[11px]">Priority Reason:</strong>
                      <p className="text-slate-300 text-[11px]">{hm.priorityReasoning}</p>
                    </div>
                    <div>
                      <strong className="text-amber-400 block text-[11px]">Safety / Equity Concerns:</strong>
                      <p className="text-slate-300 text-[11px]">{hm.safetyEquityConcerns}</p>
                    </div>
                    <div className="pt-1.5 border-t border-amber-900/40">
                      <strong className="text-amber-300 block text-[11px]">Management Directives:</strong>
                      <ul className="list-disc pl-4 text-amber-100 text-[11px] space-y-0.5 font-medium">
                        {hm.managementActions.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Individual Agent Detailed Tabs */}
          {activeTab === 'agent1' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-teal-400 text-sm">Agent 1: Complete Patient Feedback Insight Analysis</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">1. Theme</span>
                  <span className="text-white font-bold text-sm">{fi.theme}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">2. Sentiment</span>
                  <span className="text-white font-bold text-sm">{fi.sentiment}</span>
                </div>
              </div>
              <div className="text-xs space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-teal-300 block mb-1">3. Clinical Reasoning:</strong>
                  <p className="text-slate-200 leading-relaxed">{fi.reasoning}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-cyan-300 block mb-1">4. Operational Healthcare Process Issue:</strong>
                  <p className="text-slate-200 leading-relaxed">{fi.operationalIssue}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">5. Risk or Bias Concern:</strong>
                  <p className="text-slate-200 leading-relaxed">{fi.riskOrBiasConcern}</p>
                </div>
                <div className="bg-teal-950/40 p-3.5 rounded-lg border border-teal-800/60">
                  <strong className="text-teal-300 block mb-1">6. Recommended Managerial Action:</strong>
                  <p className="text-teal-100 font-semibold leading-relaxed">{fi.recommendedAction}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent2' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-purple-400 text-sm">Agent 2: Experience & Healthcare Equity Assessment</h4>
              <div className="text-xs space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-purple-300 block mb-1">STEP 1: Theme Classification</strong>
                  <p className="text-white font-medium">Primary: {em.primaryTheme}</p>
                  <p className="text-slate-400 mt-0.5">Secondary: {em.secondaryThemes?.join(', ') || 'None'}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-cyan-300 block mb-1">STEP 2: Operational Bottleneck Identification</strong>
                  <p className="text-slate-200 leading-relaxed">{em.operationalBottleneck}</p>
                </div>
                <div className="bg-purple-950/30 p-3.5 rounded-lg border border-purple-800/60">
                  <strong className="text-purple-300 block mb-1">STEP 3: Healthcare Equity & Accessibility Review</strong>
                  <p className="text-purple-100 font-medium">
                    Vulnerable Group: {em.equityReview.vulnerableGroup} (Flagged: {em.equityReview.flagged ? 'Yes' : 'No'})
                  </p>
                  <p className="text-purple-200 mt-1 leading-relaxed">{em.equityReview.details}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-rose-300 block mb-1">STEP 4: Risk Assessment ({em.riskAssessment.level})</strong>
                  <div className="flex gap-1.5 my-1">
                    {em.riskAssessment.categories.map((c) => (
                      <span key={c} className="bg-rose-950 px-2 py-0.5 rounded text-[10px] text-rose-300 font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-300 mt-1">{em.riskAssessment.rationale}</p>
                </div>
                <div className="bg-purple-950/40 p-3.5 rounded-lg border border-purple-800/60">
                  <strong className="text-purple-300 block mb-1">STEP 5: Managerial Recommendation</strong>
                  <p className="text-purple-100 font-semibold leading-relaxed">{em.managerialRecommendation}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent3' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-rose-400 text-sm">Agent 3: Complaint Triage & Routing Matrix</h4>
              <div className="text-xs space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-rose-300 block mb-1">STEP 1: Complaint Category</strong>
                  <span className="text-white font-bold">{ct.primaryCategory}</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-rose-300 block mb-1">STEP 2: Severity Assessment ({ct.severity.level})</strong>
                  <p className="text-slate-200 leading-relaxed">{ct.severity.reasoning}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">STEP 5: Risk Detection</strong>
                  <div className="space-y-1.5 mt-1">
                    {ct.riskDetection.map((r, i) => (
                      <div key={i} className="text-slate-300">
                        <span className="text-amber-400 font-semibold">• {r.riskType}:</span> {r.explanation}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-rose-950/40 p-3.5 rounded-lg border border-rose-800/60">
                  <strong className="text-rose-300 block mb-1">STEP 6: Escalation Recommendation</strong>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">ROUTE TO: {ct.escalation.routeTo}</span>
                    <span className="bg-rose-900 text-rose-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      SLA: {ct.escalation.slaHours} Hours
                    </span>
                  </div>
                  <p className="text-rose-100 text-xs mb-1.5">{ct.escalation.routingReason}</p>
                  <p className="text-slate-300 text-[11px]">
                    Human Review Required: <strong className="text-white">{ct.escalation.humanInterventionRequired ? 'Yes' : 'No'}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent4' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-amber-400 text-sm">Agent 4: Hospital Manager Decision Support Audit</h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Patient Satisfaction</span>
                  <span className="text-white font-bold text-sm font-mono">{hm.patientSatisfaction}/10</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Communication Rating</span>
                  <span className="text-white font-bold text-sm font-mono">{hm.communicationRating}/5</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Readmission Risk</span>
                  <span className="text-white font-bold text-sm font-mono">{hm.readmissionRisk}</span>
                </div>
              </div>
              <div className="text-xs space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">1. Main Operational Problem:</strong>
                  <p className="text-slate-200 leading-relaxed">{hm.mainProblem}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-slate-400 block mb-1">2. Secondary Problems:</strong>
                  <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                    {hm.secondaryProblems.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-rose-300 block mb-1">3. Priority ({hm.managementPriority}):</strong>
                  <p className="text-slate-200">{hm.priorityReasoning}</p>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">5. Recommended Management Actions:</strong>
                  <ul className="list-disc pl-4 text-amber-100 font-medium space-y-1">
                    {hm.managementActions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-950/30 p-3.5 rounded-lg border border-amber-800/60">
                  <strong className="text-amber-300 block mb-1">AI Risk Flags & Oversight:</strong>
                  <p className="text-slate-300 text-xs">{hm.aiRiskFlags.flagNotes}</p>
                  <div className="mt-1 flex gap-2 text-[10px] text-slate-400">
                    <span>Hallucination Risk: {hm.aiRiskFlags.hallucinationRisk ? 'Yes' : 'No'}</span>
                    <span>•</span>
                    <span>Bias Review: {hm.aiRiskFlags.biasReview ? 'Flagged' : 'No'}</span>
                    <span>•</span>
                    <span>Human Review: {hm.aiRiskFlags.humanReviewRequired ? 'Required' : 'Optional'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-semibold text-slate-300">Escalation Status:</span>
            {acknowledged ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Acknowledged by Leadership
              </span>
            ) : (
              <span className="text-amber-400 font-semibold">Pending Triage Review</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!acknowledged && (
              <button
                onClick={() => setAcknowledged(true)}
                className="cursor-pointer px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
              >
                Acknowledge Escalation
              </button>
            )}
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
