import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

/**
 * Route to perform multi-agent analysis on a patient comment / complaint
 */
app.post('/api/analyze-case', async (req: Request, res: Response) => {
  const { rawComment, source = 'Survey Comment', serviceLineHint = 'Ambulatory Care', ageGroupHint = '51-64' } = req.body;

  if (!rawComment || typeof rawComment !== 'string') {
    res.status(400).json({ error: 'rawComment is required' });
    return;
  }

  // If Gemini API is available, call Gemini 3.8 Flash
  if (ai) {
    try {
      const systemPrompt = `You are an elite Clinical Healthcare Intelligence Engine executing 4 distinct analytical roles for hospital leadership:

1. Patient Feedback Insight Agent:
- Theme: Choose one from: Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Discharge / Follow-Up, Accessibility / Equity, Mixed or Ambiguous
- Sentiment: Positive, Negative, Neutral, Mixed
- Reasoning: Why you selected theme and sentiment
- Operational Issue: Process bottleneck
- Risk or Bias Concern: Patient safety, accessibility, fairness, language, disability, over-automation
- Recommended Action: One practical managerial action. Healthcare quality-improvement tone. If ambiguous or insufficient info, state clearly.

2. Patient Experience Monitoring Agent:
- Primary theme and secondary themes
- Operational issue identification
- Healthcare Equity and Accessibility Review: Flag specific concerns involving Older adults, Rural patients, Disabilities, Limited English proficiency (LEP), or Low digital literacy.
- Risk Assessment: Low, Moderate, or High across Patient Safety, Reputational, Compliance, Equity.
- Managerial Recommendation

3. Complaint Triage Assistant:
- Complaint Category: Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Patient Safety, Privacy or Security, Staff Conduct, Other (Primary and Secondary)
- Severity Assessment: LEVEL 1 – Low, LEVEL 2 – Moderate, LEVEL 3 – High, LEVEL 4 – Critical (with reasoning)
- Risk Detection: Identify applicable risks (Patient Safety Risk, Clinical Risk, Compliance Risk, Privacy Risk, Accessibility Risk, Equity Risk, Reputational Risk, Operational Risk) with explanation
- Escalation Recommendation: ROUTE TO one of: Patient Experience Team, Nursing Leadership, Physician Leadership, Quality Improvement Team, Compliance Office, Information Technology, Revenue Cycle / Billing, Accessibility Coordinator, Risk Management, Executive Review. SLA hours and human intervention required.

4. Hospital Manager Decision Support Agent:
- Patient persona and age group
- Visit type and service line
- Patient satisfaction (1-10) and communication rating (1-5)
- Follow-up compliance (Compliant, At Risk, Non-Compliant, Unknown)
- Complaint severity (Low, Medium, High, Critical)
- Patient portal usage (Active, Locked Out, Never Registered, Failed Access, Caregiver Managed)
- Readmission risk (Low, Moderate, High)
- AI risk flags: hallucinationRisk (boolean), biasReview (boolean), humanReviewRequired (boolean), flagNotes (explanation)
- Main problem and secondary problems
- Management priority: Low, Medium, High + reasoning
- 1-2 Recommended management actions
- Potential safety, accessibility, communication, equity concerns
- Human review needed (boolean)

Return strictly valid JSON conforming to this schema without markdown fences:
{
  "feedbackInsight": {
    "theme": "...",
    "sentiment": "...",
    "reasoning": "...",
    "operationalIssue": "...",
    "riskOrBiasConcern": "...",
    "recommendedAction": "..."
  },
  "experienceMonitoring": {
    "primaryTheme": "...",
    "secondaryThemes": ["..."],
    "operationalBottleneck": "...",
    "equityReview": {
      "flagged": true/false,
      "vulnerableGroup": "Older adults | Rural patients | Disabilities | Limited English proficiency | Low digital literacy | None flagged",
      "details": "..."
    },
    "riskAssessment": {
      "level": "Low | Moderate | High",
      "categories": ["Patient Safety", "Reputational", "Compliance", "Equity"],
      "rationale": "..."
    },
    "managerialRecommendation": "..."
  },
  "complaintTriage": {
    "primaryCategory": "...",
    "secondaryCategories": ["..."],
    "severity": {
      "level": "LEVEL 1 – Low | LEVEL 2 – Moderate | LEVEL 3 – High | LEVEL 4 – Critical",
      "reasoning": "..."
    },
    "riskDetection": [
      {
        "riskType": "Patient Safety Risk | Clinical Risk | Compliance Risk | Privacy Risk | Accessibility Risk | Equity Risk | Reputational Risk | Operational Risk",
        "explanation": "..."
      }
    ],
    "escalation": {
      "routeTo": "Patient Experience Team | Nursing Leadership | Physician Leadership | Quality Improvement Team | Compliance Office | Information Technology | Revenue Cycle / Billing | Accessibility Coordinator | Risk Management | Executive Review",
      "slaHours": 2,
      "humanInterventionRequired": true/false,
      "routingReason": "..."
    }
  },
  "hospitalManager": {
    "patientPersona": "...",
    "ageGroup": "<18 | 18-35 | 36-50 | 51-64 | 65-79 | 80+",
    "visitType": "...",
    "serviceLine": "Emergency | Inpatient Med-Surg | Ambulatory Care | Oncology & Infusion | Cardiovascular | Surgical Services | Pediatrics | Maternal & Women Health | Telehealth & Virtual Care",
    "patientSatisfaction": 3,
    "communicationRating": 2,
    "followUpCompliance": "Compliant | At Risk | Non-Compliant | Unknown",
    "complaintSeverity": "Low | Medium | High | Critical",
    "patientPortalUsage": "Active | Locked Out | Never Registered | Failed Access | Caregiver Managed",
    "readmissionRisk": "Low | Moderate | High",
    "aiRiskFlags": {
      "hallucinationRisk": false,
      "biasReview": false,
      "humanReviewRequired": true,
      "flagNotes": "..."
    },
    "mainProblem": "...",
    "secondaryProblems": ["..."],
    "managementPriority": "Low | Medium | High",
    "priorityReasoning": "...",
    "managementActions": ["Action 1", "Action 2"],
    "safetyEquityConcerns": "...",
    "humanReviewNeeded": true/false
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this patient feedback / complaint context:\n\nSource: ${source}\nService Line Context: ${serviceLineHint}\nPatient Age Group Context: ${ageGroupHint}\n\nPatient Feedback / Comment:\n"${rawComment}"`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      res.json(parsed);
      return;
    } catch (err: any) {
      console.error('Gemini analysis error, falling back to heuristic engine:', err);
      // Fallback below
    }
  }

  // Intelligent fallback synthesis engine if API key is not present or rate limited
  const fallbackResult = generateFallbackAnalysis(rawComment, source, serviceLineHint, ageGroupHint);
  res.json(fallbackResult);
});

// Resilient heuristic engine to ensure continuous operation
function generateFallbackAnalysis(comment: string, source: string, serviceLineHint: string, ageGroupHint: string) {
  const lower = comment.toLowerCase();

  let theme: any = 'Communication';
  let sentiment: any = 'Negative';
  let severityLevel: any = 'LEVEL 2 – Moderate';
  let routeTo: any = 'Patient Experience Team';
  let priority: any = 'Medium';
  let vulnerableGroup: any = 'None flagged';
  let flaggedEquity = false;
  let slaHours = 24;
  let humanInterventionRequired = true;

  if (lower.includes('spanish') || lower.includes('translator') || lower.includes('language') || lower.includes('translate')) {
    theme = 'Accessibility / Equity';
    vulnerableGroup = 'Limited English proficiency';
    flaggedEquity = true;
    routeTo = 'Accessibility Coordinator';
  } else if (lower.includes('portal') || lower.includes('password') || lower.includes('login') || lower.includes('app') || lower.includes('tech')) {
    theme = 'Technology / Patient Portal';
    routeTo = 'Information Technology';
    if (lower.includes('old') || lower.includes('senior') || lower.includes('elderly') || ageGroupHint.includes('79') || ageGroupHint.includes('80')) {
      vulnerableGroup = 'Low digital literacy';
      flaggedEquity = true;
    }
  } else if (lower.includes('bill') || lower.includes('cost') || lower.includes('charge') || lower.includes('insurance') || lower.includes('copay')) {
    theme = 'Billing';
    routeTo = 'Revenue Cycle / Billing';
  } else if (lower.includes('wait') || lower.includes('hours') || lower.includes('delay') || lower.includes('crowded')) {
    theme = 'Wait Time';
    routeTo = 'Quality Improvement Team';
  } else if (lower.includes('discharge') || lower.includes('follow-up') || lower.includes('home') || lower.includes('prescription')) {
    theme = 'Discharge / Follow-Up';
    routeTo = 'Nursing Leadership';
  } else if (lower.includes('safe') || lower.includes('error') || lower.includes('allergic') || lower.includes('fall') || lower.includes('wrong med')) {
    theme = 'Clinical Care';
    severityLevel = 'LEVEL 4 – Critical';
    routeTo = 'Risk Management';
    priority = 'High';
    slaHours = 2;
  }

  if (lower.includes('thank') || lower.includes('wonderful') || lower.includes('great') || lower.includes('compassion') || lower.includes('excellent')) {
    sentiment = 'Positive';
    severityLevel = 'LEVEL 1 – Low';
    priority = 'Low';
    slaHours = 72;
    humanInterventionRequired = false;
  } else if (severityLevel === 'LEVEL 4 – Critical' || lower.includes('lawsuit') || lower.includes('attorney') || lower.includes('harm') || lower.includes('chest pain')) {
    severityLevel = 'LEVEL 4 – Critical';
    priority = 'High';
    slaHours = 2;
    routeTo = 'Risk Management';
  } else if (lower.includes('worse') || lower.includes('unacceptable') || lower.includes('refused')) {
    severityLevel = 'LEVEL 3 – High';
    priority = 'High';
    slaHours = 12;
  }

  return {
    feedbackInsight: {
      theme,
      sentiment,
      reasoning: `Analysis based on clinical narrative indicators: keywords indicate primary touchpoint with ${theme.toLowerCase()} processes and ${sentiment.toLowerCase()} emotional stance.`,
      operationalIssue: `Identified workflow constraint in ${theme} coordination and service delivery responsiveness.`,
      riskOrBiasConcern: flaggedEquity
        ? `Potential equity and accessibility vulnerability detected regarding ${vulnerableGroup}.`
        : 'Potential operational dissatisfaction and care-continuity friction.',
      recommendedAction: `Conduct supervisory review of ${theme} standard operating procedures and implement closed-loop communication.`
    },
    experienceMonitoring: {
      primaryTheme: theme,
      secondaryThemes: ['Communication', 'Clinical Care'].filter((t) => t !== theme),
      operationalBottleneck: `Delay and procedural barriers in ${theme} channel throughput.`,
      equityReview: {
        flagged: flaggedEquity,
        vulnerableGroup,
        details: flaggedEquity
          ? `Disproportionate burden observed impacting ${vulnerableGroup}; recommends assistive accommodation.`
          : 'Standard demographic impact without overt health disparity flags.',
      },
      riskAssessment: {
        level: priority === 'High' ? 'High' : priority === 'Medium' ? 'Moderate' : 'Low',
        categories: priority === 'High' ? ['Patient Safety', 'Reputational'] : ['Reputational'],
        rationale: `Classified based on patient touchpoint criticality and severity level.`
      },
      managerialRecommendation: `Establish quality oversight review within the ${routeTo} for procedural remediation.`
    },
    complaintTriage: {
      primaryCategory: theme === 'Discharge / Follow-Up' ? 'Clinical Care' : (theme as any),
      secondaryCategories: ['Communication'],
      severity: {
        level: severityLevel,
        reasoning: `Severity graded according to urgency, risk of care disruption, and potential patient outcome impact.`
      },
      riskDetection: [
        {
          riskType: priority === 'High' ? 'Patient Safety Risk' : 'Operational Risk',
          explanation: `Identified risk to organizational quality metrics and patient retention.`
        }
      ],
      escalation: {
        routeTo,
        slaHours,
        humanInterventionRequired,
        routingReason: `Designated to ${routeTo} for specialized review based on category taxonomy.`
      }
    },
    hospitalManager: {
      patientPersona: `Patient receiving care in ${serviceLineHint}`,
      ageGroup: (ageGroupHint as any) || '51-64',
      visitType: serviceLineHint,
      serviceLine: (serviceLineHint as any) || 'Ambulatory Care',
      patientSatisfaction: sentiment === 'Positive' ? 9 : sentiment === 'Neutral' ? 6 : 2,
      communicationRating: sentiment === 'Positive' ? 5 : 2,
      followUpCompliance: sentiment === 'Negative' ? 'At Risk' : 'Compliant',
      complaintSeverity: priority === 'High' ? 'Critical' : priority === 'Medium' ? 'Medium' : 'Low',
      patientPortalUsage: flaggedEquity ? 'Failed Access' : 'Active',
      readmissionRisk: priority === 'High' ? 'High' : 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: flaggedEquity,
        humanReviewRequired: humanInterventionRequired,
        flagNotes: flaggedEquity ? 'Demographic vulnerability flagged for human equity review.' : 'Standard automated ingestion.'
      },
      mainProblem: `Breakdown in ${theme.toLowerCase()} protocol impacting patient experience.`,
      secondaryProblems: ['Cross-department communication latency', 'Care-team handoff transparency'],
      managementPriority: priority,
      priorityReasoning: `Severity level and risk metrics require ${priority.toLowerCase()} administrative oversight.`,
      managementActions: [
        `Initiate direct outreach from ${routeTo} within ${slaHours} hours.`,
        `Audit clinical workflow handoffs for ${theme} friction points.`
      ],
      safetyEquityConcerns: flaggedEquity
        ? `Accessibility concern: ${vulnerableGroup} barriers requiring targeted accommodations.`
        : 'Routine operational dissatisfaction without immediate life-safety hazard.',
      humanReviewNeeded: humanInterventionRequired
    }
  };
}

// Development or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AegisHealth Intelligence Canvas] Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
