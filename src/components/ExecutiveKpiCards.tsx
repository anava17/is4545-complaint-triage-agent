import React from 'react';
import {
  TrendingUp,
  AlertOctagon,
  Users,
  Clock,
  HeartPulse,
  Scale,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PatientRecord } from '../types/healthcare';

interface ExecutiveKpiCardsProps {
  records: PatientRecord[];
  isProjectorMode: boolean;
}

export const ExecutiveKpiCards: React.FC<ExecutiveKpiCardsProps> = ({ records, isProjectorMode }) => {
  const total = records.length;
  const criticalOrHigh = records.filter(
    (r) =>
      r.complaintTriage.severity.level.includes('Level 4') ||
      r.complaintTriage.severity.level.includes('Level 3') ||
      r.hospitalManager.managementPriority === 'High'
  ).length;

  const equityFlagged = records.filter((r) => r.experienceMonitoring.equityReview.flagged).length;
  const humanReviewNeeded = records.filter(
    (r) => r.hospitalManager.humanReviewNeeded || r.complaintTriage.escalation.humanInterventionRequired
  ).length;

  const negativeSentiment = records.filter((r) => r.feedbackInsight.sentiment === 'Negative').length;
  const positiveSentiment = records.filter((r) => r.feedbackInsight.sentiment === 'Positive').length;
  const highReadmissionRisk = records.filter((r) => r.hospitalManager.readmissionRisk === 'High').length;

  const cardPadding = isProjectorMode ? 'p-5' : 'p-4';
  const titleSize = isProjectorMode ? 'text-sm font-semibold tracking-wide' : 'text-xs font-medium';
  const valSize = isProjectorMode ? 'text-3xl font-extrabold' : 'text-2xl font-bold';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* KPI 1: Active Cases */}
      <div className={`rounded-xl border border-slate-800 bg-slate-900/70 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className={titleSize}>Total Ingested</span>
          <TrendingUp className="w-4 h-4 text-sky-400" />
        </div>
        <div>
          <div className={`${valSize} text-white font-mono`}>{total}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-400 font-semibold">{positiveSentiment} pos</span>
            <span>•</span>
            <span className="text-rose-400 font-semibold">{negativeSentiment} neg</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Critical & High Priority */}
      <div className={`rounded-xl border border-rose-900/60 bg-rose-950/20 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-rose-300 mb-1">
          <span className={titleSize}>Critical & High Triage</span>
          <AlertOctagon className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <div className={`${valSize} text-rose-400 font-mono`}>{criticalOrHigh}</div>
          <div className="text-xs text-rose-300/80 mt-1">
            {Math.round((criticalOrHigh / (total || 1)) * 100)}% of intake volume
          </div>
        </div>
      </div>

      {/* KPI 3: Equity & Accessibility Flags */}
      <div className={`rounded-xl border border-purple-900/50 bg-purple-950/20 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-purple-300 mb-1">
          <span className={titleSize}>Equity / Vulnerability</span>
          <Scale className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <div className={`${valSize} text-purple-300 font-mono`}>{equityFlagged}</div>
          <div className="text-xs text-purple-300/80 mt-1">LEP, Seniors, Disability, Rural</div>
        </div>
      </div>

      {/* KPI 4: Human Review Mandated */}
      <div className={`rounded-xl border border-amber-900/50 bg-amber-950/20 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-amber-300 mb-1">
          <span className={titleSize}>Human Review Required</span>
          <Users className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className={`${valSize} text-amber-300 font-mono`}>{humanReviewNeeded}</div>
          <div className="text-xs text-amber-300/80 mt-1">AI Oversight & Escalation</div>
        </div>
      </div>

      {/* KPI 5: Readmission Risk Cohort */}
      <div className={`rounded-xl border border-orange-900/50 bg-orange-950/20 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-orange-300 mb-1">
          <span className={titleSize}>High Readmission Risk</span>
          <HeartPulse className="w-4 h-4 text-orange-400" />
        </div>
        <div>
          <div className={`${valSize} text-orange-300 font-mono`}>{highReadmissionRisk}</div>
          <div className="text-xs text-orange-300/80 mt-1">Post-op / Chronic lapses</div>
        </div>
      </div>

      {/* KPI 6: Triage SLA Integrity */}
      <div className={`rounded-xl border border-emerald-900/50 bg-emerald-950/20 ${cardPadding} flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-emerald-300 mb-1">
          <span className={titleSize}>Triage Dispatch SLA</span>
          <Clock className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className={`${valSize} text-emerald-300 font-mono`}>100%</div>
          <div className="text-xs text-emerald-300/80 mt-1">Target routing &lt; 2h-24h</div>
        </div>
      </div>
    </div>
  );
};
