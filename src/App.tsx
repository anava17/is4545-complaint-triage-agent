import React, { useState, useMemo } from 'react';
import {
  Building2,
  Stethoscope,
  Scale,
  ShieldAlert,
  Sparkles,
  Presentation,
  Filter,
  Layers,
  HeartPulse,
  Download,
  Share2,
  Info
} from 'lucide-react';
import {
  INITIAL_PATIENT_RECORDS,
  INITIAL_EXECUTIVE_ALERT,
  INITIAL_RECOMMENDED_ACTIONS,
} from './data/mockPatients';
import { PatientRecord, RouteTarget } from './types/healthcare';
import { TopExecutiveAlert } from './components/TopExecutiveAlert';
import { ExecutiveKpiCards } from './components/ExecutiveKpiCards';
import { FilterBar } from './components/FilterBar';
import { HospitalManagerView } from './components/HospitalManagerView';
import { FeedbackInsightView } from './components/FeedbackInsightView';
import { ExperienceMonitoringView } from './components/ExperienceMonitoringView';
import { ComplaintTriageView } from './components/ComplaintTriageView';
import { BottomRecommendedActions } from './components/BottomRecommendedActions';
import { CaseDetailModal } from './components/CaseDetailModal';
import { LiveAnalysisStudio } from './components/LiveAnalysisStudio';

type ActiveAgentView = 'manager' | 'insight' | 'experience' | 'triage' | 'studio';

export default function App() {
  const [records, setRecords] = useState<PatientRecord[]>(INITIAL_PATIENT_RECORDS);
  const [activeView, setActiveView] = useState<ActiveAgentView>('manager');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedServiceLine, setSelectedServiceLine] = useState<string>('All Service Lines');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [filterEquityOnly, setFilterEquityOnly] = useState<boolean>(false);
  const [filterHumanReviewOnly, setFilterHumanReviewOnly] = useState<boolean>(false);

  // Filtered dataset
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesComment = r.rawComment.toLowerCase().includes(query);
        const matchesPersona = r.hospitalManager.patientPersona.toLowerCase().includes(query);
        const matchesId = r.id.toLowerCase().includes(query);
        const matchesProblem = r.hospitalManager.mainProblem.toLowerCase().includes(query);
        const matchesTheme = r.feedbackInsight.theme.toLowerCase().includes(query);
        if (!matchesComment && !matchesPersona && !matchesId && !matchesProblem && !matchesTheme) {
          return false;
        }
      }

      // Service Line
      if (selectedServiceLine !== 'All Service Lines' && r.hospitalManager.serviceLine !== selectedServiceLine) {
        return false;
      }

      // Priority
      if (selectedPriority !== 'All' && r.hospitalManager.managementPriority !== selectedPriority) {
        return false;
      }

      // Severity
      if (selectedSeverity !== 'All' && !r.complaintTriage.severity.level.includes(selectedSeverity)) {
        return false;
      }

      // Equity Only
      if (filterEquityOnly && !r.experienceMonitoring.equityReview.flagged) {
        return false;
      }

      // Human Review Only
      if (
        filterHumanReviewOnly &&
        !r.hospitalManager.humanReviewNeeded &&
        !r.complaintTriage.escalation.humanInterventionRequired
      ) {
        return false;
      }

      return true;
    });
  }, [
    records,
    searchTerm,
    selectedServiceLine,
    selectedPriority,
    selectedSeverity,
    filterEquityOnly,
    filterHumanReviewOnly,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedServiceLine('All Service Lines');
    setSelectedPriority('All');
    setSelectedSeverity('All');
    setFilterEquityOnly(false);
    setFilterHumanReviewOnly(false);
  };

  const handleFilterCritical = () => {
    setSelectedPriority('High');
    setSelectedSeverity('LEVEL 4');
    setActiveView('manager');
  };

  const handleAddCaseToLiveQueue = (newRecord: PatientRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
  };

  return (
    <div
      className={`min-h-screen text-slate-100 transition-colors duration-200 ${
        isProjectorMode ? 'bg-slate-950 text-white font-sans text-base' : 'bg-slate-950 font-sans'
      }`}
    >
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Platform Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-900/40">
                <HeartPulse className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                    <span>AegisHealth Intelligence</span>
                  </h1>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.2 rounded-full font-bold">
                    CANVAS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Multi-Agent Hospital Decision Support • Feedback Insight • Equity Monitoring • Complaint Triage
                </p>
              </div>
            </div>

            {/* Right Tools: Projector Mode & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsProjectorMode(!isProjectorMode)}
                className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  isProjectorMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
                title="Toggle Classroom Projector Mode for high-contrast, enlarged presentation display"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Projector Mode:</span>
                <span>{isProjectorMode ? 'ON' : 'OFF'}</span>
              </button>

              <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-800 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>4 Agents Online</span>
              </div>
            </div>
          </div>

          {/* Agent Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-800/80 pt-1 -mb-px text-xs font-semibold">
            {/* 1. Hospital Manager Agent */}
            <button
              onClick={() => setActiveView('manager')}
              className={`cursor-pointer py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeView === 'manager'
                  ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>4. Hospital Manager Decision Support</span>
            </button>

            {/* 2. Feedback Insight Agent */}
            <button
              onClick={() => setActiveView('insight')}
              className={`cursor-pointer py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeView === 'insight'
                  ? 'border-teal-400 text-teal-300 font-bold bg-teal-950/20'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>1. Patient Feedback Insight Agent</span>
            </button>

            {/* 3. Experience Monitoring Agent */}
            <button
              onClick={() => setActiveView('experience')}
              className={`cursor-pointer py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeView === 'experience'
                  ? 'border-purple-400 text-purple-300 font-bold bg-purple-950/20'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4 text-purple-400" />
              <span>2. Experience & Equity Monitoring</span>
            </button>

            {/* 4. Complaint Triage Assistant */}
            <button
              onClick={() => setActiveView('triage')}
              className={`cursor-pointer py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeView === 'triage'
                  ? 'border-rose-400 text-rose-300 font-bold bg-rose-950/20'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>3. Complaint Triage Assistant</span>
            </button>

            {/* 5. Live AI Studio */}
            <button
              onClick={() => setActiveView('studio')}
              className={`cursor-pointer py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ml-auto ${
                activeView === 'studio'
                  ? 'border-emerald-400 text-emerald-300 font-bold bg-emerald-950/20'
                  : 'border-transparent text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Live AI Ingestion Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Canvas Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top of the Dashboard: Most Important Management Alert (Explicit Prompt Requirement) */}
        <section aria-label="Executive Alert Finding">
          <TopExecutiveAlert
            alert={INITIAL_EXECUTIVE_ALERT}
            isProjectorMode={isProjectorMode}
            onFilterCritical={handleFilterCritical}
          />
        </section>

        {/* Executive Scorecard KPIs */}
        <section aria-label="Executive KPIs">
          <ExecutiveKpiCards records={records} isProjectorMode={isProjectorMode} />
        </section>

        {/* Interactive Filter & Query Bar (Visible on directory views) */}
        {activeView !== 'studio' && (
          <section aria-label="Filters and Search">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedServiceLine={selectedServiceLine}
              onServiceLineChange={setSelectedServiceLine}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedSeverity={selectedSeverity}
              onSeverityChange={setSelectedSeverity}
              filterEquityOnly={filterEquityOnly}
              onToggleEquityOnly={() => setFilterEquityOnly(!filterEquityOnly)}
              filterHumanReviewOnly={filterHumanReviewOnly}
              onToggleHumanReviewOnly={() => setFilterHumanReviewOnly(!filterHumanReviewOnly)}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredRecords.length}
              totalCount={records.length}
            />
          </section>
        )}

        {/* Active View Display */}
        <section aria-label="Active Intelligence Agent Canvas">
          {activeView === 'manager' && (
            <HospitalManagerView
              records={filteredRecords}
              onSelectRecord={setSelectedRecord}
              isProjectorMode={isProjectorMode}
            />
          )}

          {activeView === 'insight' && (
            <FeedbackInsightView
              records={filteredRecords}
              onSelectRecord={setSelectedRecord}
              isProjectorMode={isProjectorMode}
            />
          )}

          {activeView === 'experience' && (
            <ExperienceMonitoringView
              records={filteredRecords}
              onSelectRecord={setSelectedRecord}
              isProjectorMode={isProjectorMode}
            />
          )}

          {activeView === 'triage' && (
            <ComplaintTriageView
              records={filteredRecords}
              onSelectRecord={setSelectedRecord}
              isProjectorMode={isProjectorMode}
            />
          )}

          {activeView === 'studio' && (
            <LiveAnalysisStudio
              onAddCaseToLiveQueue={handleAddCaseToLiveQueue}
              isProjectorMode={isProjectorMode}
            />
          )}
        </section>

        {/* Bottom of the Dashboard: 2-3 Recommended Management Actions (Explicit Prompt Requirement) */}
        <section aria-label="Recommended Management Actions">
          <BottomRecommendedActions
            actions={INITIAL_RECOMMENDED_ACTIONS}
            isProjectorMode={isProjectorMode}
          />
        </section>

        {/* Footer info bar */}
        <footer className="pt-4 pb-8 border-t border-slate-900 text-center text-xs text-slate-500 space-y-1">
          <p>
            AegisHealth Intelligence Canvas • Hospital Executive Decision Support & Triage System
          </p>
          <p className="text-[11px] text-slate-600">
            For healthcare management, quality improvement, and clinical leadership decision support. Does not replace clinical diagnosis.
          </p>
        </footer>
      </main>

      {/* Case Deep-Dive Modal */}
      <CaseDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
