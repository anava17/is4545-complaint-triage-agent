import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  ArrowRight,
  Send,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Users,
  Compass,
  Building,
  Scale,
  FileCheck
} from 'lucide-react';
import { PatientRecord, SeverityLevel, RouteTarget } from '../types/healthcare';

interface ComplaintTriageViewProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  isProjectorMode: boolean;
}

const ALL_ROUTES: RouteTarget[] = [
  'Risk Management',
  'Compliance Office',
  'Accessibility Coordinator',
  'Nursing Leadership',
  'Physician Leadership',
  'Quality Improvement Team',
  'Revenue Cycle / Billing',
  'Information Technology',
  'Patient Experience Team',
  'Executive Review',
];

export const ComplaintTriageView: React.FC<ComplaintTriageViewProps> = ({
  records,
  onSelectRecord,
  isProjectorMode,
}) => {
  const [selectedRouteFilter, setSelectedRouteFilter] = useState<string>('All');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('All');

  const filtered = records.filter((r) => {
    if (selectedRouteFilter !== 'All' && r.complaintTriage.escalation.routeTo !== selectedRouteFilter) {
      return false;
    }
    if (selectedSeverityFilter !== 'All') {
      if (!r.complaintTriage.severity.level.includes(selectedSeverityFilter)) return false;
    }
    return true;
  });

  const level4Count = records.filter((r) => r.complaintTriage.severity.level.includes('Level 4')).length;
  const level3Count = records.filter((r) => r.complaintTriage.severity.level.includes('Level 3')).length;
  const level2Count = records.filter((r) => r.complaintTriage.severity.level.includes('Level 2')).length;
  const level1Count = records.filter((r) => r.complaintTriage.severity.level.includes('Level 1')).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Healthcare Complaint Triage Assistant & Routing Matrix
            </h3>
            <span className="text-xs font-mono bg-rose-950/80 border border-rose-800/60 text-rose-300 px-2 py-0.5 rounded">
              Prioritization & SLA Oversight
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Standardized intake classification, 4-tier severity assessment, multi-domain risk detection, and algorithmic routing to 10 hospital leadership destinations with SLA timers and human intervention safeguards.
          </p>
        </div>

        {/* SLA Status Indicator */}
        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl flex items-center gap-3 shrink-0">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <div className="text-white font-bold">Intake SLA Standards</div>
            <div className="text-slate-400 text-[11px]">Level 4: &lt;2h | Level 3: &lt;4h | Level 2: &lt;24h</div>
          </div>
        </div>
      </div>

      {/* 4-Level Severity Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Level 4 */}
        <button
          onClick={() => setSelectedSeverityFilter(selectedSeverityFilter === 'Level 4' ? 'All' : 'Level 4')}
          className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
            selectedSeverityFilter === 'Level 4'
              ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500'
              : 'bg-rose-950/20 border-rose-900/60 hover:border-rose-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> LEVEL 4 – Critical
            </span>
            <span className="text-base font-mono font-extrabold text-white bg-rose-600 px-2 py-0.5 rounded-full">
              {level4Count}
            </span>
          </div>
          <div className="text-[11px] text-rose-300/80">Immediate safety risk, legal or civil rights breach (&lt;2h SLA)</div>
        </button>

        {/* Level 3 */}
        <button
          onClick={() => setSelectedSeverityFilter(selectedSeverityFilter === 'Level 3' ? 'All' : 'Level 3')}
          className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
            selectedSeverityFilter === 'Level 3'
              ? 'bg-orange-950/70 border-orange-500 ring-2 ring-orange-500'
              : 'bg-orange-950/20 border-orange-900/60 hover:border-orange-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> LEVEL 3 – High
            </span>
            <span className="text-base font-mono font-extrabold text-white bg-orange-600 px-2 py-0.5 rounded-full">
              {level3Count}
            </span>
          </div>
          <div className="text-[11px] text-orange-300/80">Potential harm, medication lapse, serious access issue (&lt;4-12h SLA)</div>
        </button>

        {/* Level 2 */}
        <button
          onClick={() => setSelectedSeverityFilter(selectedSeverityFilter === 'Level 2' ? 'All' : 'Level 2')}
          className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
            selectedSeverityFilter === 'Level 2'
              ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500'
              : 'bg-amber-950/20 border-amber-900/60 hover:border-amber-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-400">LEVEL 2 – Moderate</span>
            <span className="text-base font-mono font-extrabold text-slate-950 bg-amber-400 px-2 py-0.5 rounded-full">
              {level2Count}
            </span>
          </div>
          <div className="text-[11px] text-amber-300/80">Service failure, communication breakdown, billing dispute (&lt;24h)</div>
        </button>

        {/* Level 1 */}
        <button
          onClick={() => setSelectedSeverityFilter(selectedSeverityFilter === 'Level 1' ? 'All' : 'Level 1')}
          className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
            selectedSeverityFilter === 'Level 1'
              ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500'
              : 'bg-slate-900/40 border-slate-800 hover:border-emerald-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-400">LEVEL 1 – Low</span>
            <span className="text-base font-mono font-extrabold text-white bg-slate-800 px-2 py-0.5 rounded-full">
              {level1Count}
            </span>
          </div>
          <div className="text-[11px] text-slate-400">Routine suggestion, minor dissatisfaction, commendation (&lt;72h)</div>
        </button>
      </div>

      {/* Route Target Selector Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-rose-400" /> Target Escalation Destination Dispatcher:
          </span>
          {selectedRouteFilter !== 'All' && (
            <button
              onClick={() => setSelectedRouteFilter('All')}
              className="text-rose-400 hover:underline text-xs"
            >
              Reset Route Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_ROUTES.map((route) => {
            const count = records.filter((r) => r.complaintTriage.escalation.routeTo === route).length;
            const isSelected = selectedRouteFilter === route;
            return (
              <button
                key={route}
                onClick={() => setSelectedRouteFilter(isSelected ? 'All' : route)}
                className={`cursor-pointer text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                    : count > 0
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800/40 text-slate-500 opacity-60'
                }`}
              >
                <span>{route}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-rose-500 text-white font-bold' : 'bg-slate-900 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complaint Triage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => {
          const ct = record.complaintTriage;
          const isCritical = ct.severity.level.includes('Level 4');
          const isHigh = ct.severity.level.includes('Level 3');

          return (
            <div
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className={`cursor-pointer group rounded-xl border p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl ${
                isCritical
                  ? 'border-rose-500/60 bg-rose-950/20 hover:border-rose-400'
                  : isHigh
                  ? 'border-orange-500/50 bg-orange-950/15 hover:border-orange-400'
                  : 'border-slate-800 bg-slate-900/50 hover:border-rose-500/40'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {record.id}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{record.patientNameSnippet}</span>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                      isCritical
                        ? 'bg-rose-600 text-white animate-pulse'
                        : isHigh
                        ? 'bg-orange-500 text-slate-950'
                        : ct.severity.level.includes('Level 2')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {ct.severity.level}
                  </span>
                </div>

                {/* Step 1: Complaint Category */}
                <div className="flex items-center gap-2 mb-2.5 text-xs">
                  <span className="text-slate-400 font-medium">STEP 1 Category:</span>
                  <span className="bg-slate-800 text-white font-semibold px-2 py-0.5 rounded border border-slate-700">
                    {ct.primaryCategory}
                  </span>
                  {ct.secondaryCategories?.map((sc) => (
                    <span key={sc} className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded text-[11px]">
                      +{sc}
                    </span>
                  ))}
                </div>

                {/* Step 2: Severity Reasoning */}
                <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800 mb-2.5 text-xs">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-0.5">
                    STEP 2: Severity Assessment Rationale
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {ct.severity.reasoning}
                  </p>
                </div>

                {/* Step 5: Risk Detection */}
                <div className="space-y-1 mb-2.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    STEP 5: Identified Risks
                  </span>
                  <div className="space-y-1.5">
                    {ct.riskDetection.map((risk, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/40 border border-slate-800/80 rounded px-2.5 py-1.5 text-xs flex items-start gap-2"
                      >
                        <span className="bg-amber-950/80 text-amber-300 border border-amber-800/80 text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0">
                          {risk.riskType}
                        </span>
                        <span className="text-slate-300 text-[11px] leading-snug">
                          {risk.explanation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 6: Escalation Recommendation */}
                <div className="bg-rose-950/40 rounded-lg p-3 border border-rose-800/50 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-rose-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-rose-400" />
                      STEP 6: ROUTE TO: {ct.escalation.routeTo}
                    </span>
                    <span className="font-mono text-[11px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                      SLA: {ct.escalation.slaHours} Hours
                    </span>
                  </div>
                  <p className="text-rose-100 text-[11px] mb-2 leading-relaxed">
                    {ct.escalation.routingReason}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-rose-900/60">
                    <span className="text-slate-300">Human Intervention Required:</span>
                    <span className={`font-bold ${ct.escalation.humanInterventionRequired ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {ct.escalation.humanInterventionRequired ? 'YES (Mandatory)' : 'No (Automated Routing)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-rose-400 font-medium">
                <span className="text-slate-400 text-[11px]">Department: {record.hospitalManager.serviceLine}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Examine Escalation <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
