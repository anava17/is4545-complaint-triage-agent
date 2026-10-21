import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Laptop,
  Languages,
  Accessibility,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PatientRecord, VulnerableGroup } from '../types/healthcare';

interface ExperienceMonitoringViewProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  isProjectorMode: boolean;
}

const VULNERABLE_GROUPS: VulnerableGroup[] = [
  'Older adults',
  'Rural patients',
  'Disabilities',
  'Limited English proficiency',
  'Low digital literacy',
];

export const ExperienceMonitoringView: React.FC<ExperienceMonitoringViewProps> = ({
  records,
  onSelectRecord,
  isProjectorMode,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const filtered = records.filter((r) => {
    if (selectedGroup === 'All') return true;
    if (selectedGroup === 'Flagged Only') return r.experienceMonitoring.equityReview.flagged;
    return r.experienceMonitoring.equityReview.vulnerableGroup === selectedGroup;
  });

  const getGroupIcon = (group: VulnerableGroup) => {
    switch (group) {
      case 'Limited English proficiency':
        return <Languages className="w-4 h-4 text-sky-400" />;
      case 'Disabilities':
        return <Accessibility className="w-4 h-4 text-purple-400" />;
      case 'Rural patients':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'Low digital literacy':
        return <Laptop className="w-4 h-4 text-amber-400" />;
      case 'Older adults':
        return <Users className="w-4 h-4 text-orange-400" />;
      default:
        return <Scale className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Scale className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Patient Experience & Equity Monitoring Agent
            </h3>
            <span className="text-xs font-mono bg-purple-950/80 border border-purple-800/60 text-purple-300 px-2 py-0.5 rounded">
              Vulnerable Population Protection
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Monitors systemic operational bottlenecks and organizational risks across 4 domains (Safety, Reputational, Compliance, Equity), with specialized focus on vulnerable groups: Older adults, Rural patients, Disabilities, Limited English proficiency, and Low digital literacy.
          </p>
        </div>

        {/* Quick Group Filters */}
        <div className="flex items-center gap-1.5 flex-wrap bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedGroup('All')}
            className={`cursor-pointer px-2.5 py-1 rounded-md font-medium transition-colors ${
              selectedGroup === 'All'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Cohorts
          </button>
          <button
            onClick={() => setSelectedGroup('Flagged Only')}
            className={`cursor-pointer px-2.5 py-1 rounded-md font-medium transition-colors ${
              selectedGroup === 'Flagged Only'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Equity Flags ({records.filter((r) => r.experienceMonitoring.equityReview.flagged).length})
          </button>
        </div>
      </div>

      {/* Vulnerable Populations Radar Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {VULNERABLE_GROUPS.map((grp) => {
          const count = records.filter(
            (r) => r.experienceMonitoring.equityReview.vulnerableGroup === grp
          ).length;
          const isSelected = selectedGroup === grp;

          return (
            <button
              key={grp}
              onClick={() => setSelectedGroup(isSelected ? 'All' : grp)}
              className={`cursor-pointer p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-950/50 border-purple-400 shadow-md ring-1 ring-purple-400'
                  : 'bg-slate-900/40 border-slate-800 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                  {getGroupIcon(grp)}
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                  count > 0 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-500'
                }`}>
                  {count} cases
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{grp}</span>
                <span className="text-[11px] text-slate-400">Equity Review Target</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Case Assessment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => {
          const em = record.experienceMonitoring;
          const riskColor =
            em.riskAssessment.level === 'High'
              ? 'border-rose-500/50 bg-rose-950/15'
              : em.riskAssessment.level === 'Moderate'
              ? 'border-amber-500/40 bg-amber-950/15'
              : 'border-slate-800 bg-slate-900/40';

          return (
            <div
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className={`cursor-pointer group rounded-xl border p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:border-purple-400 ${riskColor}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {record.id}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{record.hospitalManager.patientPersona}</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
                      em.riskAssessment.level === 'High'
                        ? 'bg-rose-500 text-white'
                        : em.riskAssessment.level === 'Moderate'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {em.riskAssessment.level} Risk
                  </span>
                </div>

                {/* Step 1: Themes */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
                  <span className="bg-purple-900/40 text-purple-200 border border-purple-700/60 px-2.5 py-0.5 rounded font-semibold">
                    Primary: {em.primaryTheme}
                  </span>
                  {em.secondaryThemes?.map((st) => (
                    <span
                      key={st}
                      className="bg-slate-800/80 text-slate-300 border border-slate-700/50 px-2 py-0.5 rounded text-[11px]"
                    >
                      Secondary: {st}
                    </span>
                  ))}
                </div>

                {/* Step 3: Healthcare Equity & Accessibility Review Callout */}
                {em.equityReview.flagged ? (
                  <div className="bg-purple-950/40 border border-purple-800/60 rounded-lg p-2.5 mb-3">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px] mb-1">
                      {getGroupIcon(em.equityReview.vulnerableGroup)}
                      <span>STEP 3: Healthcare Equity Concern ({em.equityReview.vulnerableGroup})</span>
                    </div>
                    <p className="text-xs text-purple-100/90 leading-relaxed">
                      {em.equityReview.details}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-2 mb-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>STEP 3: No specific demographic equity disparity flagged in this encounter.</span>
                  </div>
                )}

                {/* Step 2: Operational Bottleneck */}
                <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80 mb-3 text-xs">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                    STEP 2: Operational Bottleneck
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {em.operationalBottleneck}
                  </p>
                </div>

                {/* Step 4: Risk Categories */}
                <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80 mb-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                      STEP 4: Risk Domain Breakdown
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {em.riskAssessment.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-rose-950/60 text-rose-300 border border-rose-800/60 text-[10px] font-mono px-2 py-0.5 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 text-[11px] italic">
                    {em.riskAssessment.rationale}
                  </p>
                </div>

                {/* Step 5: Managerial Recommendation */}
                <div className="bg-purple-950/30 rounded-lg p-2.5 border border-purple-900/50 text-xs">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                    STEP 5: Managerial Recommendation
                  </span>
                  <p className="text-purple-100 font-medium text-[11px]">
                    {em.managerialRecommendation}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-purple-400 font-medium">
                <span className="text-slate-400 text-[11px]">Service Line: {record.hospitalManager.serviceLine}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Full Dossier <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
