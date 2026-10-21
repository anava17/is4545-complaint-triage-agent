import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, Zap, BellRing } from 'lucide-react';
import { ExecutiveSummaryAlert } from '../types/healthcare';

interface TopExecutiveAlertProps {
  alert: ExecutiveSummaryAlert;
  isProjectorMode: boolean;
  onFilterCritical: () => void;
}

export const TopExecutiveAlert: React.FC<TopExecutiveAlertProps> = ({
  alert,
  isProjectorMode,
  onFilterCritical,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-200 border ${
        isProjectorMode
          ? 'bg-amber-950/40 border-amber-500/80 p-6 text-white shadow-xl ring-2 ring-amber-500/30'
          : 'bg-gradient-to-r from-rose-950/70 via-slate-900/90 to-amber-950/60 border-rose-500/40 p-5 shadow-lg shadow-rose-950/20'
      }`}
    >
      {/* Decorative pulse glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`p-3 rounded-xl shrink-0 flex items-center justify-center ${
              alert.level === 'CRITICAL ALERT'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}
          >
            <ShieldAlert className={isProjectorMode ? 'w-8 h-8' : 'w-6 h-6'} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  alert.level === 'CRITICAL ALERT'
                    ? 'bg-rose-500 text-white font-extrabold'
                    : 'bg-amber-500 text-slate-950 font-bold'
                }`}
              >
                {alert.level}
              </span>
              <span className="text-xs text-slate-300 font-medium bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md">
                Service Line: {alert.serviceLine}
              </span>
              <span className="text-xs text-rose-300/90 font-mono bg-rose-950/60 border border-rose-800/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <BellRing className="w-3 h-3" /> Urgent Executive Triage
              </span>
            </div>

            <h2
              className={`font-bold tracking-tight text-white mb-1.5 ${
                isProjectorMode ? 'text-2xl leading-snug' : 'text-lg leading-snug'
              }`}
            >
              {alert.title}
            </h2>

            <p
              className={`text-slate-300 max-w-4xl leading-relaxed ${
                isProjectorMode ? 'text-base font-medium' : 'text-sm'
              }`}
            >
              {alert.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
              <div className="flex items-center gap-1.5 text-rose-200 bg-rose-900/40 border border-rose-800/40 px-2.5 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold">Metric Exposure:</span>
                <span>{alert.metricImpact}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-200 bg-amber-900/30 border border-amber-800/40 px-2.5 py-1 rounded-md">
                <span className="font-semibold">Direct Administrative Directive:</span>
                <span>{alert.immediateDirective}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
          <button
            onClick={onFilterCritical}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shadow-md ${
              isProjectorMode
                ? 'bg-rose-500 hover:bg-rose-600 text-white text-base'
                : 'bg-rose-600/90 hover:bg-rose-500 text-white text-sm'
            }`}
          >
            <span>Review Critical Cases</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
