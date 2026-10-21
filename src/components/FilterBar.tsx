import React from 'react';
import { Search, Filter, RefreshCw, X, ShieldAlert, Sparkles, Scale } from 'lucide-react';
import { ServiceLine, SeverityLevel } from '../types/healthcare';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedServiceLine: string;
  onServiceLineChange: (val: string) => void;
  selectedPriority: string;
  onPriorityChange: (val: string) => void;
  selectedSeverity: string;
  onSeverityChange: (val: string) => void;
  filterEquityOnly: boolean;
  onToggleEquityOnly: () => void;
  filterHumanReviewOnly: boolean;
  onToggleHumanReviewOnly: () => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalCount: number;
}

const SERVICE_LINES: (ServiceLine | 'All Service Lines')[] = [
  'All Service Lines',
  'Emergency',
  'Inpatient Med-Surg',
  'Ambulatory Care',
  'Oncology & Infusion',
  'Cardiovascular',
  'Surgical Services',
  'Pediatrics',
  'Maternal & Women Health',
  'Telehealth & Virtual Care',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedServiceLine,
  onServiceLineChange,
  selectedPriority,
  onPriorityChange,
  selectedSeverity,
  onSeverityChange,
  filterEquityOnly,
  onToggleEquityOnly,
  filterHumanReviewOnly,
  onToggleHumanReviewOnly,
  onResetFilters,
  totalFilteredCount,
  totalCount,
}) => {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedServiceLine !== 'All Service Lines' ||
    selectedPriority !== 'All' ||
    selectedSeverity !== 'All' ||
    filterEquityOnly ||
    filterHumanReviewOnly;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-3 shadow-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patient comments, symptoms, personas, actions, or case IDs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={onToggleEquityOnly}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              filterEquityOnly
                ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>Health Equity Flags</span>
          </button>

          <button
            onClick={onToggleHumanReviewOnly}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              filterHumanReviewOnly
                ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Human Review Required</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Filters row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" /> Filters:
        </span>

        {/* Service Line */}
        <select
          value={selectedServiceLine}
          onChange={(e) => onServiceLineChange(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          {SERVICE_LINES.map((sl) => (
            <option key={sl} value={sl}>
              {sl}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="All">All Priorities</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>

        {/* Severity */}
        <select
          value={selectedSeverity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="All">All Severities</option>
          <option value="LEVEL 4">Level 4 – Critical</option>
          <option value="LEVEL 3">Level 3 – High</option>
          <option value="LEVEL 2">Level 2 – Moderate</option>
          <option value="LEVEL 1">Level 1 – Low</option>
        </select>

        {/* Counts badge */}
        <div className="ml-auto text-slate-400 font-mono text-[11px]">
          Showing <span className="text-white font-bold">{totalFilteredCount}</span> of {totalCount} records
        </div>
      </div>
    </div>
  );
};
