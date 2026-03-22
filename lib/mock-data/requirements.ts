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
    id: "pending-reviews",
    label: "Pending Reviews",
    value: "2",
    tone: "warning",
    icon: "clock"
  },
  {
    id: "last-master-sync",
    label: "Last Master Sync",
    value: "10m ago",
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
    statement: "Deliver a premium mixed-use estate with strong ESG-S performance and hospitality-grade user experience.",
    openChangeCount: 0,
    relatedModules: ["Design", "Handover", "Quality"],
    specificFields: [
      { label: "Vision Tags", value: "Timeless elegance, net-zero, hospitality-grade" },
      { label: "Functional Brief", value: "120k sqm mixed-use, fully accessible public realm" },
      { label: "Experience KPIs", value: "Acoustics < 35dB, WELL Gold, premium arrival sequence" }
    ],
    evidence: [
      { id: "client-req-vision", label: "Vision_Statement_v2.pdf", kind: "PDF", sourceLabel: "Board Approved" },
      { id: "client-req-minutes", label: "Board_Minutes_03.docx", kind: "DOCX", sourceLabel: "Executive Office" }
    ],
    linkages: [
      {
        id: "client-req-project-brief",
        targetLabel: "Project Brief",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "info",
        note: "Forms the narrative and success criteria used by the project brief and design governance."
      },
      {
        id: "client-req-design",
        targetLabel: "Design",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Drives material quality, facade performance, and premium space standards."
      },
      {
        id: "client-req-info-req",
        targetLabel: "Information Requirements",
        targetType: "requirement",
        impactLabel: "Indirect",
        tone: "default",
        note: "Client experience KPIs influence digital twin acceptance datasets and commissioning evidence."
      }
    ],
    history: [
      {
        id: "client-req-h1",
        version: "v2.1",
        dateLabel: "22 Mar 2026, 09:10",
        author: "Recording Agent",
        action: "Confirmed the latest board-approved vision statement and ESG targets as the active client baseline.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "client-req-h2",
        version: "v2.0",
        dateLabel: "11 Mar 2026, 15:45",
        author: "PMO Lead",
        action: "Accepted revised hospitality and accessibility KPIs after sponsor review.",
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
    statement: "Consolidated project scope, commercial objectives, and stage-gate deliverables for Horizon Estates.",
    openChangeCount: 1,
    relatedModules: ["Portfolio", "Milestones", "Approvals"],
    specificFields: [
      { label: "Delivery Scope", value: "Retail podium, two residential towers, public plaza, mobility basement" },
      { label: "Stage Gates", value: "Concept, statutory approvals, procurement release, phased handover" },
      { label: "Success Metric", value: "Handover by Mar 2028 within approved target return envelope" }
    ],
    evidence: [
      { id: "project-brief-core", label: "Project_Brief_Master_v1.8.pdf", kind: "PDF", sourceLabel: "Development Office" },
      { id: "project-brief-exco", label: "ExCo_Approval_Note.msg", kind: "MSG", sourceLabel: "Executive Approval" }
    ],
    linkages: [
      {
        id: "project-brief-portfolio",
        targetLabel: "Portfolio (SSOT)",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Feeds the executive summary and route-level reporting narrative for Horizon Estates."
      },
      {
        id: "project-brief-milestones",
        targetLabel: "Milestones",
        targetType: "module",
        impactLabel: "Direct",
        tone: "info",
        note: "Stage-gate commitments define the major programme checkpoints and delay exposure."
      },
      {
        id: "project-brief-approvals",
        targetLabel: "Gov Approvals",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Approval sequences and assumptions must remain aligned with the approved project delivery scope."
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
        action: "Logged sponsor comment requesting refined mobility-basement scope narrative.",
        tone: "warning",
        type: "review"
      }
    ]
  },
  {
    id: "feasibility-studies",
    title: "Feasibility Studies",
    integrityScore: 100,
    owner: "Finance Director",
    version: "v3.0",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "5d ago",
    statement: "Financial, commercial, and technical viability baseline for land use, funding, and market absorption.",
    openChangeCount: 0,
    relatedModules: ["Finance", "Portfolio", "Payment"],
    specificFields: [
      { label: "Target IRR", value: "15.2%" },
      { label: "Net Present Value", value: "$45M" },
      { label: "Market Assumption", value: "Luxury retail at $120/sqm/month" }
    ],
    evidence: [
      { id: "feasibility-model", label: "Feasibility_Final.pdf", kind: "PDF", sourceLabel: "Finance" },
      { id: "feasibility-market", label: "Market_Analysis.xlsx", kind: "XLSX", sourceLabel: "Research Consultant" }
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
        note: "Cost allowances and contingency logic roll into the baseline budget structure."
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
    statement: "Geotechnical constraints and contamination conditions now indicate deeper piling and remediation risk in Zone B.",
    openChangeCount: 2,
    relatedModules: ["Milestones", "Finance", "Procurement"],
    specificFields: [
      { label: "Geotechnical", value: "Deep bedrock at 45m with additional treatment zones" },
      { label: "Contamination", value: "Zone B heavy metals detected above assumption envelope" },
      { label: "Constraints", value: "Max height 120m due to aviation control corridor" }
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
    integrityScore: 100,
    owner: "Commercial Director",
    version: "v4.1",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "10m ago",
    statement: "Approved baseline budget, contingency structure, and change-control thresholds for Horizon Estates.",
    openChangeCount: 0,
    relatedModules: ["Finance", "Procurement", "Payment"],
    specificFields: [
      { label: "Total EFC", value: "$428.4M" },
      { label: "Contingency", value: "5% ($21.4M)" },
      { label: "VO Threshold", value: "10% of awarded value before escalation" }
    ],
    evidence: [
      { id: "budget-approved", label: "Budget_Approval_Signed.pdf", kind: "PDF", sourceLabel: "Commercial Control" },
      { id: "budget-log", label: "Budget_Baseline_Log.xlsx", kind: "XLSX", sourceLabel: "Cost Manager" }
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
        tone: "info",
        note: "Target contract strategy and package sizing are bounded by the approved cost envelope."
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
        action: "Reconciled the approved baseline log with the latest contingency release memo.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "budget-h2",
        version: "v4.0",
        dateLabel: "15 Mar 2026, 18:35",
        author: "Commercial Director",
        action: "Approved contingency structure and change-control thresholds for package release.",
        tone: "info",
        type: "review"
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
    statement: "Master schedule baseline v2 with current critical path and milestone handover commitments.",
    openChangeCount: 1,
    relatedModules: ["Milestones", "Approvals", "Progress"],
    specificFields: [
      { label: "Critical Path", value: "Zone B foundation to Tower A structure" },
      { label: "Handover Date", value: "15 Mar 2028" },
      { label: "Float", value: "14 days overall programme float" }
    ],
    evidence: [
      { id: "programme-p6", label: "P6_Baseline_v2.xer", kind: "XER", sourceLabel: "Planning" },
      { id: "programme-fragnet", label: "Delay_Fragnet_Zone_B.pdf", kind: "PDF", sourceLabel: "Planning Review" }
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
        tone: "default",
        note: "Ownership of delayed interfaces must be confirmed against the latest responsibility matrix revision."
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
    integrityScore: 90,
    owner: "Procurement Lead",
    version: "v1.5",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "4h ago",
    statement: "Target 80% of contract value through GMP and NEC4 target-cost packages with embedded ESG sourcing rules.",
    openChangeCount: 1,
    relatedModules: ["Procurement", "Finance", "Payment"],
    specificFields: [
      { label: "Contract Model", value: "NEC4 Option C target contract for major works" },
      { label: "Tender Packages", value: "14 main packages across enabling, structure, MEP, and fit-out" },
      { label: "ESG Criteria", value: "20% local sourcing and embodied-carbon disclosure mandatory" }
    ],
    evidence: [
      { id: "proc-strategy-core", label: "Procurement_Strategy_Update.pdf", kind: "PDF", sourceLabel: "Procurement" },
      { id: "proc-strategy-risk", label: "Packaging_Risk_Workshop.docx", kind: "DOCX", sourceLabel: "Commercial Risk" }
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
        tone: "info",
        note: "Package sizing and target-cost assumptions must stay within the approved budget envelope."
      },
      {
        id: "proc-strategy-payment",
        targetLabel: "Jarvis PAY",
        targetType: "module",
        impactLabel: "Indirect",
        tone: "default",
        note: "Payment engine contract rules depend on the chosen contract family and compensation-event pathways."
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
    statement: "Cross-functional RACI baseline for stage gates, authority interfaces, procurement releases, and handover deliverables.",
    openChangeCount: 1,
    relatedModules: ["Approvals", "Milestones", "Quality"],
    specificFields: [
      { label: "RACI Coverage", value: "92 key deliverables mapped across sponsor, PMO, consultants, and contractor" },
      { label: "Escalation Window", value: "48h for unresolved authority and design interface issues" },
      { label: "Current Gap", value: "Temporary responsibility overlap on enabling-works permitting" }
    ],
    evidence: [
      { id: "responsibility-raci", label: "RACI_Master_v1.6.xlsx", kind: "XLSX", sourceLabel: "PMO Controls" },
      { id: "responsibility-workshop", label: "Interface_Workshop_Minutes.pdf", kind: "PDF", sourceLabel: "Coordination Workshop" }
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
    integrityScore: 100,
    owner: "BIM Manager",
    version: "v2.2",
    statusLabel: "Synced",
    tone: "success",
    syncTimeLabel: "2d ago",
    statement: "Digital delivery standard for BIM, field evidence, and digital-twin data exchange across construction and handover.",
    openChangeCount: 0,
    relatedModules: ["Design", "Progress", "Handover"],
    specificFields: [
      { label: "LOD Standard", value: "LOD 400 during construction, LOD 500 at FM handover" },
      { label: "Classification", value: "OmniClass v2024" },
      { label: "Delivery Formats", value: "IFC 4x3, RVT 2024, COBie, structured QA evidence" }
    ],
    evidence: [
      { id: "info-req-eir", label: "EIR_Document_v2.pdf", kind: "PDF", sourceLabel: "Digital Delivery" },
      { id: "info-req-bep", label: "BIM_Execution_Plan.pdf", kind: "PDF", sourceLabel: "BIM Manager" }
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
        tone: "info",
        note: "Digital twin acceptance and closeout asset information require this data-delivery baseline."
      },
      {
        id: "info-req-client",
        targetLabel: "Client Requirements",
        targetType: "requirement",
        impactLabel: "Direct",
        tone: "info",
        note: "Client operational and experience KPIs define the evidence fields required for final digital handover."
      }
    ],
    history: [
      {
        id: "info-req-h1",
        version: "v2.2",
        dateLabel: "20 Mar 2026, 12:05",
        author: "BIM Manager",
        action: "Aligned the EIR with digital-twin FM deliverables and updated exchange format requirements.",
        tone: "success",
        type: "baseline"
      },
      {
        id: "info-req-h2",
        version: "v2.1",
        dateLabel: "16 Mar 2026, 08:40",
        author: "Recording Agent",
        action: "Closed review comment on model-classification consistency after consultant confirmation.",
        tone: "info",
        type: "review"
      }
    ]
  }
];
