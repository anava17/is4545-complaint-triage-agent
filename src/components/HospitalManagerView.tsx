import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  User,
  HeartPulse,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Building2,
  Calendar,
  Layers,
  FileText,
  Activity,
  Maximize2
} from 'lucide-react';
import { PatientRecord } from '../types/healthcare';

interface HospitalManagerViewProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  isProjectorMode: boolean;
}

export const HospitalManagerView: React.FC<HospitalManagerViewProps> = ({
  records,
  onSelectRecord,
  isProjectorMode,
}) => {
  const [viewLayout, setViewLayout] = useState<'cards' | 'table'>('cards');

  // Grouping by priority for high-visibility management queues
  const highPriority = records.filter((r) => r.hospitalManager.managementPriority === 'High');
  const mediumPriority = records.filter((r) => r.hospitalManager.managementPriority === 'Medium');
  const lowPriority = records.filter((r) => r.hospitalManager.managementPriority === 'Low');

  return (
    <div className="space-y-6">
      {/* View Switcher & Service Line Distribution Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Hospital Executive Decision Support Matrix</span>
          </h3>
          <p className="text-xs text-slate-400">
            Synthesized operational bottlenecks, readmission risks, AI risk flags, and management intervention priorities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewLayout('cards')}
              className={`cursor-pointer px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewLayout === 'cards'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Executive Cards
            </button>
            <button
              onClick={() => setViewLayout('table')}
              className={`cursor-pointer px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewLayout === 'table'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Management Roster Table
            </button>
          </div>
        </div>
      </div>

      {viewLayout === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record) => {
            const hm = record.hospitalManager;
            const priorityColor =
              hm.managementPriority === 'High'
                ? 'border-rose-500/50 bg-rose-950/20'
                : hm.managementPriority === 'Medium'
                ? 'border-amber-500/40 bg-amber-950/15'
                : 'border-slate-800 bg-slate-900/40';

            const priorityBadge =
              hm.managementPriority === 'High'
                ? 'bg-rose-500 text-white font-bold'
                : hm.managementPriority === 'Medium'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-700 text-slate-200';

            return (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className={`cursor-pointer group rounded-xl border p-4.5 flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] hover:shadow-xl hover:border-cyan-500/60 ${priorityColor}`}
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                      <span className="font-semibold text-white">{record.id}</span>
                      <span>•</span>
                      <span className="text-slate-400">{record.source}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityBadge}`}>
                        {hm.managementPriority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Patient Persona & Demographic */}
                  <div className="mb-3">
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {hm.patientPersona}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 text-slate-300 font-medium">
                        {hm.serviceLine}
                      </span>
                      <span>•</span>
                      <span>Age: {hm.ageGroup}</span>
                      <span>•</span>
                      <span className="truncate max-w-[130px]">{hm.visitType}</span>
                    </div>
                  </div>

                  {/* Main Problem Statement */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 mb-3">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                      Main Operational Problem
                    </span>
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      {hm.mainProblem}
                    </p>
                  </div>

                  {/* Scorecard row */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="bg-slate-900/90 border border-slate-800 rounded p-1.5">
                      <span className="text-[10px] text-slate-400 block">Satisfaction</span>
                      <span className={`text-xs font-bold font-mono ${
                        hm.patientSatisfaction <= 3 ? 'text-rose-400' : hm.patientSatisfaction >= 8 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {hm.patientSatisfaction}/10
                      </span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded p-1.5">
                      <span className="text-[10px] text-slate-400 block">Readmission</span>
                      <span className={`text-xs font-bold font-mono ${
                        hm.readmissionRisk === 'High' ? 'text-rose-400' : hm.readmissionRisk === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {hm.readmissionRisk}
                      </span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded p-1.5">
                      <span className="text-[10px] text-slate-400 block">Portal Status</span>
                      <span className={`text-xs font-bold truncate block ${
                        hm.patientPortalUsage.includes('Fail') || hm.patientPortalUsage.includes('Locked') ? 'text-rose-400' : 'text-slate-300'
                      }`}>
                        {hm.patientPortalUsage}
                      </span>
                    </div>
                  </div>

                  {/* AI Risk Flags & Human Review badge */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
                    {hm.aiRiskFlags.humanReviewRequired && (
                      <span className="bg-amber-950/70 border border-amber-800/70 text-amber-300 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                        <ShieldAlert className="w-3 h-3 text-amber-400" /> Human Review
                      </span>
                    )}
                    {hm.aiRiskFlags.biasReview && (
                      <span className="bg-purple-950/70 border border-purple-800/70 text-purple-300 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                        <Scale className="w-3 h-3 text-purple-400" /> Bias Flagged
                      </span>
                    )}
                    {record.experienceMonitoring.equityReview.flagged && (
                      <span className="bg-indigo-950/70 border border-indigo-800/70 text-indigo-300 px-2 py-0.5 rounded font-medium">
                        Group: {record.experienceMonitoring.equityReview.vulnerableGroup}
                      </span>
                    )}
                  </div>

                  {/* Management Action preview */}
                  <div className="text-xs text-slate-300 border-t border-slate-800/60 pt-2.5">
                    <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                      Recommended Management Action:
                    </span>
                    <p className="line-clamp-2 text-slate-300 italic text-[11px]">
                      "{hm.managementActions[0]}"
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span className="text-[11px] text-slate-400">Route: {record.complaintTriage.escalation.routeTo}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Full Agent Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Roster Table view for executive scanning */
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Case / Source</th>
                <th className="py-3 px-3">Service Line</th>
                <th className="py-3 px-4">Patient Persona</th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3 text-center">Readmission</th>
                <th className="py-3 px-3 text-center">AI Risk Flags</th>
                <th className="py-3 px-4">Main Operational Problem</th>
                <th className="py-3 px-3">Escalation Route</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((r) => {
                const hm = r.hospitalManager;
                return (
                  <tr
                    key={r.id}
                    onClick={() => onSelectRecord(r)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono">
                      <span className="text-white font-semibold">{r.id}</span>
                      <span className="block text-[10px] text-slate-400">{r.source}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200">
                        {hm.serviceLine}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate text-slate-200">
                      <div className="font-medium text-white">{hm.patientPersona}</div>
                      <div className="text-[10px] text-slate-400">Age: {hm.ageGroup}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          hm.managementPriority === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : hm.managementPriority === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {hm.managementPriority}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      <span
                        className={`${
                          hm.readmissionRisk === 'High'
                            ? 'text-rose-400 font-bold'
                            : hm.readmissionRisk === 'Moderate'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {hm.readmissionRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {hm.aiRiskFlags.humanReviewRequired && (
                          <span title="Human Review Needed" className="text-amber-400">
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {hm.aiRiskFlags.biasReview && (
                          <span title="Bias Review Flagged" className="text-purple-400">
                            <Scale className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {!hm.aiRiskFlags.humanReviewRequired && !hm.aiRiskFlags.biasReview && (
                          <span className="text-slate-500 text-[10px]">Clean</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-[260px] truncate text-slate-300">
                      {hm.mainProblem}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="text-[11px]">{r.complaintTriage.escalation.routeTo}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
