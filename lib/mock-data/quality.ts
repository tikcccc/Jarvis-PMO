import type {
  QualityDailyLogRecord,
  QualityDistributionItem,
  QualityInspectionFormRecord,
  QualityLiveFeedItem,
  QualityOverviewMetric,
  QualityPersonnelRecord,
  QualityPassRateTrend,
  QualityRfiRecord,
  QualityRfiStatusSummary,
  QualitySupervisionCase,
  QualityTask
} from "@/lib/types";

export const qualityPendingTasks: QualityTask[] = [
  {
    id: "TSK-Q-001",
    typeLabel: "Inspection Request",
    title: "Approve Slab Concreting L12",
    context: "Tower A - Structural. AI Verification Passed (98%).",
    contractor: "Apex Construction",
    receivedLabel: "2026-03-24 10:15 HKT",
    deadlineLabel: "2026-03-24 14:00 HKT",
    priorityLabel: "High",
    priorityTone: "danger"
  },
  {
    id: "TSK-Q-002",
    typeLabel: "RFI Escalation",
    title: "Resolve RFI-042 (MEP Clash)",
    context: "Tower A L12 (Grid B4). SLA already breached.",
    contractor: "VoltTech MEP",
    receivedLabel: "2026-03-24 08:10 HKT",
    deadlineLabel: "ASAP",
    priorityLabel: "High",
    priorityTone: "danger"
  },
  {
    id: "TSK-Q-003",
    typeLabel: "Competency Alert",
    title: "Review Unauthorized Entry Incident",
    context: "Worker WK-944 detected in Deep Excavation Zone.",
    contractor: "Sub-con X",
    receivedLabel: "2026-03-23 17:00 HKT",
    deadlineLabel: "2026-03-25 12:00 HKT",
    priorityLabel: "Medium",
    priorityTone: "info"
  }
];

export const qualityOverviewMetrics: QualityOverviewMetric[] = [
  {
    id: "first-time-pass-rate",
    label: "First-Time Pass Rate",
    valueLabel: "96.4%",
    changeLabel: "+2.1%",
    tone: "success"
  },
  {
    id: "active-inspections",
    label: "Active Inspections",
    valueLabel: "42 Tasks",
    tone: "info"
  },
  {
    id: "competency-alerts",
    label: "Competency Alerts",
    valueLabel: "2",
    detailLabel: "Uncertified personnel blocked",
    tone: "danger",
    icon: "alertTriangle"
  },
  {
    id: "open-rfis",
    label: "Open RFIs (Overdue)",
    valueLabel: "3 Escalated",
    detailLabel: "SLA: 48h resolution",
    tone: "warning"
  }
];

export const qualityPassRateTrend: QualityPassRateTrend = {
  labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
  firstPassRate: [82, 85, 84, 88, 92, 95, 96],
  defectRectificationRate: [90, 92, 94, 91, 95, 98, 99]
};

export const qualityLiveFeedItems: QualityLiveFeedItem[] = [
  {
    id: "feed-approval",
    typeLabel: "Approval",
    message: "Slab Concreting L12 approved.",
    timeLabel: "10m ago",
    tone: "success",
    icon: "checkCircle2"
  },
  {
    id: "feed-alert",
    typeLabel: "Alert",
    message: "Uncertified welder blocked at Zone B.",
    timeLabel: "1h ago",
    tone: "danger",
    icon: "shieldAlert"
  },
  {
    id: "feed-rfi",
    typeLabel: "RFI",
    message: "RFI-042 (MEP Clash) escalated to PM.",
    timeLabel: "2h ago",
    tone: "warning",
    icon: "messageSquare"
  },
  {
    id: "feed-scan",
    typeLabel: "Scan",
    message: "Eagle Eye completed L10 visual scan.",
    timeLabel: "3h ago",
    tone: "info",
    icon: "camera"
  }
];

export const qualitySupervisionCases: QualitySupervisionCase[] = [
  {
    id: "SUP-001",
    title: "Slab Concreting L12",
    zoneLabel: "Tower A",
    contractor: "Apex Construction",
    disciplineLabel: "Structural",
    statusLabel: "Inspection Requested",
    statusTone: "warning",
    timeLabel: "Today, 10:30",
    commenceChecks: [
      { id: "prev-process", label: "Previous Process Accepted", passed: true },
      { id: "rfi-closed", label: "All RFIs Closed", passed: true }
    ],
    commenceNote: "Electronic Commence Order generated on 2026-03-24 08:00 by Jarvis DWSS.",
    executionSummary: "12 workers logged. 100% competency matched.",
    executionTone: "success",
    submissionNote: "Rebar fixing completed, ready for inspection.",
    submissionAttachmentLabel: "2 Attachments",
    aiChecks: [
      { id: "rebar-density", label: "Rebar Density Check", resultLabel: "98% Match", tone: "success" },
      { id: "cleanliness", label: "Cleanliness Check", resultLabel: "Passed", tone: "success" }
    ],
    completionNote: "Completion approval is awaiting final supervisor sign-off."
  },
  {
    id: "SUP-002",
    title: "Wall Reinforcement L13",
    zoneLabel: "Tower A",
    contractor: "Apex Construction",
    disciplineLabel: "Structural",
    statusLabel: "Commence Pending",
    statusTone: "default",
    timeLabel: "Today, 14:00",
    commenceChecks: [
      { id: "prev-process", label: "Previous Process Accepted", passed: true },
      { id: "rfi-closed", label: "All RFIs Closed", passed: false }
    ],
    commenceNote: "Commence order is blocked until RFI-043 is executed on site.",
    executionSummary: "Crew roster provisioned. Workfront remains locked.",
    executionTone: "warning",
    submissionNote: "No contractor completion submission yet.",
    submissionAttachmentLabel: "0 Attachments",
    aiChecks: [
      { id: "prereq-lock", label: "Prerequisite Validation", resultLabel: "Blocked by Open RFI", tone: "warning" },
      { id: "trade-cert", label: "Trade Certificate Match", resultLabel: "Ready", tone: "success" }
    ],
    completionNote: "Completion approval will stay locked until commence approval clears."
  },
  {
    id: "SUP-003",
    title: "MEP Rough-in",
    zoneLabel: "Zone B (Podium)",
    contractor: "VoltTech MEP",
    disciplineLabel: "MEP",
    statusLabel: "In Progress",
    statusTone: "info",
    timeLabel: "Started 2d ago",
    commenceChecks: [
      { id: "prev-process", label: "Previous Process Accepted", passed: true },
      { id: "rfi-closed", label: "All RFIs Closed", passed: true }
    ],
    commenceNote: "Electronic commence order issued on 2026-03-22 09:20 by Jarvis DWSS.",
    executionSummary: "9 workers logged. One design clash alert remains under review.",
    executionTone: "info",
    submissionNote: "Daily evidence is syncing from Eagle Eye and field supervisor logs.",
    submissionAttachmentLabel: "4 Attachments",
    aiChecks: [
      { id: "clash-detection", label: "MEP Clash Detection", resultLabel: "Potential Beam Conflict", tone: "danger" },
      { id: "workfront-clean", label: "Workfront Condition", resultLabel: "Passed", tone: "success" }
    ],
    completionNote: "Completion approval will open once the active clash is resolved."
  },
  {
    id: "SUP-004",
    title: "Waterproofing Layer",
    zoneLabel: "Basement 2",
    contractor: "BuildRight Geo",
    disciplineLabel: "Architectural",
    statusLabel: "Approved",
    statusTone: "success",
    timeLabel: "Yesterday",
    commenceChecks: [
      { id: "prev-process", label: "Previous Process Accepted", passed: true },
      { id: "rfi-closed", label: "All RFIs Closed", passed: true }
    ],
    commenceNote: "Commence order and completion certificate both archived in the immutable registry.",
    executionSummary: "7 workers logged. No competency exceptions.",
    executionTone: "success",
    submissionNote: "Final waterproofing evidence matched Eagle Eye scan baseline.",
    submissionAttachmentLabel: "3 Attachments",
    aiChecks: [
      { id: "surface-continuity", label: "Surface Continuity", resultLabel: "100% Match", tone: "success" },
      { id: "water-stop", label: "Water Stop Installation", resultLabel: "Verified", tone: "success" }
    ],
    completionNote: "Completion approval certificate issued on 2026-03-23 17:40."
  }
];

export const qualityPersonnelRecords: QualityPersonnelRecord[] = [
  {
    id: "WK-882",
    name: "Wong Chun",
    roleLabel: "Certified Welder",
    company: "Apex Construction",
    zoneLabel: "Tower A L12",
    timeInLabel: "08:15",
    statusLabel: "Authorized",
    tone: "success"
  },
  {
    id: "WK-883",
    name: "Chan Tai Man",
    roleLabel: "General Labor",
    company: "Apex Construction",
    zoneLabel: "Tower A L12",
    timeInLabel: "08:18",
    statusLabel: "Authorized",
    tone: "success"
  },
  {
    id: "WK-901",
    name: "Lee Siu Ming",
    roleLabel: "Electrician",
    company: "VoltTech MEP",
    zoneLabel: "Zone B Podium",
    timeInLabel: "09:02",
    statusLabel: "Authorized",
    tone: "success"
  },
  {
    id: "WK-944",
    name: "Ho Kin",
    roleLabel: "General Labor",
    company: "Sub-con X",
    zoneLabel: "Deep Excavation Zone",
    timeInLabel: "10:15",
    statusLabel: "Violation",
    tone: "danger",
    reasonLabel: "No confined space cert."
  }
];

export const qualityCompetencyAlert = {
  title: "Security Breach Detected: Unauthorized Entry",
  message:
    "Worker WK-944 (General Labor) detected in Deep Excavation Zone without required Confined Space Operation certificate. Safety Officer dispatched."
};

export const qualityRfiStatusSummary: QualityRfiStatusSummary[] = [
  { id: "resolved", label: "Resolved (Closed)", count: 142, tone: "success" },
  { id: "pending", label: "Pending Reply", count: 2, tone: "warning" },
  { id: "escalated", label: "Escalated (Overdue)", count: 1, tone: "danger" }
];

export const qualityRfiDistribution: QualityDistributionItem[] = [
  { id: "design-clash", label: "Design Clash (BIM)", percent: 45, accentHex: "#F59E0B" },
  { id: "material-spec", label: "Material & Spec Query", percent: 35, accentHex: "#F59E0B" },
  { id: "site-condition", label: "Site Condition / Other", percent: 20, accentHex: "#F59E0B" }
];

export const qualityRfiRecords: QualityRfiRecord[] = [
  {
    id: "RFI-042",
    statusLabel: "Escalated",
    statusTone: "danger",
    typeLabel: "Design Clash",
    locationLabel: "Tower A L12 (Grid B4)",
    description: "MEP duct clashes with structural beam.",
    contractor: "VoltTech MEP",
    submittedLabel: "2026-03-22",
    slaLabel: "Overdue 4h",
    slaTone: "danger"
  },
  {
    id: "RFI-043",
    statusLabel: "Pending",
    statusTone: "info",
    typeLabel: "Material Spec",
    locationLabel: "Zone B Podium",
    description: "Clarification on stone cladding finish.",
    contractor: "Apex Construction",
    submittedLabel: "2026-03-23",
    slaLabel: "12h left",
    slaTone: "warning"
  },
  {
    id: "RFI-044",
    statusLabel: "Pending",
    statusTone: "info",
    typeLabel: "Site Condition",
    locationLabel: "Deep Excavation",
    description: "Unforeseen underground utility pipe.",
    contractor: "BuildRight Geo",
    submittedLabel: "2026-03-24",
    slaLabel: "42h left",
    slaTone: "default"
  },
  {
    id: "RFI-041",
    statusLabel: "Closed",
    statusTone: "success",
    typeLabel: "Site Query",
    locationLabel: "Basement 2",
    description: "Water seepage near retaining wall.",
    contractor: "BuildRight Geo",
    submittedLabel: "2026-03-20",
    slaLabel: "Resolved",
    slaTone: "success"
  }
];

export const qualityInspectionRegistryStats = {
  totalProcessedLabel: "1,242"
};

export const qualityInspectionStatusSummary: QualityRfiStatusSummary[] = [
  { id: "approved", label: "Approved", count: 2, tone: "success" },
  { id: "pending-review", label: "Pending Review", count: 1, tone: "info" },
  { id: "ai-flagged", label: "AI Flagged", count: 1, tone: "danger" }
];

export const qualityInspectionDistribution: QualityDistributionItem[] = [
  { id: "structural", label: "Structural (Concreting & Rebar)", percent: 50, accentHex: "#208A9B" },
  { id: "mep", label: "MEP (Installation)", percent: 25, accentHex: "#208A9B" },
  { id: "architectural", label: "Architectural / Other", percent: 25, accentHex: "#208A9B" }
];

export const qualityInspectionForms: QualityInspectionFormRecord[] = [
  {
    formId: "FRM-STR-042",
    statusLabel: "Approved",
    statusTone: "success",
    taskTitle: "Slab Concreting L12",
    typeLabel: "Completion Approval",
    typeTone: "info",
    contractor: "Apex Construction",
    locationLabel: "Tower A",
    aiVerificationLabel: "Matched (98%)",
    aiVerificationTone: "success",
    submittedLabel: "2026-03-24",
    auditState: "secured"
  },
  {
    formId: "FRM-MEP-011",
    statusLabel: "AI Flagged",
    statusTone: "danger",
    taskTitle: "Duct Installation Zone B",
    typeLabel: "Completion Approval",
    typeTone: "info",
    contractor: "VoltTech MEP",
    locationLabel: "Zone B Podium",
    aiVerificationLabel: "Clash Detected",
    aiVerificationTone: "danger",
    submittedLabel: "2026-03-23",
    auditState: "pending"
  },
  {
    formId: "FRM-STR-043",
    statusLabel: "Pending",
    statusTone: "info",
    taskTitle: "Wall Reinforcement L13",
    typeLabel: "Work Commence",
    typeTone: "warning",
    contractor: "Apex Construction",
    locationLabel: "Tower A",
    aiVerificationLabel: "Awaiting Data",
    aiVerificationTone: "default",
    submittedLabel: "2026-03-24",
    auditState: "secured"
  },
  {
    formId: "FRM-ARC-009",
    statusLabel: "Approved",
    statusTone: "success",
    taskTitle: "Waterproofing Layer",
    typeLabel: "Completion Approval",
    typeTone: "info",
    contractor: "BuildRight Geo",
    locationLabel: "Basement 2",
    aiVerificationLabel: "Matched (100%)",
    aiVerificationTone: "success",
    submittedLabel: "2026-03-22",
    auditState: "secured"
  }
];

export const qualityDailyArchiveStats = {
  totalLogs: 248,
  averageWorkforce: 181,
  anomaliesThisWeek: 3
};

export const qualityDailyLogs: QualityDailyLogRecord[] = [
  {
    dateLabel: "2026-03-24",
    weatherLabel: "Sunny",
    temperatureLabel: "24°C",
    workersCount: 185,
    managementCount: 12,
    mainConCount: 45,
    specialistCount: 128,
    anomaliesCount: 1,
    statusLabel: "Generated",
    tone: "success",
    hashLabel: "0x8f3b...9d41c",
    processEntries: [
      { id: "proc-1", label: "Slab Concreting L12 (Completed & Approved)", tone: "success" },
      { id: "proc-2", label: "MEP Rough-in Zone B (In Progress)", tone: "info" },
      { id: "proc-3", label: "Wall Rebar L13 (Commence Blocked - Missing Cert)", tone: "danger" }
    ],
    anomalyNote: "14:15 - Security breach: Unauthorized entry (WK-944) in Deep Excavation Zone. Resolved at 14:22."
  },
  {
    dateLabel: "2026-03-23",
    weatherLabel: "Cloudy",
    temperatureLabel: "22°C",
    workersCount: 192,
    managementCount: 12,
    mainConCount: 47,
    specialistCount: 133,
    anomaliesCount: 0,
    statusLabel: "Archived",
    tone: "default",
    hashLabel: "0x1a2b...4c5d",
    processEntries: [
      { id: "proc-1", label: "Waterproofing Layer (Approved)", tone: "success" },
      { id: "proc-2", label: "MEP Rough-in Zone B (In Progress)", tone: "info" }
    ]
  },
  {
    dateLabel: "2026-03-22",
    weatherLabel: "Rainy",
    temperatureLabel: "19°C",
    workersCount: 150,
    managementCount: 11,
    mainConCount: 39,
    specialistCount: 100,
    anomaliesCount: 2,
    statusLabel: "Archived",
    tone: "default",
    hashLabel: "0x9e8d...7b6a",
    processEntries: [
      { id: "proc-1", label: "MEP Rough-in Zone B (Paused by Clash Alert)", tone: "warning" },
      { id: "proc-2", label: "Basement Dewatering Review", tone: "info" }
    ],
    anomalyNote: "Rain delay plus design clash escalation recorded in the immutable log."
  },
  {
    dateLabel: "2026-03-21",
    weatherLabel: "Sunny",
    temperatureLabel: "25°C",
    workersCount: 188,
    managementCount: 12,
    mainConCount: 45,
    specialistCount: 131,
    anomaliesCount: 0,
    statusLabel: "Archived",
    tone: "default",
    hashLabel: "0x3c4d...5e6f",
    processEntries: [{ id: "proc-1", label: "Tower A Rebar Works (Stable)", tone: "success" }]
  },
  {
    dateLabel: "2026-03-20",
    weatherLabel: "Sunny",
    temperatureLabel: "26°C",
    workersCount: 190,
    managementCount: 12,
    mainConCount: 46,
    specialistCount: 132,
    anomaliesCount: 0,
    statusLabel: "Archived",
    tone: "default",
    hashLabel: "0x7f8e...1a2b",
    processEntries: [{ id: "proc-1", label: "Deep Excavation Monitoring (Normal)", tone: "success" }]
  }
];
