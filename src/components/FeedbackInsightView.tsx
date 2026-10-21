import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
  ArrowRight,
  TrendingUp,
  Tag,
  Stethoscope,
  Filter
} from 'lucide-react';
import { PatientRecord, FeedbackTheme, SentimentType } from '../types/healthcare';

interface FeedbackInsightViewProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  isProjectorMode: boolean;
}

const ALL_THEMES: FeedbackTheme[] = [
  'Communication',
  'Scheduling',
  'Wait Time',
  'Technology / Patient Portal',
  'Billing',
  'Clinical Care',
  'Discharge / Follow-Up',
  'Accessibility / Equity',
  'Mixed or Ambiguous',
];

export const FeedbackInsightView: React.FC<FeedbackInsightViewProps> = ({
  records,
  onSelectRecord,
  isProjectorMode,
}) => {
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('All');
  const [selectedSentimentFilter, setSelectedSentimentFilter] = useState<string>('All');

  const filtered = records.filter((r) => {
    if (selectedThemeFilter !== 'All' && r.feedbackInsight.theme !== selectedThemeFilter) return false;
    if (selectedSentimentFilter !== 'All' && r.feedbackInsight.sentiment !== selectedSentimentFilter) return false;
    return true;
  });

  // Calculate theme distribution
  const themeCounts = ALL_THEMES.reduce((acc, t) => {
    acc[t] = records.filter((r) => r.feedbackInsight.theme === t).length;
    return acc;
  }, {} as Record<FeedbackTheme, number>);

  return (
    <div className="space-y-6">
      {/* Agent Role Header & Instructions Summary */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Stethoscope className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Patient Feedback Insight Agent
            </h3>
            <span className="text-xs font-mono bg-teal-950/80 border border-teal-800/60 text-teal-300 px-2 py-0.5 rounded">
              Quality-Improvement Protocol
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Evaluates raw patient commentary using professional healthcare QI methodology across 6 standardized dimensions:
            Theme taxonomy, Sentiment attribution, Objective reasoning, Operational process failure, Risk/Bias flagging, and Actionable managerial remediation.
          </p>
        </div>

        {/* Sentiment Quick Filters */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800 shrink-0 text-xs">
          {(['All', 'Positive', 'Negative', 'Neutral', 'Mixed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSentimentFilter(s)}
              className={`cursor-pointer px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedSentimentFilter === s
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Theme Bar Summary */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-teal-400" />
            <span>Theme Categorization Frequency</span>
          </span>
          {selectedThemeFilter !== 'All' && (
            <button
              onClick={() => setSelectedThemeFilter('All')}
              className="text-teal-400 hover:underline"
            >
              Clear Theme Filter ({selectedThemeFilter})
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_THEMES.map((theme) => {
            const count = themeCounts[theme] || 0;
            const isSelected = selectedThemeFilter === theme;
            return (
              <button
                key={theme}
                onClick={() => setSelectedThemeFilter(isSelected ? 'All' : theme)}
                className={`cursor-pointer text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold'
                    : count > 0
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800/40 text-slate-500 opacity-60'
                }`}
              >
                <span>{theme}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Commentary Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => {
          const insight = record.feedbackInsight;
          const sentimentBadge =
            insight.sentiment === 'Positive'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : insight.sentiment === 'Negative'
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : insight.sentiment === 'Mixed'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-300 border-slate-700';

          return (
            <div
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="cursor-pointer group rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-teal-500/60 p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {record.id}
                    </span>
                    <span className="text-xs text-slate-400">{record.patientNameSnippet || record.source}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${sentimentBadge}`}>
                      {insight.sentiment}
                    </span>
                  </div>
                </div>

                {/* Patient Raw Quote */}
                <div className="bg-slate-950/80 border-l-2 border-teal-500 rounded-r-lg p-3 mb-3">
                  <div className="text-[10px] text-teal-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Raw Patient Feedback
                  </div>
                  <p className="text-xs text-slate-200 italic line-clamp-3 leading-relaxed">
                    "{record.rawComment}"
                  </p>
                </div>

                {/* 6 Structured Insight Output Blocks */}
                <div className="space-y-2.5 text-xs">
                  {/* 1. Theme & Reasoning */}
                  <div className="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-teal-400 text-[11px] uppercase tracking-wider">
                        1. Primary Theme: {insight.theme}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      <span className="text-slate-400 font-medium">3. Reasoning: </span>
                      {insight.reasoning}
                    </p>
                  </div>

                  {/* 4. Operational Issue */}
                  <div className="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/80">
                    <span className="font-bold text-cyan-400 text-[11px] uppercase tracking-wider block mb-1">
                      4. Operational Healthcare Process Issue
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {insight.operationalIssue}
                    </p>
                  </div>

                  {/* 5. Risk or Bias Concern */}
                  <div className="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/80">
                    <span className="font-bold text-amber-400 text-[11px] uppercase tracking-wider block mb-1">
                      5. Risk or Bias Concern
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {insight.riskOrBiasConcern}
                    </p>
                  </div>

                  {/* 6. Recommended Action */}
                  <div className="bg-teal-950/30 rounded-lg p-2.5 border border-teal-900/60">
                    <span className="font-bold text-teal-300 text-[11px] uppercase tracking-wider block mb-1">
                      6. Recommended Managerial Action
                    </span>
                    <p className="text-teal-100/90 leading-relaxed text-[11px] font-medium">
                      {insight.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-teal-400 font-medium">
                <span className="text-slate-400 text-[11px]">Department: {record.hospitalManager.serviceLine}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Examine Analysis <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
