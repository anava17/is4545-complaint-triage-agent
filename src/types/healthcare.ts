/**
 * Healthcare Feedback & Decision Intelligence Types
 * Supporting 4 Clinical & Executive Roles
 */

export type FeedbackTheme =
  | 'Communication'
  | 'Scheduling'
  | 'Wait Time'
  | 'Technology / Patient Portal'
  | 'Billing'
  | 'Clinical Care'
  | 'Discharge / Follow-Up'
  | 'Discharge and Follow-Up'
  | 'Accessibility / Equity'
  | 'Accessibility and Equity'
  | 'Patient Safety'
  | 'Staff Conduct'
  | 'Mixed or Ambiguous';

export type ExperienceTheme = FeedbackTheme;

export type SentimentType = 'Positive' | 'Negative' | 'Neutral' | 'Mixed';

export type ComplaintCategory =
  | 'Communication'
  | 'Scheduling'
  | 'Wait Time'
  | 'Technology / Patient Portal'
  | 'Billing'
  | 'Clinical Care'
  | 'Patient Safety'
  | 'Privacy or Security'
  | 'Staff Conduct'
  | 'Other';

export type SeverityLevel =
  | 'LEVEL 1 – Low'
  | 'LEVEL 2 – Moderate'
  | 'LEVEL 3 – High'
  | 'LEVEL 4 – Critical';

export type RouteTarget =
  | 'Patient Experience Team'
  | 'Nursing Leadership'
  | 'Physician Leadership'
  | 'Quality Improvement Team'
  | 'Compliance Office'
  | 'Information Technology'
  | 'Revenue Cycle / Billing'
  | 'Accessibility Coordinator'
  | 'Risk Management'
  | 'Executive Review';

export type RiskDetectionType =
  | 'Patient Safety Risk'
  | 'Clinical Risk'
  | 'Compliance Risk'
  | 'Privacy Risk'
  | 'Accessibility Risk'
  | 'Equity Risk'
  | 'Reputational Risk'
  | 'Operational Risk';

export type ServiceLine =
  | 'Emergency'
  | 'Inpatient Med-Surg'
  | 'Ambulatory Care'
  | 'Oncology & Infusion'
  | 'Cardiovascular'
  | 'Surgical Services'
  | 'Pediatrics'
  | 'Maternal & Women Health'
  | 'Telehealth & Virtual Care';

export type AgeGroup = '<18' | '18-35' | '36-50' | '51-64' | '65-79' | '80+';

export type VulnerableGroup =
  | 'Older adults'
  | 'Rural patients'
  | 'Disabilities'
  | 'Limited English proficiency'
  | 'Low digital literacy'
  | 'None flagged';

export interface FeedbackInsightAnalysis {
  theme: FeedbackTheme;
  sentiment: SentimentType;
  reasoning: string;
  operationalIssue: string;
  riskOrBiasConcern: string;
  recommendedAction: string;
}

export interface ExperienceMonitoringAnalysis {
  primaryTheme: FeedbackTheme;
  secondaryThemes: FeedbackTheme[];
  operationalBottleneck: string;
  equityReview: {
    flagged: boolean;
    vulnerableGroup: VulnerableGroup;
    details: string;
  };
  riskAssessment: {
    level: 'Low' | 'Moderate' | 'High';
    categories: ('Patient Safety' | 'Reputational' | 'Compliance' | 'Equity' | 'Operational')[];
    rationale: string;
  };
  managerialRecommendation: string;
}

export interface ComplaintTriageAnalysis {
  primaryCategory: ComplaintCategory;
  secondaryCategories: ComplaintCategory[];
  severity: {
    level: SeverityLevel;
    reasoning: string;
  };
  riskDetection: Array<{
    riskType: RiskDetectionType;
    explanation: string;
  }>;
  escalation: {
    routeTo: RouteTarget;
    slaHours: number;
    humanInterventionRequired: boolean;
    routingReason: string;
  };
}

export interface HospitalManagerAnalysis {
  patientPersona: string;
  ageGroup: AgeGroup;
  visitType: string;
  serviceLine: ServiceLine;
  patientSatisfaction: number; // 1 to 10
  communicationRating: number; // 1 to 5
  followUpCompliance: 'Compliant' | 'At Risk' | 'Non-Compliant' | 'Unknown';
  complaintSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
  patientPortalUsage: 'Active' | 'Locked Out' | 'Never Registered' | 'Failed Access' | 'Caregiver Managed';
  readmissionRisk: 'Low' | 'Moderate' | 'High';
  aiRiskFlags: {
    hallucinationRisk: boolean;
    biasReview: boolean;
    humanReviewRequired: boolean;
    flagNotes: string;
  };
  mainProblem: string;
  secondaryProblems: string[];
  managementPriority: 'Low' | 'Medium' | 'High';
  priorityReasoning: string;
  managementActions: string[];
  safetyEquityConcerns: string;
  humanReviewNeeded: boolean;
}

export interface PatientRecord {
  id: string;
  timestamp: string;
  source: 'Survey Comment' | 'Patient Portal Message' | 'Grievance Filing' | 'Online Review' | 'Discharge Call Log';
  rawComment: string;
  patientNameSnippet?: string;
  
  // Agent 1 outcome
  feedbackInsight: FeedbackInsightAnalysis;
  // Agent 2 outcome
  experienceMonitoring: ExperienceMonitoringAnalysis;
  // Agent 3 outcome
  complaintTriage: ComplaintTriageAnalysis;
  // Agent 4 outcome
  hospitalManager: HospitalManagerAnalysis;
}

export interface ExecutiveSummaryAlert {
  title: string;
  level: 'CRITICAL ALERT' | 'URGENT WARNING' | 'QUALITY NOTICE';
  serviceLine: string;
  description: string;
  metricImpact: string;
  immediateDirective: string;
}

export interface RecommendedManagementAction {
  id: string;
  title: string;
  departmentTarget: RouteTarget;
  actionText: string;
  expectedOutcome: string;
  urgency: 'Immediate (24-48h)' | 'Short-Term (1-2 Weeks)' | 'Strategic (30 Days)';
}
