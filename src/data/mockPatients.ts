import { PatientRecord, ExecutiveSummaryAlert, RecommendedManagementAction } from '../types/healthcare';

export const INITIAL_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: 'CASE-8942',
    timestamp: '2026-10-21 08:30',
    source: 'Grievance Filing',
    patientNameSnippet: 'H. Garcia (Proxy: Daughter)',
    rawComment:
      "My 78-year-old mother was discharged yesterday from Med-Surg after her hip surgery. She only speaks Spanish and neither the nurse nor the discharge coordinator called an interpreter. All the discharge papers and high-risk blood thinner (Lovenox) instructions were printed only in English. She was terrified of taking the wrong injection dosage. When I called the floor, someone said 'just read it to her'. This is unsafe and discriminatory.",
    feedbackInsight: {
      theme: 'Accessibility / Equity',
      sentiment: 'Negative',
      reasoning:
        'The patient was provided vital post-surgical anticoagulation discharge instructions in a language she cannot read without mandatory interpreter services, presenting an acute clinical and linguistic barrier.',
      operationalIssue:
        'Failure in the standard discharge protocol to trigger automated medical interpretation and generate Spanish-translated after-care summaries for LEP patients.',
      riskOrBiasConcern:
        'Severe patient safety risk (anticoagulant dosing error/hemorrhage risk) combined with federal Title VI compliance violation regarding language access.',
      recommendedAction:
        'Mandate bedside medical interpreter verification in the EHR before any LEP discharge can be closed; perform immediate clinical follow-up call with certified medical interpreter today.'
    },
    experienceMonitoring: {
      primaryTheme: 'Accessibility and Equity',
      secondaryThemes: ['Discharge and Follow-Up', 'Communication', 'Patient Safety'],
      operationalBottleneck:
        'Discharge planning workflow lacks automated language-detection gatekeeping; clinical staff bypassed certified video/phone interpreter services due to shift change pressure.',
      equityReview: {
        flagged: true,
        vulnerableGroup: 'Limited English proficiency',
        details:
          'Older adult (78) with Limited English Proficiency (LEP) denied certified medical translation for critical post-operative anticoagulant regimen.'
      },
      riskAssessment: {
        level: 'High',
        categories: ['Patient Safety', 'Compliance', 'Equity', 'Reputational'],
        rationale:
          'High probability of adverse drug event (bleeding or thromboembolism) and regulatory scrutiny under CMS CoP & Section 1557 of the ACA.'
      },
      managerialRecommendation:
        'Implement an electronic health record hard-stop requiring certified interpreter documentation prior to final discharge order release for all patients with primary non-English indicators.'
    },
    complaintTriage: {
      primaryCategory: 'Patient Safety',
      secondaryCategories: ['Communication', 'Staff Conduct'],
      severity: {
        level: 'LEVEL 3 – High',
        reasoning:
          'Inability of the patient or proxy to comprehend lethal-risk medication dosing creates imminent risk of serious adverse drug event and readmission.'
      },
      riskDetection: [
        {
          riskType: 'Patient Safety Risk',
          explanation: 'High risk of inappropriate subcutaneous enoxaparin administration or complete omission leading to deep vein thrombosis.'
        },
        {
          riskType: 'Compliance Risk',
          explanation: 'Non-compliance with Title VI Civil Rights Act, Section 1557 ACA, and Joint Commission Language Access standards.'
        },
        {
          riskType: 'Equity Risk',
          explanation: 'Systemic disparity in post-discharge safety outcomes between English-proficient and non-English-proficient populations.'
        }
      ],
      escalation: {
        routeTo: 'Accessibility Coordinator',
        slaHours: 4,
        humanInterventionRequired: true,
        routingReason:
          'Urgent linguistic intervention required immediately; simultaneous escalation to Nursing Leadership for discharge nurse debrief.'
      }
    },
    hospitalManager: {
      patientPersona: '78yo Spanish-speaking post-arthroplasty patient',
      ageGroup: '65-79',
      visitType: 'Inpatient Admission',
      serviceLine: 'Surgical Services',
      patientSatisfaction: 1,
      communicationRating: 1,
      followUpCompliance: 'At Risk',
      complaintSeverity: 'High',
      patientPortalUsage: 'Never Registered',
      readmissionRisk: 'High',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: true,
        humanReviewRequired: true,
        flagNotes: 'Confirmed Title VI language barrier; immediate nurse liaison dispatch required.'
      },
      mainProblem:
        'Unsafe discharge of LEP geriatric patient without certified medical interpretation or translated medication administration guide.',
      secondaryProblems: [
        'Staff dismissive communication to family proxy',
        'Lack of Spanish portal enrollment for remote caregiver oversight'
      ],
      managementPriority: 'High',
      priorityReasoning:
        'Critical intersection of immediate pharmacological harm, 30-day readmission penalty risk, and institutional civil rights compliance exposure.',
      managementActions: [
        'Dispatch bilingual clinical nurse navigator to perform home health medication reconciliation within 6 hours.',
        'Enact EHR discharge block preventing discharge summary printout without verified translation confirmation.'
      ],
      safetyEquityConcerns:
        'Linguistic disparity leading directly to high-risk medication misunderstanding and potential fatal hemorrhagic or clotting event.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8943',
    timestamp: '2026-10-21 07:15',
    source: 'Patient Portal Message',
    patientNameSnippet: 'E. Jenkins',
    rawComment:
      "I am 84 years old and have had lung cancer treatment here for 6 months. Last week your IT department updated the portal and now it demands a phone text code (2-factor auth). I do not have a smartphone, only a landline. I cannot log in to view my lab results or request my chemotherapy anti-nausea refill. I called support 3 times, stayed on hold 45 minutes, and was told 'everyone needs a smartphone now.' My daughter lives 200 miles away.",
    feedbackInsight: {
      theme: 'Technology / Patient Portal',
      sentiment: 'Negative',
      reasoning:
        'The patient is locked out of vital oncology medication refills and diagnostics due to an inflexible digital authentication requirement incompatible with landline-only elderly patients.',
      operationalIssue:
        'Digital transformation rollout executed without accessibility accommodations or alternative multi-factor authentication (e.g., voice-call OTP or trusted proxy delegation).',
      riskOrBiasConcern:
        'Severe age discrimination and low digital literacy barrier; potential clinical harm from interrupted antiemetic therapy during chemotherapy.',
      recommendedAction:
        'Configure immediate voice-call phone OTP or bypass for vulnerable elderly patients; establish a dedicated high-touch tech concierge for oncology clinics.'
    },
    experienceMonitoring: {
      primaryTheme: 'Technology / Patient Portal',
      secondaryThemes: ['Accessibility and Equity', 'Clinical Care'],
      operationalBottleneck:
        'Enterprise IT security change deployed without clinical workflow coordination or patient demographic impact analysis.',
      equityReview: {
        flagged: true,
        vulnerableGroup: 'Low digital literacy',
        details:
          '84-year-old oncology patient lacking smartphone hardware excluded from portal communication and medication renewal.'
      },
      riskAssessment: {
        level: 'Moderate',
        categories: ['Equity', 'Patient Safety', 'Reputational'],
        rationale:
          'Delayed oncology prescription refill risks uncontrolled chemotherapy-induced nausea, dehydration, and preventable emergency room presentation.'
      },
      managerialRecommendation:
        'Audit all patient portal identity verification pathways to support voice-call OTP and caregiver proxy access; retrain tier-1 IT helpdesk on empathetic patient routing.'
    },
    complaintTriage: {
      primaryCategory: 'Technology / Patient Portal',
      secondaryCategories: ['Clinical Care', 'Other'],
      severity: {
        level: 'LEVEL 2 – Moderate',
        reasoning:
          'Operational IT breakdown preventing medication refill access for an active cancer patient, posing secondary clinical escalation risk.'
      },
      riskDetection: [
        {
          riskType: 'Accessibility Risk',
          explanation: 'Technological barrier systematically excludes geriatric patients without SMS-capable devices.'
        },
        {
          riskType: 'Clinical Risk',
          explanation: 'Potential treatment interruption for active oncology patient due to refill block.'
        }
      ],
      escalation: {
        routeTo: 'Information Technology',
        slaHours: 12,
        humanInterventionRequired: true,
        routingReason:
          'IT security administrator must manually configure voice-call verification and oncology clinic nurse must phone in the prescription refill.'
      }
    },
    hospitalManager: {
      patientPersona: '84yo oncology outpatient living independently',
      ageGroup: '80+',
      visitType: 'Oncology Infusion',
      serviceLine: 'Oncology & Infusion',
      patientSatisfaction: 2,
      communicationRating: 1,
      followUpCompliance: 'At Risk',
      complaintSeverity: 'Medium',
      patientPortalUsage: 'Locked Out',
      readmissionRisk: 'Moderate',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: true,
        humanReviewRequired: true,
        flagNotes: 'Technology rollout bias against landline-reliant geriatric cohorts.'
      },
      mainProblem:
        'MFA update disenfranchised geriatric oncology patient from accessing critical antiemetics and care team communications.',
      secondaryProblems: [
        'Help desk refusal to provide manual workaround',
        'Lack of automated clinical routing when portal fails for high-acuity patients'
      ],
      managementPriority: 'Medium',
      priorityReasoning:
        'Immediate patient clinical need for antiemetics plus broader systemic risk of losing thousands of senior patients from portal engagement.',
      managementActions: [
        'Contact patient via telephone today to facilitate antiemetic refill and enable landline voice-call authentication.',
        'Review IT policy to institute voice-code OTP and paper/telephone alternatives across all geriatric service lines.'
      ],
      safetyEquityConcerns:
        'Digital exclusion of seniors leading to chemotherapy medication non-adherence and avoidable acute dehydration.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8944',
    timestamp: '2026-10-21 06:40',
    source: 'Grievance Filing',
    patientNameSnippet: 'R. Kowalski',
    rawComment:
      "I was admitted to 4-West for acute pancreatitis. The allergy band on my wrist clearly stated SEVERE PENICILLIN ANAPHYLAXIS. At 2:00 AM, a floater nurse came in with an IV bag of Unasyn (ampicillin/sulbactam) and hooked it up. When I questioned her, she said 'the computer approved it.' I demanded she double check. She checked her cart screen and turned pale—it was ordered for the patient in bed B! Had I been asleep or unconscious I would be dead right now.",
    feedbackInsight: {
      theme: 'Clinical Care',
      sentiment: 'Negative',
      reasoning:
        'The patient experienced an egregious near-miss medication administration event involving a known severe anaphylactic allergen due to misidentification and bedside scanning failure.',
      operationalIssue:
        'Breakdown in bar-code medication administration (BCMA) verification, patient two-identifier confirmation, and dual-occupancy room safety checks during night shift.',
      riskOrBiasConcern:
        'Severe patient safety event; life-threatening near-miss with potential lethal outcome and extreme legal/regulatory liability.',
      recommendedAction:
        'Initiate immediate Root Cause Analysis (RCA); review nurse scanner compliance logs and enforce dual-nurse verification on night shifts.'
    },
    experienceMonitoring: {
      primaryTheme: 'Patient Safety',
      secondaryThemes: ['Clinical Care', 'Communication'],
      operationalBottleneck:
        'Night-shift staffing fatigue and bedside bar-code scanner circumvention in shared inpatient rooms.',
      equityReview: {
        flagged: false,
        vulnerableGroup: 'None flagged',
        details: 'Standard inpatient acute safety failure; not demographic-specific.'
      },
      riskAssessment: {
        level: 'High',
        categories: ['Patient Safety', 'Compliance', 'Reputational'],
        rationale:
          'Sentinel event near-miss with high lethality potential. Patient is acutely aware of the failure and safety breach.'
      },
      managerialRecommendation:
        'Institute immediate safety stand-down on 4-West; conduct bedside barcode scanning compliance audit across all inpatient floors within 24 hours.'
    },
    complaintTriage: {
      primaryCategory: 'Patient Safety',
      secondaryCategories: ['Clinical Care', 'Staff Conduct'],
      severity: {
        level: 'LEVEL 4 – Critical',
        reasoning:
          'Near-fatal medication administration failure involving anaphylactic allergen; acute patient harm narrowly averted by alert patient.'
      },
      riskDetection: [
        {
          riskType: 'Patient Safety Risk',
          explanation: 'Imminent threat of lethal anaphylactic shock resulting from wrong-patient medication administration.'
        },
        {
          riskType: 'Compliance Risk',
          explanation: 'Failure of Joint Commission National Patient Safety Goals (NPSG.01.01.01 - Two Patient Identifiers).'
        },
        {
          riskType: 'Reputational Risk',
          explanation: 'Severe liability exposure and likely reportable grievance to state licensing and CMS.'
        }
      ],
      escalation: {
        routeTo: 'Risk Management',
        slaHours: 2,
        humanInterventionRequired: true,
        routingReason:
          'Level 4 Critical safety incident requiring urgent Risk Management, Chief Medical Officer, and Director of Nursing immediate briefing.'
      }
    },
    hospitalManager: {
      patientPersona: '48yo acute inpatient on telemetry floor',
      ageGroup: '36-50',
      visitType: 'Inpatient Admission',
      serviceLine: 'Inpatient Med-Surg',
      patientSatisfaction: 1,
      communicationRating: 1,
      followUpCompliance: 'At Risk',
      complaintSeverity: 'Critical',
      patientPortalUsage: 'Active',
      readmissionRisk: 'Moderate',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: false,
        humanReviewRequired: true,
        flagNotes: 'High-severity safety near-miss. Must be routed directly to executive quality committee.'
      },
      mainProblem:
        'Bedside medication administration failure: nurse attempted to infuse contraindicated penicillin derivative into patient with documented anaphylaxis.',
      secondaryProblems: [
        'Wrong-patient room-bed confusion in semi-private room',
        'Float nurse bypassing bedside barcode scanner protocol'
      ],
      managementPriority: 'High',
      priorityReasoning:
        'Near-sentinel event with severe mortality risk; requires immediate executive containment, patient disclosure, and clinical audit.',
      managementActions: [
        'Dispatch Patient Safety Officer & Nurse Manager to conduct immediate bedside disclosure and support.',
        'Pull electronic medication administration audit logs to verify scanner compliance and mandate remedial training before next shift.'
      ],
      safetyEquityConcerns:
        'Acute patient safety hazard; breakdown of physical and digital safety checkpoints in inpatient wards.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8945',
    timestamp: '2026-10-21 05:10',
    source: 'Survey Comment',
    patientNameSnippet: 'T. Vance',
    rawComment:
      "Arrived at the Emergency Department with severe flank pain (possible kidney stone) at 8:00 PM on Sunday. Sat in hard plastic chairs in the waiting room for 8.5 hours before seeing a doctor. No updates, no triage nurse re-assessment, no pain relief. Several elderly patients gave up and left against medical advice without being seen. When I asked the desk, the receptionist rolled her eyes and snapped 'we have emergencies back here.' Isn't severe pain an emergency?",
    feedbackInsight: {
      theme: 'Wait Time',
      sentiment: 'Negative',
      reasoning:
        'Patient reports an excessive 8.5-hour wait time in the Emergency Department without interval re-triage or pain management, exacerbated by dismissive front-desk communication.',
      operationalIssue:
        'Severe emergency department throughput congestion, lack of active waiting-room clinical reassessment (triage liaison nurse), and inadequate boarding capacity.',
      riskOrBiasConcern:
        'Clinical risk of unmonitored patient deterioration in the waiting room; high Left Without Being Seen (LWBS) rate leading to adverse medical outcomes.',
      recommendedAction:
        'Staff a waiting-room Triage Liaison Nurse to initiate early pain protocols and conduct 60-minute vital reassessments; deliver customer service de-escalation training.'
    },
    experienceMonitoring: {
      primaryTheme: 'Wait Time',
      secondaryThemes: ['Communication', 'Clinical Care', 'Staff Conduct'],
      operationalBottleneck:
        'Peak Sunday night ED boarding crisis; zero rapid-medical-evaluation (RME) or fast-track diversion for acute renal colic patients.',
      equityReview: {
        flagged: true,
        vulnerableGroup: 'Older adults',
        details:
          'Older adults reported abandoning the waiting room (LWBS) due to unmanaged physical discomfort and lack of accessible seating.'
      },
      riskAssessment: {
        level: 'Moderate',
        categories: ['Patient Safety', 'Reputational', 'Operational'],
        rationale:
          'High LWBS rates correlate directly with delayed sepsis/ruptured aneurysm diagnoses and severe hospital liability.'
      },
      managerialRecommendation:
        'Deploy an automated ED Queue Transparency board showing real-time acuity queues, and establish nurse-driven standing order protocols for suspected renal colic analgesia.'
    },
    complaintTriage: {
      primaryCategory: 'Wait Time',
      secondaryCategories: ['Communication', 'Staff Conduct'],
      severity: {
        level: 'LEVEL 2 – Moderate',
        reasoning:
          'Prolonged wait time accompanied by communication failure and high patient frustration, with potential clinical vulnerability due to lack of reassessment.'
      },
      riskDetection: [
        {
          riskType: 'Operational Risk',
          explanation: 'Elevated Emergency Department throughput delays and spiking Left Without Being Seen (LWBS) metrics.'
        },
        {
          riskType: 'Reputational Risk',
          explanation: 'Negative public community perception and HCAHPS emergency care rating deterioration.'
        }
      ],
      escalation: {
        routeTo: 'Quality Improvement Team',
        slaHours: 24,
        humanInterventionRequired: false,
        routingReason:
          'Operational bottleneck analysis needed by ED throughput committee to evaluate boarding and triage liaison staffing.'
      }
    },
    hospitalManager: {
      patientPersona: '42yo adult with acute nephrolithiasis symptoms',
      ageGroup: '36-50',
      visitType: 'Emergency Department',
      serviceLine: 'Emergency',
      patientSatisfaction: 2,
      communicationRating: 1,
      followUpCompliance: 'Unknown',
      complaintSeverity: 'Medium',
      patientPortalUsage: 'Active',
      readmissionRisk: 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: false,
        humanReviewRequired: false,
        flagNotes: 'Operational flow bottleneck; aggregate with ED census telemetry.'
      },
      mainProblem:
        '8.5-hour ED waiting room delay with zero clinical pain intervention or queue transparency.',
      secondaryProblems: [
        'High rate of vulnerable patients leaving AMA/LWBS',
        'Hostile triage reception staff attitude'
      ],
      managementPriority: 'Medium',
      priorityReasoning:
        'Affects overall ED operational throughput, patient safety monitoring in waiting areas, and emergency department HCAHPS scores.',
      managementActions: [
        'Audit Sunday night nurse-to-patient staffing ratios and ED bed turnaround times.',
        'Implement an ED Waiting Room Liaison Nurse to administer rapid standing-order oral analgesia.'
      ],
      safetyEquityConcerns:
        'Unmonitored waiting room patients at risk of undetected clinical deterioration (e.g. sepsis or hemodynamic shock).',
      humanReviewNeeded: false
    }
  },
  {
    id: 'CASE-8946',
    timestamp: '2026-10-21 04:30',
    source: 'Survey Comment',
    patientNameSnippet: 'M. Chen',
    rawComment:
      "I received a bill for $4,850 for my son's outpatient echocardiogram. Before the procedure, the registration clerk confirmed our in-network copay was $150. Now the billing office says the reading cardiologist was an out-of-network contractor, even though the hospital itself is in-network. This violates the No Surprises Act! Billing representative threatened to send us to collections while the dispute is pending.",
    feedbackInsight: {
      theme: 'Billing',
      sentiment: 'Negative',
      reasoning:
        'Patient reports an unexpected balance billing event for an in-network facility where an ancillary contractor was out-of-network, violating statutory protections.',
      operationalIssue:
        'Failure in pre-service financial clearance to coordinate provider network alignment, compounded by aggressive collections escalation during active disputes.',
      riskOrBiasConcern:
        'Severe compliance and legal exposure under the federal No Surprises Act; reputational damage from premature collections threats.',
      recommendedAction:
        'Place an immediate hold on billing and collections; reprocess the claim at in-network cost-sharing under the No Surprises Act framework.'
    },
    experienceMonitoring: {
      primaryTheme: 'Billing',
      secondaryThemes: ['Communication'],
      operationalBottleneck:
        'Disconnect between revenue cycle contracting and patient estimate generation; contractor provider groups not synchronized with hospital network tiers.',
      equityReview: {
        flagged: false,
        vulnerableGroup: 'None flagged',
        details: 'Financial toxicity event impacting middle-income insured families.'
      },
      riskAssessment: {
        level: 'Moderate',
        categories: ['Compliance', 'Reputational'],
        rationale:
          'Potential statutory fine under CMS No Surprises Act enforcement and state attorney general consumer protection inquiry.'
      },
      managerialRecommendation:
        'Enact automated billing locks on all contracted ancillary provider claims until network status and Good Faith Estimates are reconciled.'
    },
    complaintTriage: {
      primaryCategory: 'Billing',
      secondaryCategories: ['Communication'],
      severity: {
        level: 'LEVEL 2 – Moderate',
        reasoning:
          'Significant financial distress and explicit allegation of federal No Surprises Act non-compliance.'
      },
      riskDetection: [
        {
          riskType: 'Compliance Risk',
          explanation: 'Direct violation of federal No Surprises Act prohibition on surprise out-of-network facility charges.'
        },
        {
          riskType: 'Reputational Risk',
          explanation: 'Consumer protection grievance and public rating deterioration over predatory billing practices.'
        }
      ],
      escalation: {
        routeTo: 'Revenue Cycle / Billing',
        slaHours: 24,
        humanInterventionRequired: true,
        routingReason:
          'Requires immediate Revenue Cycle dispute manager intervention to freeze collections and rebill under CMS regulations.'
      }
    },
    hospitalManager: {
      patientPersona: 'Parent of pediatric cardiology patient',
      ageGroup: '36-50',
      visitType: 'Ambulatory Clinic',
      serviceLine: 'Cardiovascular',
      patientSatisfaction: 1,
      communicationRating: 2,
      followUpCompliance: 'Compliant',
      complaintSeverity: 'Medium',
      patientPortalUsage: 'Active',
      readmissionRisk: 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: false,
        humanReviewRequired: true,
        flagNotes: 'Regulatory No Surprises Act compliance check needed.'
      },
      mainProblem:
        'Surprise $4,850 out-of-network balance bill from hospital-based contracted cardiologist following guaranteed $150 copay.',
      secondaryProblems: [
        'Disputed account prematurely routed toward collections',
        'Pre-service estimation accuracy breakdown'
      ],
      managementPriority: 'Medium',
      priorityReasoning:
        'Direct compliance exposure under federal healthcare billing laws and patient experience degradation in pediatric specialty care.',
      managementActions: [
        'Freeze billing account immediately and retract from collection referral.',
        'Adjust balance to the original $150 in-network rate and audit all contracted cardiology billing feeds.'
      ],
      safetyEquityConcerns:
        'Financial toxicity causing families to defer necessary pediatric cardiac follow-up diagnostics.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8947',
    timestamp: '2026-10-21 03:00',
    source: 'Discharge Call Log',
    patientNameSnippet: 'S. Begay',
    rawComment:
      "I live on the Navajo reservation 90 miles from your clinic. I had a virtual diabetes consult scheduled for Tuesday morning. The video link failed to connect, giving an error 404. I called the front desk, but the phone rang for 20 minutes without answer. I am now out of my insulin glargine needles and cannot drive in because our mountain pass was washed out. No one has called me to reschedule.",
    feedbackInsight: {
      theme: 'Scheduling',
      sentiment: 'Negative',
      reasoning:
        'Rural patient experienced a total breakdown of telehealth technology and clinic telecommunications, resulting in clinical supply interruption in a remote region.',
      operationalIssue:
        'Unmonitored virtual clinic link failures, unanswered front-desk telephone queues, and absence of an automatic outreach protocol when a telehealth visit fails.',
      riskOrBiasConcern:
        'Acute health equity concern impacting remote rural Indigenous population; critical clinical risk of diabetic ketoacidosis from insulin administration lapse.',
      recommendedAction:
        'Institute a mandatory nurse callback within 15 minutes of any disconnected telehealth appointment; arrange emergency postal or local clinic courier for insulin supplies.'
    },
    experienceMonitoring: {
      primaryTheme: 'Accessibility and Equity',
      secondaryThemes: ['Technology / Patient Portal', 'Clinical Care', 'Scheduling'],
      operationalBottleneck:
        'Telehealth platform lack of automated SMS reconnection fallback and inadequate clinic front-office phone staffing during virtual appointment blocks.',
      equityReview: {
        flagged: true,
        vulnerableGroup: 'Rural patients',
        details:
          'Rural Indigenous patient residing 90 miles from medical center with limited road transit, dependent on virtual chronic disease management.'
      },
      riskAssessment: {
        level: 'High',
        categories: ['Equity', 'Patient Safety', 'Reputational'],
        rationale:
          'Lapse in basal insulin access presents rapid risk of acute diabetic decompensation and emergency medevac admission.'
      },
      managerialRecommendation:
        'Partner with Indian Health Service / local community health representatives for rural medication drop-off and implement low-bandwidth audio-only phone visit fallback.'
    },
    complaintTriage: {
      primaryCategory: 'Clinical Care',
      secondaryCategories: ['Technology / Patient Portal', 'Scheduling'],
      severity: {
        level: 'LEVEL 3 – High',
        reasoning:
          'Failed telehealth visit coupled with medication supply exhaustion creates immediate potential for diabetic ketoacidosis and emergency hospitalization.'
      },
      riskDetection: [
        {
          riskType: 'Patient Safety Risk',
          explanation: 'Interruption of daily basal insulin therapy in chronic diabetic patient.'
        },
        {
          riskType: 'Equity Risk',
          explanation: 'Severe geographical and infrastructural healthcare disparities affecting rural tribal community members.'
        },
        {
          riskType: 'Accessibility Risk',
          explanation: 'High-bandwidth video portal failure without low-bandwidth audio fallback.'
        }
      ],
      escalation: {
        routeTo: 'Nursing Leadership',
        slaHours: 4,
        humanInterventionRequired: true,
        routingReason:
          'Clinical triage nurse must urgently contact patient by telephone, authorize needle supplies with local pharmacy/IHS, and establish backup care.'
      }
    },
    hospitalManager: {
      patientPersona: '61yo Type-1 diabetic residing in remote rural tribal area',
      ageGroup: '51-64',
      visitType: 'Telehealth Virtual Visit',
      serviceLine: 'Telehealth & Virtual Care',
      patientSatisfaction: 1,
      communicationRating: 1,
      followUpCompliance: 'Non-Compliant',
      complaintSeverity: 'High',
      patientPortalUsage: 'Failed Access',
      readmissionRisk: 'High',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: true,
        humanReviewRequired: true,
        flagNotes: 'Rural equity and clinical medication supply risk.'
      },
      mainProblem:
        'Broken telehealth session and unanswered clinic phone lines left isolated rural diabetic patient without insulin administration supplies.',
      secondaryProblems: [
        'Lack of automated failover to voice telephony when video links fail',
        'No same-day pharmacy coordination for remote geography'
      ],
      managementPriority: 'High',
      priorityReasoning:
        'Immediate threat of acute metabolic decompensation (DKA) and failure of organization rural health equity mandate.',
      managementActions: [
        'Have ambulatory nurse manager call patient directly this morning to arrange insulin supply delivery through regional partner.',
        'Configure telehealth system to automatically initiate phone dial-out if video room is unoccupied 5 minutes past appointment time.'
      ],
      safetyEquityConcerns:
        'Severe geographic vulnerability compounded by fragile digital infrastructure, jeopardizing chronic disease stability.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8948',
    timestamp: '2026-10-21 02:15',
    source: 'Survey Comment',
    patientNameSnippet: 'P. Johansen (Parent)',
    rawComment:
      "Nurse Elena and Dr. Patel in Pediatric Oncology were absolute angels during my 6-year-old daughter's third round of chemo. Elena brought warm blankets, spoke directly to my daughter with so much tenderness, and explained every syringe. When my daughter was scared of the IV beep, Elena made up a silly song that made her laugh. Even in the hardest week of our lives, your team gave us light and hope.",
    feedbackInsight: {
      theme: 'Clinical Care',
      sentiment: 'Positive',
      reasoning:
        'Parent expresses deep gratitude for exemplary compassionate nursing and physician communication during high-stress pediatric chemotherapy.',
      operationalIssue:
        'None. Represents positive gold-standard execution of patient-centered compassionate pediatric care.',
      riskOrBiasConcern:
        'None flagged. Demonstrates high empathy and proactive communication reducing pediatric trauma.',
      recommendedAction:
        'Submit formal DAISY Award nomination for Nurse Elena and share patient testimonial at monthly Pediatric Clinical Quality Committee.'
    },
    experienceMonitoring: {
      primaryTheme: 'Clinical Care',
      secondaryThemes: ['Communication'],
      operationalBottleneck: 'None identified; exemplary benchmark performance.',
      equityReview: {
        flagged: false,
        vulnerableGroup: 'None flagged',
        details: 'Pediatric oncology patient receiving optimal developmental and emotional support.'
      },
      riskAssessment: {
        level: 'Low',
        categories: ['Reputational'],
        rationale: 'Exceptional patient advocacy and positive reputational equity.'
      },
      managerialRecommendation:
        'Recognize staff during shift huddle and document compassionate care behaviors in the nursing best-practice repository.'
    },
    complaintTriage: {
      primaryCategory: 'Clinical Care',
      secondaryCategories: ['Communication'],
      severity: {
        level: 'LEVEL 1 – Low',
        reasoning: 'Positive commendation; zero operational complaint or clinical risk.'
      },
      riskDetection: [],
      escalation: {
        routeTo: 'Patient Experience Team',
        slaHours: 72,
        humanInterventionRequired: false,
        routingReason:
          'Forward to Patient Experience Recognition Coordinator for DAISY Award and leadership commendation letter.'
      }
    },
    hospitalManager: {
      patientPersona: '6yo pediatric oncology inpatient with family',
      ageGroup: '<18',
      visitType: 'Inpatient Admission',
      serviceLine: 'Pediatrics',
      patientSatisfaction: 10,
      communicationRating: 5,
      followUpCompliance: 'Compliant',
      complaintSeverity: 'Low',
      patientPortalUsage: 'Active',
      readmissionRisk: 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: false,
        humanReviewRequired: false,
        flagNotes: 'High-praise benchmark case.'
      },
      mainProblem: 'None; gold standard patient and family experience.',
      secondaryProblems: [],
      managementPriority: 'Low',
      priorityReasoning:
        'Exemplary positive clinical performance; leverage for institutional retention and nursing morale.',
      managementActions: [
        'Award DAISY commendation to Nurse Elena and Dr. Patel.',
        'Feature narrative in hospital clinical leadership briefing as standard of excellence.'
      ],
      safetyEquityConcerns: 'None; high emotional safety maintained for pediatric patient.',
      humanReviewNeeded: false
    }
  },
  {
    id: 'CASE-8949',
    timestamp: '2026-10-20 22:45',
    source: 'Online Review',
    patientNameSnippet: 'Anonymous (Google Review)',
    rawComment:
      "Went to the clinic for a routine checkup. The doctor seemed rushed, barely looked at me, and prescribed something without explaining what it was for. Later the pharmacy called saying my insurance denied it, but the clinic won't answer my questions. Also the waiting room was freezing cold and smelling weird. Not sure if I will come back or if this place even cares.",
    feedbackInsight: {
      theme: 'Mixed or Ambiguous',
      sentiment: 'Mixed',
      reasoning:
        'Comment spans multiple disjointed grievances (physician communication, unexplained prescription, pharmacy insurance denial, clinic telephone responsiveness, and facility environmental cleanliness) without detailed specificity.',
      operationalIssue:
        'Multiple diffuse friction points: rushed provider encounter, uncoordinated medication prior authorization, and facility maintenance upkeep.',
      riskOrBiasConcern:
        'Risk of medication non-compliance due to unexplained therapeutic intent and insurance coverage roadblock.',
      recommendedAction:
        'Reach out to the patient to clarify identity, coordinate medication prior authorization with the pharmacy, and request facility environmental service inspection.'
    },
    experienceMonitoring: {
      primaryTheme: 'Mixed or Ambiguous',
      secondaryThemes: ['Communication', 'Clinical Care', 'Wait Time'],
      operationalBottleneck:
        'Rushed 15-minute appointment scheduling template prevents adequate provider-patient dialogue and real-time pharmacy benefit check.',
      equityReview: {
        flagged: false,
        vulnerableGroup: 'None flagged',
        details: 'Insufficient patient identifying information in anonymous review to assess specific equity vulnerability.'
      },
      riskAssessment: {
        level: 'Moderate',
        categories: ['Reputational', 'Operational'],
        rationale: 'Public 1-star online review affecting ambulatory care community reputation.'
      },
      managerialRecommendation:
        'Post professional public response directing reviewer to Patient Relations; review clinic electronic prior-authorization automation.'
    },
    complaintTriage: {
      primaryCategory: 'Communication',
      secondaryCategories: ['Clinical Care', 'Other'],
      severity: {
        level: 'LEVEL 2 – Moderate',
        reasoning:
          'Multiple moderate service failures resulting in patient defection and unfilled prescription; ambiguous details require outreach.'
      },
      riskDetection: [
        {
          riskType: 'Reputational Risk',
          explanation: 'Unaddressed 1-star public review damaging clinic community acquisition.'
        },
        {
          riskType: 'Clinical Risk',
          explanation: 'Patient left with unfilled, unexplained prescription.'
        }
      ],
      escalation: {
        routeTo: 'Patient Experience Team',
        slaHours: 24,
        humanInterventionRequired: true,
        routingReason:
          'Patient Relations must attempt to identify reviewer and resolve medication inquiry.'
      }
    },
    hospitalManager: {
      patientPersona: 'Adult ambulatory clinic patient',
      ageGroup: '36-50',
      visitType: 'Ambulatory Clinic',
      serviceLine: 'Ambulatory Care',
      patientSatisfaction: 3,
      communicationRating: 2,
      followUpCompliance: 'At Risk',
      complaintSeverity: 'Medium',
      patientPortalUsage: 'Never Registered',
      readmissionRisk: 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: false,
        humanReviewRequired: true,
        flagNotes: 'Ambiguous multi-issue complaint. Information missing on exact medication and provider.'
      },
      mainProblem:
        'Disjointed ambulatory visit with hurried provider communication, failed medication coverage, and unhelpful phone lines.',
      secondaryProblems: [
        'Facility environmental discomfort',
        'Lack of real-time medication cost transparency'
      ],
      managementPriority: 'Medium',
      priorityReasoning:
        'High churn risk for ambulatory patient base and reputational drag on clinic search rankings.',
      managementActions: [
        'Post supportive public liaison reply inviting direct confidential contact.',
        'Brief clinic medical director on provider time-management and pre-authorization workflows.'
      ],
      safetyEquityConcerns: 'Prescription left abandoned due to lack of financial/clinical clarification.',
      humanReviewNeeded: true
    }
  },
  {
    id: 'CASE-8950',
    timestamp: '2026-10-20 20:10',
    source: 'Grievance Filing',
    patientNameSnippet: 'D. Wright (Deaf Patient)',
    rawComment:
      "I am profoundly Deaf and communicate primarily via American Sign Language (ASL). When I arrived for my scheduled surgical consultation at 1:00 PM, I had requested an in-person certified ASL interpreter two weeks in advance. The clinic had forgotten to book one. The nurse tried to force me to use a buggy iPad VRI video interpreter that kept freezing and dropping calls. When I wrote on paper that I cannot follow frozen video, the doctor got irritated and said 'we will just do your surgery and you can sign consent now.' I refused to sign consent for a surgery I did not understand.",
    feedbackInsight: {
      theme: 'Accessibility / Equity',
      sentiment: 'Negative',
      reasoning:
        'Clinic failed to fulfill advance accommodation request for certified ASL interpreter for surgical consent, attempting to pressure patient into signing informed consent without effective communication.',
      operationalIssue:
        'Breakdown in interpreter pre-scheduling logistics and failure of Video Remote Interpreting (VRI) network bandwidth, leading to coercive consent violation.',
      riskOrBiasConcern:
        'Severe legal and ethical liability under Americans with Disabilities Act (ADA Title III) and Joint Commission Patient Rights; invalid surgical informed consent.',
      recommendedAction:
        'Immediately reschedule surgical consultation with guaranteed in-person certified medical ASL interpreter at no charge; conduct mandatory ADA compliance briefing for surgical clinic staff.'
    },
    experienceMonitoring: {
      primaryTheme: 'Accessibility and Equity',
      secondaryThemes: ['Communication', 'Clinical Care', 'Patient Safety'],
      operationalBottleneck:
        'Clinic scheduling software does not automatically bind interpreter requisitions to specialty clinic calendars; VRI Wi-Fi signal degraded in lower-level clinic suites.',
      equityReview: {
        flagged: true,
        vulnerableGroup: 'Disabilities',
        details:
          'Profoundly Deaf patient denied ADA-mandated effective auxiliary aids; provider attempted to obtain surgical consent without comprehension.'
      },
      riskAssessment: {
        level: 'High',
        categories: ['Compliance', 'Patient Safety', 'Reputational', 'Equity'],
        rationale:
          'Direct violation of ADA Title III and federal informed consent regulations; severe liability if surgery proceeded without valid consent.'
      },
      managerialRecommendation:
        'Lock clinic calendar templates so procedures for Deaf/HOH patients cannot be confirmed without confirmed interpreter assignment and upgraded Wi-Fi.'
    },
    complaintTriage: {
      primaryCategory: 'Patient Safety',
      secondaryCategories: ['Communication', 'Staff Conduct'],
      severity: {
        level: 'LEVEL 4 – Critical',
        reasoning:
          'Invalid surgical informed consent attempt combined with federal disability civil rights violation carries severe legal exposure and immediate regulatory breach.'
      },
      riskDetection: [
        {
          riskType: 'Compliance Risk',
          explanation: 'Severe violation of ADA Title III and Joint Commission standards regarding informed consent and effective communication.'
        },
        {
          riskType: 'Patient Safety Risk',
          explanation: 'Attempted to schedule surgical procedure without verified patient comprehension of surgical risks.'
        },
        {
          riskType: 'Equity Risk',
          explanation: 'Systemic discrimination against Deaf/Hard of Hearing individuals seeking specialty care.'
        }
      ],
      escalation: {
        routeTo: 'Compliance Office',
        slaHours: 2,
        humanInterventionRequired: true,
        routingReason:
          'Urgent escalation to Compliance Office, ADA Coordinator, and Surgical Chairman regarding invalid surgical consent attempt.'
      }
    },
    hospitalManager: {
      patientPersona: '54yo Deaf patient requiring elective orthopedic surgery',
      ageGroup: '51-64',
      visitType: 'Surgical Day Care',
      serviceLine: 'Surgical Services',
      patientSatisfaction: 1,
      communicationRating: 1,
      followUpCompliance: 'At Risk',
      complaintSeverity: 'Critical',
      patientPortalUsage: 'Active',
      readmissionRisk: 'Low',
      aiRiskFlags: {
        hallucinationRisk: false,
        biasReview: true,
        humanReviewRequired: true,
        flagNotes: 'High-risk ADA violation and ethical consent breach.'
      },
      mainProblem:
        'Failure to provide pre-requested ASL interpreter for surgical consult and coercive attempt to extract surgical consent without comprehension.',
      secondaryProblems: [
        'VRI hardware and Wi-Fi latency failures in consultation rooms',
        'Physician impatience and lack of disability cultural competency'
      ],
      managementPriority: 'High',
      priorityReasoning:
        'Critical civil rights exposure, legal nullification of surgical consent, and institutional Joint Commission violation.',
      managementActions: [
        'Designated Patient Advocate & ADA Coordinator to personally contact patient to apologize and reschedule with confirmed in-person certified master ASL interpreter.',
        'Issue compliance reminder to all surgical departments: surgery cannot be booked or consented without verified auxiliary aid documentation.'
      ],
      safetyEquityConcerns:
        'Informed consent invalidity and profound disability disenfranchisement in invasive surgical care.',
      humanReviewNeeded: true
    }
  }
];

export const INITIAL_EXECUTIVE_ALERT: ExecutiveSummaryAlert = {
  title: 'CRITICAL MULTI-DEPARTMENT PATIENT SAFETY & EQUITY INTERCEPT',
  level: 'CRITICAL ALERT',
  serviceLine: 'Surgical Services & Inpatient Med-Surg',
  description:
    'Two urgent Level 4 and Level 3 events identified in the last 12 hours: An invalid surgical consent attempt for a Deaf patient (CASE-8950) and a discharge without translated anticoagulant instructions for an LEP Hispanic elder (CASE-8942). Immediate administrative intervention required.',
  metricImpact: 'Title VI & ADA Civil Rights Compliance Exposure | Preventable Readmission Risk: +28%',
  immediateDirective:
    'Audit bedside interpreter verification across all active surgical discharges; freeze unverified informed consents.'
};

export const INITIAL_RECOMMENDED_ACTIONS: RecommendedManagementAction[] = [
  {
    id: 'ACTION-01',
    title: 'Enact Mandatory EHR Interpreter Verification Hard-Stop',
    departmentTarget: 'Accessibility Coordinator',
    actionText:
      'Modify Epic/Cerner discharge documentation templates to mandate verified medical interpreter ID before generating high-risk medication instructions for Limited English Proficient (LEP) and Deaf/HOH patients.',
    expectedOutcome:
      'Eliminates 100% of unassisted foreign-language discharges and mitigates Joint Commission/Title VI civil rights penalties.',
    urgency: 'Immediate (24-48h)'
  },
  {
    id: 'ACTION-02',
    title: 'Deploy Triage Liaison Nurse & Standing Pain Protocols in ED',
    departmentTarget: 'Quality Improvement Team',
    actionText:
      'Staff an active waiting room liaison nurse during peak weekend and evening hours (16:00-02:00) authorized to initiate standing-order renal colic and acute analgesia protocols.',
    expectedOutcome:
      'Reduces ED Left-Without-Being-Seen (LWBS) rate by an estimated 42% and improves emergency domain HCAHPS communication scores.',
    urgency: 'Short-Term (1-2 Weeks)'
  },
  {
    id: 'ACTION-03',
    title: 'Overhaul Patient Portal Authentication & Phone Escalation for Seniors',
    departmentTarget: 'Information Technology',
    actionText:
      'Implement voice-call automated OTP authentication alongside SMS for patients aged 75+, and create an immediate clinical triage transfer rule for patients locked out of active medication renewals.',
    expectedOutcome:
      'Restores portal access for ~3,400 geriatric chronic disease outpatients and prevents therapy interruption.',
    urgency: 'Short-Term (1-2 Weeks)'
  }
];
