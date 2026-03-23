import type { MetricCard, RequirementRecord } from "@/lib/types";

export const requirementSummaryCards: MetricCard[] = [
  {
    id: "elements-in-baseline",
    label: "Elements In Baseline",
    value: "9 / 9",
    tone: "success",
    icon: "checkCircle2"
  },
  {
    id: "baseline-drift-alerts",
    label: "Baseline Drift Alerts",
    value: "1",
    tone: "danger",
    icon: "shieldAlert"
  },
  {
    id: "cross-check-domains",
    label: "Cross-Check Domains",
    value: "8",
    tone: "warning",
    icon: "clock"
  },
  {
    id: "agent-routines",
    label: "Agent Routines",
    value: "18",
    tone: "info",
    icon: "database"
  }
];

export const requirementRecords: RequirementRecord[] = [
  {
    id: "client-requirements",
    title: "Client Requirements",
    integrityScore: 100,
    owner: "PMO Lead",
    version: "v2.1",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "2h ago",
    statement: "Sponsor intent, user experience KPIs, and ESG-S expectations translated into a locked delivery baseline.",
    openChangeCount: 0,
    relatedModules: ["Design", "Handover", "Quality"],
    specificFields: [
      { label: "Vision Tags", value: "Timeless elegance, net-zero-ready estate, hospitality-grade public realm" },
      { label: "Functional Requirement List", value: "120k sqm mixed-use, accessible podium circulation, premium arrival experience" },
      { label: "Experience Standards", value: "Acoustics < 35dB, arrival illuminance > 500 Lux, WELL Gold indoor-air target" },
      { label: "Change Log", value: "3 sponsor clarifications closed, no unresolved client clauses in current baseline" }
    ],
    governance: [
      { label: "Active Baseline", value: "CRB v2.1" },
      { label: "Approved By", value: "Sponsor Board + PMO Lead" },
      { label: "Approval Date", value: "22 Mar 2026" },
      { label: "Source Coverage", value: "Board pack, minutes, and executive email digest synchronized" }
    ],
    automationActions: [
      {
        id: "client-req-auto-minutes",
        title: "Meeting Minutes Extraction",
        description: "Recording Agent parses sponsor minutes and converts narrative demands into structured KPI-ready clauses.",
        sourceLabel: "Board minutes + workshop notes",
        cadenceLabel: "Event-driven",
        statusLabel: "Locked",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 09:08"
      },
      {
        id: "client-req-auto-mail",
        title: "Client Mail Triage",
        description: "New sponsor emails are reconciled against the baseline and routed for PMO review when language is ambiguous.",
        sourceLabel: "Executive mailbox",
        cadenceLabel: "15 min polling",
        statusLabel: "Monitoring",
        tone: "info",
        lastRunLabel: "22 Mar 2026, 09:32"
      }
    ],
    validationChecks: [
      {
        id: "client-req-check-brief",
        label: "Narrative alignment",
        targetLabel: "Project Brief",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Project brief success metrics and positioning language remain consistent with the latest client baseline."
      },
      {
        id: "client-req-check-design",
        label: "Brand-to-design handoff",
        targetLabel: "Design",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Facade performance and premium-space standards are reflected in the active design health rules."
      },
      {
        id: "client-req-check-handover",
        label: "Operational KPI continuity",
        targetLabel: "Handover",
        statusLabel: "Aligned",
        tone: "success",
        detail: "FM-facing comfort and ESG proof points are already tagged for closeout evidence capture."
      }
    ],
    evidence: [
      { id: "client-req-vision", label: "Vision_Statement_v2.pdf", kind: "PDF", sourceLabel: "Board Approved" },
      { id: "client-req-minutes", label: "Board_Minutes_03.docx", kind: "DOCX", sourceLabel: "Executive Office" },
      { id: "client-req-workshop", label: "Brand_Experience_Workshop.xlsx", kind: "XLSX", sourceLabel: "PMO Workshop Pack" }
    ],
    linkages: [
      {
        id: "client-req-project-brief",
        targetLabel: "Project Brief",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "info",
        note: "Forms the project narrative, success metrics, and stage-gate framing used by the brief."
      },
      {
        id: "client-req-design",
        targetLabel: "Design",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Drives premium-material performance criteria, facade tolerances, and hospitality-grade experience standards."
      },
      {
        id: "client-req-info-req",
        targetLabel: "Information Requirements",
        targetType: "requirement",
        impactLabel: "Indirect",
        tone: "default",
        note: "Client-facing comfort and ESG KPIs define which digital proof points must exist at handover."
      }
    ],
    history: [
      {
        id: "client-req-h1",
        version: "v2.1",
        dateLabel: "22 Mar 2026, 09:10",
        author: "Recording Agent",
        action: "Confirmed the latest board-approved client vision statement and ESG-S targets as the active baseline.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "client-req-h2",
        version: "v2.0",
        dateLabel: "11 Mar 2026, 15:45",
        author: "PMO Lead",
        action: "Accepted revised hospitality and accessibility KPI wording after sponsor review.",
        tone: "info",
        type: "review"
      }
    ]
  },
  {
    id: "project-brief",
    title: "Project Brief",
    integrityScore: 98,
    owner: "Development Manager",
    version: "v1.8",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "5h ago",
    statement: "Project constitution baseline covering scope, positioning, constraints, and stage-gate commitments for Horizon Estates.",
    openChangeCount: 1,
    relatedModules: ["Portfolio", "Milestones", "Approvals"],
    specificFields: [
      { label: "Project Overview", value: "120k sqm GFA, 92k sqm saleable area, plot ratio 5.0, height cap 120m" },
      { label: "Product Positioning", value: "Premium residential + retail podium, branded amenity level, Grade-A finish standard" },
      { label: "Key Constraints", value: "Aviation corridor, protected view corridor, mobility-basement interface, public-plaza setback" },
      { label: "Baseline Version", value: "v1.8 effective 22 Mar 2026, signed by Development Director and PMO Lead" }
    ],
    governance: [
      { label: "Signed Baseline", value: "Project Brief v1.8" },
      { label: "Approval Chain", value: "Development Director -> Sponsor -> PMO" },
      { label: "Notice Window", value: "24h stakeholder broadcast on approved deltas" },
      { label: "SSOT Subscribers", value: "Portfolio, Milestones, Approvals, Design" }
    ],
    automationActions: [
      {
        id: "project-brief-auto-delta",
        title: "Revision Delta Monitor",
        description: "New brief uploads are diffed against the last signed version and material deltas are tagged by discipline.",
        sourceLabel: "Document repository",
        cadenceLabel: "Event-driven",
        statusLabel: "Running",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 06:21"
      },
      {
        id: "project-brief-auto-notify",
        title: "Stakeholder Notification Wave",
        description: "Approved scope deltas are routed to downstream module owners with affected sections pre-highlighted.",
        sourceLabel: "PMO notification bus",
        cadenceLabel: "On approval",
        statusLabel: "Delivered",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 06:25"
      }
    ],
    validationChecks: [
      {
        id: "project-brief-check-budget",
        label: "Finish standard affordability",
        targetLabel: "Project Budget",
        statusLabel: "Review",
        tone: "warning",
        detail: "Premium fit-out language remains approved, but commercial control requested one more check against the latest EFC stress case."
      },
      {
        id: "project-brief-check-approvals",
        label: "Authority scope alignment",
        targetLabel: "Gov Approvals",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Current approval inventory still covers the active project scope and setback assumptions."
      },
      {
        id: "project-brief-check-programme",
        label: "Stage-gate sequencing",
        targetLabel: "Project Programme",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Milestone gates continue to reflect the approved delivery strategy and handover sequence."
      }
    ],
    evidence: [
      { id: "project-brief-core", label: "Project_Brief_Master_v1.8.pdf", kind: "PDF", sourceLabel: "Development Office" },
      { id: "project-brief-exco", label: "ExCo_Approval_Note.msg", kind: "MSG", sourceLabel: "Executive Approval" },
      { id: "project-brief-delta", label: "Brief_Delta_Register_v1.8.xlsx", kind: "XLSX", sourceLabel: "PMO Controls" }
    ],
    linkages: [
      {
        id: "project-brief-portfolio",
        targetLabel: "Portfolio (SSOT)",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Feeds the route-level reporting narrative and executive summary for Horizon Estates."
      },
      {
        id: "project-brief-milestones",
        targetLabel: "Milestones",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Stage-gate commitments define the major programme checkpoints and delay exposure surfaces."
      },
      {
        id: "project-brief-approvals",
        targetLabel: "Gov Approvals",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Approval strategy and condition closeout must stay aligned with the approved delivery scope."
      }
    ],
    history: [
      {
        id: "project-brief-h1",
        version: "v1.8",
        dateLabel: "22 Mar 2026, 06:25",
        author: "Recording Agent",
        action: "Re-synced approved stage-gate commitments into the master brief after PMO validation.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "project-brief-h2",
        version: "v1.7",
        dateLabel: "18 Mar 2026, 11:10",
        author: "Development Manager",
        action: "Logged sponsor comment requesting refined mobility-basement scope narrative and branded amenity wording.",
        tone: "warning",
        type: "review"
      }
    ]
  },
  {
    id: "feasibility-studies",
    title: "Feasibility Studies",
    integrityScore: 96,
    owner: "Finance Director",
    version: "v3.0",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "5d ago",
    statement: "Approved economic and technical assumptions governing target returns, ground strategy, and market absorption.",
    openChangeCount: 0,
    relatedModules: ["Finance", "Portfolio", "Payment"],
    specificFields: [
      { label: "Market Assumptions", value: "Luxury retail at $120/sqm/month, 18-month residential absorption, premium occupancy uplift" },
      { label: "Technical Parameters", value: "Bored piling with deep basement, utility diversion allowance, podium transfer structure" },
      { label: "Financial Metrics", value: "IRR 15.2%, NPV $45M, payback within approved sponsor hurdle" },
      { label: "Risk Summary", value: "Ground-condition sensitivity, infrastructure tie-in risk, premium-finish inflation sensitivity" }
    ],
    governance: [
      { label: "Approved Study", value: "Feasibility Pack v3.0" },
      { label: "Scenario Owner", value: "Finance Director" },
      { label: "Freeze Date", value: "17 Mar 2026" },
      { label: "Assumption Index", value: "36 traceable assumptions linked to budget and programme" }
    ],
    automationActions: [
      {
        id: "feasibility-auto-extract",
        title: "Assumption Extraction",
        description: "Key market, technical, and finance assumptions are extracted from the approved report into the SSOT baseline.",
        sourceLabel: "Feasibility report bundle",
        cadenceLabel: "On report issue",
        statusLabel: "Captured",
        tone: "success",
        lastRunLabel: "17 Mar 2026, 10:18"
      },
      {
        id: "feasibility-auto-watch",
        title: "Downstream Variance Watch",
        description: "When site, design, or budget values drift from the approved assumptions, the Feasibility baseline is flagged for PMO review.",
        sourceLabel: "Cross-module event stream",
        cadenceLabel: "Continuous",
        statusLabel: "Watching",
        tone: "info",
        lastRunLabel: "22 Mar 2026, 08:31"
      }
    ],
    validationChecks: [
      {
        id: "feasibility-check-site",
        label: "Ground assumption continuity",
        targetLabel: "Site Information",
        statusLabel: "Watch",
        tone: "warning",
        detail: "Zone B contamination and deeper bedrock now sit outside the original feasibility assumption envelope."
      },
      {
        id: "feasibility-check-budget",
        label: "Contingency resilience",
        targetLabel: "Project Budget",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Current contingency is still within feasibility sensitivity tolerances pending final remediation pricing."
      },
      {
        id: "feasibility-check-finance",
        label: "Funding model continuity",
        targetLabel: "Finance",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Finance stress-test assumptions continue to use the approved feasibility funding inputs."
      }
    ],
    evidence: [
      { id: "feasibility-model", label: "Feasibility_Final.pdf", kind: "PDF", sourceLabel: "Finance" },
      { id: "feasibility-market", label: "Market_Analysis.xlsx", kind: "XLSX", sourceLabel: "Research Consultant" },
      { id: "feasibility-risk", label: "Sensitivity_Register.csv", kind: "CSV", sourceLabel: "Finance Modelling" }
    ],
    linkages: [
      {
        id: "feasibility-finance",
        targetLabel: "Finance",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Funding, revenue, and stress-test assumptions inherit from the approved feasibility model."
      },
      {
        id: "feasibility-budget",
        targetLabel: "Project Budget",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "info",
        note: "Contingency logic and cost allowances roll into the baseline budget structure."
      },
      {
        id: "feasibility-site",
        targetLabel: "Site Information",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "warning",
        note: "Ground and utility assumptions must remain consistent with the active site dossier."
      }
    ],
    history: [
      {
        id: "feasibility-h1",
        version: "v3.0",
        dateLabel: "17 Mar 2026, 10:20",
        author: "Finance Director",
        action: "Locked revised market-rent and absorption assumptions following steering committee approval.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "feasibility-h2",
        version: "v2.9",
        dateLabel: "14 Mar 2026, 09:15",
        author: "Recording Agent",
        action: "Flagged outdated utility-infrastructure capex assumptions for review before baseline release.",
        tone: "warning",
        type: "review"
      }
    ]
  },
  {
    id: "site-information",
    title: "Site Information",
    integrityScore: 82,
    owner: "Site Engineer",
    version: "v1.2",
    statusLabel: "Drift Detected",
    tone: "danger",
    syncTimeLabel: "1h ago",
    statement: "Geotechnical and contamination updates in Zone B now create immediate baseline exposure for budget, programme, and package scope.",
    openChangeCount: 2,
    relatedModules: ["Milestones", "Finance", "Procurement"],
    specificFields: [
      { label: "GIS Coordinates & Boundaries", value: "WGS84 control points validated, red-line boundary refreshed on latest Lands reference" },
      { label: "Underground Conditions", value: "Bedrock at 45m, high water table, utility clashes, heavy-metal contamination in Zone B" },
      { label: "Surrounding Constraints", value: "Residential edge within 50m, traffic interface on east frontage, aviation corridor height limit" },
      { label: "Reality Capture Index", value: "Drone ortho, 360 scan, point-cloud and survey revision set merged into the SSOT model" }
    ],
    governance: [
      { label: "Active Survey Bundle", value: "Site Dossier v1.2" },
      { label: "Verified By", value: "Site Engineer + Environmental Consultant" },
      { label: "Last Field Merge", value: "22 Mar 2026, 08:30" },
      { label: "Open Change Requests", value: "2 downstream change controls pending" }
    ],
    automationActions: [
      {
        id: "site-auto-gis",
        title: "GIS and Survey Ingest",
        description: "Government GIS layers, survey files, and red-line updates are merged into the active site baseline automatically.",
        sourceLabel: "GIS platform + survey uploads",
        cadenceLabel: "Continuous",
        statusLabel: "Merged",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 08:28"
      },
      {
        id: "site-auto-scan",
        title: "Reality Capture Fusion",
        description: "Contamination tests and latest scan data were fused into the terrain model, triggering a cross-module exception.",
        sourceLabel: "Drone, lab, and point-cloud feeds",
        cadenceLabel: "On new capture",
        statusLabel: "Escalated",
        tone: "danger",
        lastRunLabel: "22 Mar 2026, 08:30"
      }
    ],
    validationChecks: [
      {
        id: "site-check-feasibility",
        label: "Ground assumption conflict",
        targetLabel: "Feasibility Studies",
        statusLabel: "Conflict",
        tone: "danger",
        detail: "Current contamination and piling conditions contradict the feasibility-stage cost and constructability assumptions."
      },
      {
        id: "site-check-programme",
        label: "Foundation resequencing",
        targetLabel: "Project Programme",
        statusLabel: "Review",
        tone: "warning",
        detail: "Zone B enabling and foundation activities need resequencing before the next issued baseline."
      },
      {
        id: "site-check-procurement",
        label: "Remediation package scope",
        targetLabel: "Procurement Strategy",
        statusLabel: "Review",
        tone: "warning",
        detail: "Deep piling and remediation scope must be surfaced in the next tender packaging decision."
      }
    ],
    evidence: [
      { id: "site-info-geotech", label: "Geotech_Report_Rev2.pdf", kind: "PDF", sourceLabel: "Ground Investigation" },
      { id: "site-info-gis", label: "GIS_Survey_Zone_B.zip", kind: "ZIP", sourceLabel: "Recording Agent Capture" },
      { id: "site-info-lab", label: "Soil_Contamination_Test.csv", kind: "CSV", sourceLabel: "Environmental Consultant" }
    ],
    linkages: [
      {
        id: "site-info-milestones",
        targetLabel: "Milestones",
        targetType: "module",
        impactLabel: "High Risk",
        tone: "danger",
        note: "Foundation resequencing and remediation works may delay structural commencement by 14 to 21 days."
      },
      {
        id: "site-info-budget",
        targetLabel: "Project Budget",
        targetType: "requirement",
        impactLabel: "High Risk",
        tone: "danger",
        note: "Ground treatment and disposal allowances do not cover the newly detected contamination volume."
      },
      {
        id: "site-info-procurement",
        targetLabel: "Procurement",
        targetType: "module",
        impactLabel: "Direct",
        tone: "warning",
        note: "Deep piling and remediation scope must be reflected in the next tender package release."
      }
    ],
    history: [
      {
        id: "site-info-h1",
        version: "v1.2",
        dateLabel: "22 Mar 2026, 08:30",
        author: "Recording Agent",
        action: "Updated Zone B geotechnical constraints after ingesting the latest GIS survey and contamination test files.",
        tone: "danger",
        type: "drift"
      },
      {
        id: "site-info-h2",
        version: "v1.1",
        dateLabel: "12 Oct 2025, 14:20",
        author: "Site Engineer",
        action: "Logged initial site boundary coordinates and preliminary ground assumptions.",
        tone: "info",
        type: "baseline"
      },
      {
        id: "site-info-h3",
        version: "v1.0",
        dateLabel: "05 Oct 2025, 09:00",
        author: "System",
        action: "Initialized site information record from feasibility-stage assumptions.",
        tone: "default",
        type: "baseline"
      }
    ],
    riskAlert: {
      id: "site-info-risk",
      severityLabel: "Critical",
      sourceLabel: "Recording Agent",
      message:
        "New contamination data in Zone B contradicts the feasibility assumptions and creates immediate budget and timeline exposure downstream.",
      budgetImpactLabel: "+$2.5M to $4.0M",
      timelineImpactLabel: "+14 to 21 Days",
      recommendedAction: "Initiate Change Request"
    }
  },
  {
    id: "project-budget",
    title: "Project Budget",
    integrityScore: 94,
    owner: "Commercial Director",
    version: "v4.1",
    statusLabel: "Variance Review",
    tone: "warning",
    syncTimeLabel: "10m ago",
    statement: "Approved cost baseline remains active, but current EFC and premium-finish exposure require a controlled review loop.",
    openChangeCount: 1,
    relatedModules: ["Finance", "Procurement", "Payment"],
    specificFields: [
      { label: "Approved Cost Limit", value: "$420.0M target cost with 5% contingency under PMO control" },
      { label: "Package Allocation", value: "Civil, MEP, finishes, and enabling packages aligned to 14 release envelopes" },
      { label: "Committed Cost & VO", value: "$185.2M committed, $8.6M VO exposure, remediation allowance not yet locked" },
      { label: "EFC Variance", value: "$428.4M current EFC, +2.0% over approved target pending package refinement" }
    ],
    governance: [
      { label: "Cost Baseline", value: "Budget v4.1" },
      { label: "Approved By", value: "Commercial Director + PMO Controls" },
      { label: "Threshold Logic", value: "Variance > 5% or package overrun > 10% triggers escalation" },
      { label: "Last Reconciliation", value: "22 Mar 2026, 10:05" }
    ],
    automationActions: [
      {
        id: "budget-auto-ingest",
        title: "Contract and Invoice Ingest",
        description: "Awarded values, invoices, and VO instructions are ingested into the baseline budget roll-up automatically.",
        sourceLabel: "Contract log + finance workflow",
        cadenceLabel: "Hourly",
        statusLabel: "Running",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 10:01"
      },
      {
        id: "budget-auto-variance",
        title: "Variance Threshold Monitor",
        description: "Budget vs committed vs EFC deltas are watched against PMO thresholds and routed into review queues when breached.",
        sourceLabel: "Commercial controls engine",
        cadenceLabel: "Continuous",
        statusLabel: "Review",
        tone: "warning",
        lastRunLabel: "22 Mar 2026, 10:05"
      }
    ],
    validationChecks: [
      {
        id: "budget-check-brief",
        label: "Finish standard affordability",
        targetLabel: "Project Brief",
        statusLabel: "Review",
        tone: "warning",
        detail: "Premium amenity and finish commitments remain feasible, but the latest EFC reduces contingency headroom."
      },
      {
        id: "budget-check-procurement",
        label: "Package limit conformity",
        targetLabel: "Procurement Strategy",
        statusLabel: "Review",
        tone: "warning",
        detail: "Potential standalone remediation package needs confirmation before final package caps are re-issued."
      },
      {
        id: "budget-check-finance",
        label: "Funding buffer coverage",
        targetLabel: "Finance",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Funding plan still covers the forecast burn, assuming remediation stays inside current commercial range."
      }
    ],
    evidence: [
      { id: "budget-approved", label: "Budget_Approval_Signed.pdf", kind: "PDF", sourceLabel: "Commercial Control" },
      { id: "budget-log", label: "Budget_Baseline_Log.xlsx", kind: "XLSX", sourceLabel: "Cost Manager" },
      { id: "budget-recon", label: "EFC_Reconciliation_2026-03-22.csv", kind: "CSV", sourceLabel: "Commercial Controls Engine" }
    ],
    linkages: [
      {
        id: "budget-finance",
        targetLabel: "Finance",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Budget baseline drives funding burn, variance analysis, and VO exposure surfaces."
      },
      {
        id: "budget-procurement-strategy",
        targetLabel: "Procurement Strategy",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "warning",
        note: "Tender package sizing and target-cost assumptions are constrained by the active commercial envelope."
      },
      {
        id: "budget-payment",
        targetLabel: "Jarvis PAY",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Payment guardrails inherit approved contract values and variation thresholds from the baseline budget."
      }
    ],
    history: [
      {
        id: "budget-h1",
        version: "v4.1",
        dateLabel: "22 Mar 2026, 10:05",
        author: "Recording Agent",
        action: "Reconciled the approved baseline log with the latest contingency release memo and remediation watch item.",
        tone: "warning",
        type: "review"
      },
      {
        id: "budget-h2",
        version: "v4.0",
        dateLabel: "15 Mar 2026, 18:35",
        author: "Commercial Director",
        action: "Approved contingency structure and change-control thresholds for package release.",
        tone: "info",
        type: "baseline"
      }
    ]
  },
  {
    id: "project-programme",
    title: "Project Programme",
    integrityScore: 95,
    owner: "Planning Manager",
    version: "v2.0",
    statusLabel: "Pending Review",
    tone: "warning",
    syncTimeLabel: "2h ago",
    statement: "Master schedule baseline v2 is active, but fragnet resequencing and ownership alignment remain under review.",
    openChangeCount: 1,
    relatedModules: ["Milestones", "Approvals", "Progress"],
    specificFields: [
      { label: "Key Milestones", value: "Planning permit complete, foundation start active, topping-out Feb 2027, handover Mar 2028" },
      { label: "Critical Path", value: "Zone B remediation -> foundation release -> Tower A structure" },
      { label: "Resource Load", value: "Peak 850 workforce, 4 tower cranes, remediation crew uplift pending" },
      { label: "Schedule Variance", value: "0 days approved baseline variance, +14 to 21 days under current site-risk scenario" }
    ],
    governance: [
      { label: "Current Baseline", value: "P6 Baseline v2.0" },
      { label: "Planning Lead", value: "Planning Manager" },
      { label: "Daily Reconcile", value: "Field diary and site progress matched every 24h" },
      { label: "Change Window", value: "Fragnet decision due before next executive report" }
    ],
    automationActions: [
      {
        id: "programme-auto-parser",
        title: "P6 Plan Parser",
        description: "Critical path, float, and milestone dates are extracted from the planning baseline into the SSOT graph.",
        sourceLabel: "P6 baseline file",
        cadenceLabel: "Daily",
        statusLabel: "Parsed",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 07:40"
      },
      {
        id: "programme-auto-reconcile",
        title: "Field Progress Reconciler",
        description: "Daily reports are checked against the master schedule and trigger fragnet review when variance patterns emerge.",
        sourceLabel: "Daily report ingestion",
        cadenceLabel: "Daily",
        statusLabel: "Review",
        tone: "warning",
        lastRunLabel: "22 Mar 2026, 08:05"
      }
    ],
    validationChecks: [
      {
        id: "programme-check-site",
        label: "Ground risk resequencing",
        targetLabel: "Site Information",
        statusLabel: "Review",
        tone: "warning",
        detail: "Foundation sequencing needs confirmation against the updated contamination and piling constraints."
      },
      {
        id: "programme-check-approvals",
        label: "Authority lead-time continuity",
        targetLabel: "Gov Approvals",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Approval lead-time assumptions remain valid for the current baseline issue."
      },
      {
        id: "programme-check-raci",
        label: "Delayed interface ownership",
        targetLabel: "Responsibility Matrix",
        statusLabel: "Review",
        tone: "warning",
        detail: "Ownership for enabling-works permitting and remediation handoffs still needs final RACI confirmation."
      }
    ],
    evidence: [
      { id: "programme-p6", label: "P6_Baseline_v2.xer", kind: "XER", sourceLabel: "Planning" },
      { id: "programme-fragnet", label: "Delay_Fragnet_Zone_B.pdf", kind: "PDF", sourceLabel: "Planning Review" },
      { id: "programme-daily", label: "Daily_Report_Reconcile_22Mar.csv", kind: "CSV", sourceLabel: "Progress Agent" }
    ],
    linkages: [
      {
        id: "programme-milestones",
        targetLabel: "Milestones",
        targetType: "module",
        impactLabel: "Direct",
        tone: "warning",
        note: "Milestone engine should reflect the pending fragnet review before the next executive report."
      },
      {
        id: "programme-responsibility",
        targetLabel: "Responsibility Matrix",
        targetType: "requirement",
        impactLabel: "Indirect",
        tone: "warning",
        note: "Ownership of delayed interfaces must be confirmed against the latest responsibility matrix revision."
      },
      {
        id: "programme-progress",
        targetLabel: "Progress",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Site progress observations directly calibrate critical path status and rolling forecasts."
      }
    ],
    history: [
      {
        id: "programme-h1",
        version: "v2.0",
        dateLabel: "22 Mar 2026, 08:05",
        author: "Planning Manager",
        action: "Submitted revised fragnet after updated ground-risk assumptions were received from the site information record.",
        tone: "warning",
        type: "review"
      },
      {
        id: "programme-h2",
        version: "v1.9",
        dateLabel: "19 Mar 2026, 19:40",
        author: "Recording Agent",
        action: "Published the approved March baseline with refreshed authority lead-time assumptions.",
        tone: "info",
        type: "baseline"
      }
    ]
  },
  {
    id: "procurement-strategy",
    title: "Procurement Strategy",
    integrityScore: 92,
    owner: "Procurement Lead",
    version: "v1.5",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "4h ago",
    statement: "Tender packaging and contract model baseline remain active, with one commercial watch item linked to remediation scope.",
    openChangeCount: 1,
    relatedModules: ["Procurement", "Finance", "Payment"],
    specificFields: [
      { label: "Package Strategy", value: "14 main packages across enabling, structure, MEP, fit-out, and specialist systems" },
      { label: "Tender Schedule", value: "Facade and MEP release in Q3 2026, remediation package decision pending site-risk gate" },
      { label: "Contract Model", value: "NEC4 Option C target-cost for major works with risk-share clauses and ESG obligations" },
      { label: "Supplier Shortlist", value: "5 prequalified Tier-1 contractors with rating, ESG disclosure, and claims history tracked" }
    ],
    governance: [
      { label: "Active Strategy Memo", value: "Procurement Strategy v1.5" },
      { label: "PMO Approval Gate", value: "Commercial + PMO release approval required" },
      { label: "Release Horizon", value: "Next gate in 12 days" },
      { label: "Strategy Owner", value: "Procurement Lead" }
    ],
    automationActions: [
      {
        id: "procurement-strategy-auto-milestones",
        title: "Tender Milestone Monitor",
        description: "Upcoming tender events are watched and routed into procurement worklists before release dates slip.",
        sourceLabel: "Procurement calendar",
        cadenceLabel: "Daily",
        statusLabel: "Running",
        tone: "success",
        lastRunLabel: "22 Mar 2026, 05:15"
      },
      {
        id: "procurement-strategy-auto-conformance",
        title: "Award-vs-Strategy Conformance",
        description: "Actual bid outcomes and packaging decisions are checked against the approved target-contract strategy.",
        sourceLabel: "Tender evaluation stream",
        cadenceLabel: "On package event",
        statusLabel: "Monitoring",
        tone: "info",
        lastRunLabel: "22 Mar 2026, 05:20"
      }
    ],
    validationChecks: [
      {
        id: "procurement-strategy-check-budget",
        label: "Commercial envelope fit",
        targetLabel: "Project Budget",
        statusLabel: "Review",
        tone: "warning",
        detail: "Package caps remain broadly aligned, but remediation scope may require a revised standalone release envelope."
      },
      {
        id: "procurement-strategy-check-programme",
        label: "Release sequencing",
        targetLabel: "Project Programme",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Current tender calendar still supports the approved major programme gates."
      },
      {
        id: "procurement-strategy-check-payment",
        label: "Contract-family compatibility",
        targetLabel: "Jarvis PAY",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Payment engine rules already support the NEC4 target-cost pathways selected for major packages."
      }
    ],
    evidence: [
      { id: "proc-strategy-core", label: "Procurement_Strategy_Update.pdf", kind: "PDF", sourceLabel: "Procurement" },
      { id: "proc-strategy-risk", label: "Packaging_Risk_Workshop.docx", kind: "DOCX", sourceLabel: "Commercial Risk" },
      { id: "proc-strategy-shortlist", label: "Vendor_Shortlist_Ratings.xlsx", kind: "XLSX", sourceLabel: "Procurement Controls" }
    ],
    linkages: [
      {
        id: "proc-strategy-procurement",
        targetLabel: "Procurement",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Tender package release logic, bidder filters, and contract risk checks are anchored to this strategy."
      },
      {
        id: "proc-strategy-budget",
        targetLabel: "Project Budget",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "warning",
        note: "Package sizing and target-cost assumptions must stay within the approved budget envelope."
      },
      {
        id: "proc-strategy-payment",
        targetLabel: "Jarvis PAY",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Payment engine contract logic depends on the chosen contract family and compensation-event pathways."
      }
    ],
    history: [
      {
        id: "proc-strategy-h1",
        version: "v1.5",
        dateLabel: "22 Mar 2026, 05:20",
        author: "Procurement Lead",
        action: "Confirmed NEC4 target-contract packaging strategy and ESG sourcing thresholds with PMO.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "proc-strategy-h2",
        version: "v1.4",
        dateLabel: "20 Mar 2026, 16:30",
        author: "Recording Agent",
        action: "Logged change request to reclassify remediation works into a standalone tender package if site risk escalates.",
        tone: "warning",
        type: "review"
      }
    ]
  },
  {
    id: "responsibility-matrix",
    title: "Responsibility Matrix",
    integrityScore: 93,
    owner: "PMO Controls",
    version: "v1.6",
    statusLabel: "Pending Review",
    tone: "warning",
    syncTimeLabel: "1d ago",
    statement: "RACI baseline for authority, procurement, and handover deliverables is active, with enabling-works interfaces still under review.",
    openChangeCount: 1,
    relatedModules: ["Approvals", "Milestones", "Quality"],
    specificFields: [
      { label: "WBS Granularity", value: "92 key deliverables mapped to Level 4 package and interface granularity" },
      { label: "Role Definitions", value: "R/A/C/I assignments set across sponsor, PMO, consultants, contractor, and specialist vendors" },
      { label: "Deliverable Register", value: "Drawings, reports, submissions, mock-ups, and closeout packages linked to accountable owners" },
      { label: "Fulfilment Status", value: "1 live overlap on enabling-works permitting, no critical overdue approvals" }
    ],
    governance: [
      { label: "RACI Baseline", value: "Matrix v1.6" },
      { label: "Approvers", value: "PMO Controls + Discipline Leads" },
      { label: "Escalation SLA", value: "48h for unresolved interface ownership" },
      { label: "Last Board Sync", value: "21 Mar 2026, 17:55" }
    ],
    automationActions: [
      {
        id: "responsibility-auto-match",
        title: "Task-to-RACI Match",
        description: "New deliverables inherit accountable and consulted parties when tasks are issued from the module workflow.",
        sourceLabel: "WBS and workflow engine",
        cadenceLabel: "On task creation",
        statusLabel: "Running",
        tone: "success",
        lastRunLabel: "21 Mar 2026, 17:20"
      },
      {
        id: "responsibility-auto-escalate",
        title: "Overdue Escalation Bot",
        description: "Ownership gaps and overdue handoffs are escalated to the next approver when no response is recorded inside the SLA.",
        sourceLabel: "Approval and task logs",
        cadenceLabel: "Hourly",
        statusLabel: "Review",
        tone: "warning",
        lastRunLabel: "21 Mar 2026, 17:55"
      }
    ],
    validationChecks: [
      {
        id: "responsibility-check-approvals",
        label: "Authority handoff clarity",
        targetLabel: "Gov Approvals",
        statusLabel: "Review",
        tone: "warning",
        detail: "Ownership for enabling-works permitting and supporting evidence submission still overlaps across teams."
      },
      {
        id: "responsibility-check-programme",
        label: "Delayed interface accountability",
        targetLabel: "Project Programme",
        statusLabel: "Review",
        tone: "warning",
        detail: "Schedule recovery actions cannot be locked until remediation handoff ownership is finalized."
      },
      {
        id: "responsibility-check-info",
        label: "Review-owner coverage",
        targetLabel: "Information Requirements",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Digital-delivery and model-review approvers are already mapped to the active information baseline."
      }
    ],
    evidence: [
      { id: "responsibility-raci", label: "RACI_Master_v1.6.xlsx", kind: "XLSX", sourceLabel: "PMO Controls" },
      { id: "responsibility-workshop", label: "Interface_Workshop_Minutes.pdf", kind: "PDF", sourceLabel: "Coordination Workshop" },
      { id: "responsibility-overdue", label: "Escalation_Log_21Mar.csv", kind: "CSV", sourceLabel: "Workflow Engine" }
    ],
    linkages: [
      {
        id: "responsibility-approvals",
        targetLabel: "Gov Approvals",
        targetType: "module",
        impactLabel: "Direct",
        tone: "warning",
        note: "Authority follow-up ownership and evidence submission handoffs depend on the latest RACI approval."
      },
      {
        id: "responsibility-quality",
        targetLabel: "Quality",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Site quality supervision loops reference the same accountable and consulted parties."
      },
      {
        id: "responsibility-milestones",
        targetLabel: "Milestones",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "warning",
        note: "Programme recovery tasks cannot close cleanly while interface ownership remains unresolved."
      }
    ],
    history: [
      {
        id: "responsibility-h1",
        version: "v1.6",
        dateLabel: "21 Mar 2026, 17:55",
        author: "PMO Controls",
        action: "Submitted revised accountability matrix for enabling-works permitting and consultant coordination.",
        tone: "warning",
        type: "review"
      },
      {
        id: "responsibility-h2",
        version: "v1.5",
        dateLabel: "18 Mar 2026, 13:05",
        author: "Recording Agent",
        action: "Published approved RACI set for the March baseline pack.",
        tone: "info",
        type: "baseline"
      }
    ]
  },
  {
    id: "information-requirements",
    title: "Information Requirements",
    integrityScore: 96,
    owner: "BIM Manager",
    version: "v2.2",
    statusLabel: "Compliance Review",
    tone: "warning",
    syncTimeLabel: "2d ago",
    statement: "Digital delivery baseline is active, but FM-closeout attributes and experience-proof fields still need one compliance pass.",
    openChangeCount: 1,
    relatedModules: ["Design", "Progress", "Handover"],
    specificFields: [
      { label: "LOD Standard", value: "LOD 400 during construction, LOD 500 for final FM handover" },
      { label: "Data Dictionary", value: "OmniClass 2024 classifications, naming rules, mandatory attribute sets, ESG proof fields" },
      { label: "Delivery Formats", value: "IFC 4x3, RVT 2024, COBie, PDF, structured field and commissioning evidence" },
      { label: "Audit Status", value: "Current model checks pass core geometry rules; FM dataset completeness review remains open" }
    ],
    governance: [
      { label: "Active EIR", value: "EIR v2.2" },
      { label: "Approving Authority", value: "BIM Manager + PMO Digital Delivery" },
      { label: "Coordination Platform", value: "CDE with schema and naming enforcement" },
      { label: "Last Compliance Run", value: "20 Mar 2026, 12:05" }
    ],
    automationActions: [
      {
        id: "info-auto-model-check",
        title: "Model Rule Checker",
        description: "Geometry, LOD, and naming rules are checked automatically before design drops are accepted into the baseline.",
        sourceLabel: "Model check scripts",
        cadenceLabel: "On file upload",
        statusLabel: "Passed",
        tone: "success",
        lastRunLabel: "20 Mar 2026, 12:05"
      },
      {
        id: "info-auto-schema",
        title: "Delivery Schema Validator",
        description: "Digital closeout and proof-of-performance files are checked against the required exchange schema and FM fields.",
        sourceLabel: "CDE validation gateway",
        cadenceLabel: "On package issue",
        statusLabel: "Review",
        tone: "warning",
        lastRunLabel: "20 Mar 2026, 12:03"
      }
    ],
    validationChecks: [
      {
        id: "info-check-design",
        label: "Model classification compliance",
        targetLabel: "Design",
        statusLabel: "Aligned",
        tone: "success",
        detail: "Current design model packages comply with the active classification and naming baseline."
      },
      {
        id: "info-check-handover",
        label: "FM attribute completeness",
        targetLabel: "Handover",
        statusLabel: "Review",
        tone: "warning",
        detail: "Digital twin closeout requires additional maintainable-asset attributes before the FM package can be locked."
      },
      {
        id: "info-check-client",
        label: "Experience KPI evidence mapping",
        targetLabel: "Client Requirements",
        statusLabel: "Review",
        tone: "warning",
        detail: "A small set of hospitality and ESG proof fields still needs explicit mapping into the closeout evidence schema."
      }
    ],
    evidence: [
      { id: "info-req-eir", label: "EIR_Document_v2.pdf", kind: "PDF", sourceLabel: "Digital Delivery" },
      { id: "info-req-bep", label: "BIM_Execution_Plan.pdf", kind: "PDF", sourceLabel: "BIM Manager" },
      { id: "info-req-check", label: "Model_Compliance_Report_20Mar.csv", kind: "CSV", sourceLabel: "Validation Gateway" }
    ],
    linkages: [
      {
        id: "info-req-design",
        targetLabel: "Design",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Model structure, specification metadata, and issue exchange rules derive from the current EIR baseline."
      },
      {
        id: "info-req-handover",
        targetLabel: "Handover",
        targetType: "module",
        impactLabel: "Direct",
        tone: "warning",
        note: "Digital twin acceptance and closeout asset information require the remaining FM fields to be completed."
      },
      {
        id: "info-req-client",
        targetLabel: "Client Requirements",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "warning",
        note: "Client experience KPIs define the proof fields required for final digital handover."
      }
    ],
    history: [
      {
        id: "info-req-h1",
        version: "v2.2",
        dateLabel: "20 Mar 2026, 12:05",
        author: "BIM Manager",
        action: "Aligned the EIR with digital-twin FM deliverables and updated exchange format requirements.",
        tone: "warning",
        type: "review"
      },
      {
        id: "info-req-h2",
        version: "v2.1",
        dateLabel: "16 Mar 2026, 08:40",
        author: "Recording Agent",
        action: "Closed classification consistency review after consultant confirmation and issued the updated compliance report.",
        tone: "info",
        type: "baseline"
      }
    ]
  }
];
