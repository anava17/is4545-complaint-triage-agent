import React from 'react';
import { CheckSquare, ArrowUpRight, Clock, Target, ShieldCheck, Zap } from 'lucide-react';
import { RecommendedManagementAction } from '../types/healthcare';

interface BottomRecommendedActionsProps {
  actions: RecommendedManagementAction[];
  isProjectorMode: boolean;
}

export const BottomRecommendedActions: React.FC<BottomRecommendedActionsProps> = ({
  actions,
  isProjectorMode,
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl ${
        isProjectorMode ? 'ring-2 ring-cyan-500/30' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
              <CheckSquare className="w-4 h-4" />
            </span>
            <h3
              className={`font-bold text-white tracking-tight ${
                isProjectorMode ? 'text-xl' : 'text-base'
              }`}
            >
              Recommended Executive Management Actions
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Prioritized administrative directives derived from multi-agent synthesis across safety, equity, and operational data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> 3 High-Impact Directives
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((act, index) => {
          const isImmediate = act.urgency.includes('Immediate');
          const borderStyle = isImmediate
            ? 'border-rose-500/50 bg-rose-950/15'
            : 'border-slate-800 bg-slate-950/60';

          return (
            <div
              key={act.id}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all hover:border-cyan-500/50 ${borderStyle}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    ACTION #{index + 1} • {act.id}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      isImmediate
                        ? 'bg-rose-500 text-white'
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                    }`}
                  >
                    {act.urgency}
                  </span>
                </div>

                <h4
                  className={`font-bold text-white mb-2 leading-snug ${
                    isProjectorMode ? 'text-base' : 'text-sm'
                  }`}
                >
                  {act.title}
                </h4>

                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Direct Administrative Protocol:
                  </span>
                  <p
                    className={`text-slate-200 leading-relaxed ${
                      isProjectorMode ? 'text-sm font-medium' : 'text-xs'
                    }`}
                  >
                    {act.actionText}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target Leadership:</span>
                  <span className="font-semibold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {act.departmentTarget}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-300/90 bg-emerald-950/30 border border-emerald-900/40 p-2 rounded flex items-start gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-300">Expected Metric Gain: </strong>
                    {act.expectedOutcome}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
