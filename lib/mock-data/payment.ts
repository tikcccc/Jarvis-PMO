import type {
  PaymentCertificateRecord,
  PaymentContractRuleItem,
  PaymentLiveImpactCard,
  PaymentOverviewMetric,
  PaymentProgressComparisonItem,
  PaymentRuleBucket,
  PaymentTask,
  PaymentValuationRecord,
  PaymentVariationRecord
} from "@/lib/types";

export const paymentPendingTasks: PaymentTask[] = [
  {
    id: "TSK-2026-092",
    typeLabel: "AI Audit Review",
    title: "Review AI Mismatch: MEP Installation (Shaft)",
    context: "Payment Valuation VAL-2026-008",
    contractor: "BuildRight Geo",
    receivedLabel: "2026-03-23 16:00 HKT",
    deadlineLabel: "2026-03-23 18:00 HKT",
    priorityLabel: "High",
    priorityTone: "danger"
  },
  {
    id: "TSK-2026-093",
    typeLabel: "PM Assessment",
    title: "Assess Compensation Event (CE-014)",
    context: "Unforeseen underground utilities (Zone B)",
    contractor: "BuildRight Geo",
    receivedLabel: "2026-03-22 10:00 HKT",
    deadlineLabel: "2026-03-24 12:00 HKT",
    priorityLabel: "High",
    priorityTone: "warning"
  },
  {
    id: "TSK-2026-094",
    typeLabel: "Approval Required",
    title: "Approve Payment Certificate PC-EPC-002",
    context: "Central MEP Plant - Milestone 2 Reached",
    contractor: "VoltTech Engineering",
    receivedLabel: "2026-03-21 14:00 HKT",
    deadlineLabel: "2026-03-25",
    priorityLabel: "Medium",
    priorityTone: "info"
  }
];

export const paymentSiteViewport = {
  latitude: 22.30345,
  longitude: 114.18163,
  zoom: 17.15
};

export const paymentOverviewMetrics: PaymentOverviewMetric[] = [
  {
    id: "certified-value",
    label: "Total Certified Value",
    valueLabel: "$45.2M",
    changeLabel: "+12% vs Last Mo",
    tone: "info"
  },
  {
    id: "blockchain-cleared",
    label: "Blockchain Tx Cleared",
    valueLabel: "142 Transactions",
    tone: "success"
  },
  {
    id: "overclaim-intercepted",
    label: "AI Over-claim Intercepted",
    valueLabel: "$1.24M",
    detailLabel: "3 Claims Blocked this cycle",
    tone: "danger",
    icon: "alertTriangle"
  },
  {
    id: "pending-ce",
    label: "Pending CE (NEC Clause 61)",
    valueLabel: "4 Events",
    detailLabel: "Est. Exposure: $850k",
    tone: "warning"
  }
];

export const paymentProgressComparisonItems: PaymentProgressComparisonItem[] = [
  {
    id: "mep-installation",
    label: "MEP Installation",
    aiPercent: 42,
    contractorPercent: 65,
    aiSeriesLabel: "Eagle Eye AI Progress",
    contractorSeriesLabel: "Contractor Claim",
    alertThresholdPercent: 5
  },
  {
    id: "concrete-works",
    label: "Concrete Works",
    aiPercent: 85,
    contractorPercent: 85,
    aiSeriesLabel: "Eagle Eye AI Progress",
    contractorSeriesLabel: "Contractor Claim",
    alertThresholdPercent: 5
  },
  {
    id: "rebar-fixing",
    label: "Rebar Fixing",
    aiPercent: 95,
    contractorPercent: 95,
    aiSeriesLabel: "Eagle Eye AI Progress",
    contractorSeriesLabel: "Contractor Claim",
    alertThresholdPercent: 5
  },
  {
    id: "site-clearance",
    label: "Site Clearance",
    aiPercent: 100,
    contractorPercent: 100,
    aiSeriesLabel: "Eagle Eye AI Progress",
    contractorSeriesLabel: "Contractor Claim",
    alertThresholdPercent: 5
  }
];

export const paymentContractRules: PaymentContractRuleItem[] = [
  { id: "nec4-option-c", label: "NEC4 ECC Option C", statusLabel: "Early Warning Active", tone: "warning" },
  { id: "hkis-gcc", label: "HKIS GCC 2018", statusLabel: "Retention Deducted", tone: "success" },
  { id: "fidic-silver", label: "FIDIC Silver (EPC)", statusLabel: "Milestone 2 Reached", tone: "info" }
];

export const paymentLiveImpactCard: PaymentLiveImpactCard = {
  label: "Unassessed Compensation",
  valueLabel: "$850,200",
  noteLabel: "CE-014 awaiting PM Assessment. 3 days remaining before deemed accepted (NEC Clause 61.4).",
  tone: "warning"
};

export const paymentMcRuleBuckets: PaymentRuleBucket[] = [
  { id: "gcc", label: "HKIS GCC 2018 (Standard)", tone: "info", accentHex: "#208A9B" },
  { id: "fidic", label: "FIDIC Silver (EPC Milestones)", tone: "info", accentHex: "#208A9B" },
  { id: "nec", label: "NEC4 ECC Option C", tone: "warning", accentHex: "#7C3AED" }
];

export const paymentNscRuleBuckets: PaymentRuleBucket[] = [
  { id: "nsc-standard", label: "NSC Standard Conditions", tone: "info", accentHex: "#5C6BC0" },
  { id: "nsc-nec", label: "NSC (NEC Back-to-Back)", tone: "warning", accentHex: "#5C6BC0" }
];

export const paymentMcCertificates: PaymentCertificateRecord[] = [
  {
    id: "pc-gcc-004",
    statusLabel: "CERTIFIED",
    statusTone: "success",
    summaryBucket: "settled",
    certificateNo: "PC-GCC-004",
    contractTitle: "Superstructure Main Contract",
    contractor: "Apex Construction Group",
    amountValue: 1242383.4,
    ruleLabel: "HKIS GCC 2018",
    ruleTone: "info",
    ruleBucketId: "gcc",
    variationLabel: "Retention 5%",
    aiProgressLabel: "Matched (95%)",
    aiProgressTone: "success",
    txHashLabel: "0x8f3b...3a21",
    auditState: "secured"
  },
  {
    id: "pc-nec-012",
    statusLabel: "AI FLAGGED",
    statusTone: "danger",
    summaryBucket: "flagged",
    certificateNo: "PC-NEC-012",
    contractTitle: "Foundation & Piling Phase 2",
    contractor: "BuildRight Geo",
    amountValue: 890500,
    ruleLabel: "NEC4 ECC Option C",
    ruleTone: "warning",
    ruleBucketId: "nec",
    variationLabel: "CE-014 Pending",
    aiProgressLabel: "Dev: AI 42% | Claim 65%",
    aiProgressTone: "danger",
    auditState: "pending"
  },
  {
    id: "pc-epc-002",
    statusLabel: "PROCESSING",
    statusTone: "info",
    summaryBucket: "processing",
    certificateNo: "PC-EPC-002",
    contractTitle: "Central MEP Plant",
    contractor: "VoltTech Engineering",
    amountValue: 4150000,
    ruleLabel: "FIDIC Silver (EPC)",
    ruleTone: "default",
    ruleBucketId: "fidic",
    variationLabel: "No VO",
    aiProgressLabel: "Milestone Verified",
    aiProgressTone: "success",
    txHashLabel: "0x2a1c...1f4c",
    auditState: "secured"
  },
  {
    id: "pc-gcc-003",
    statusLabel: "PAID",
    statusTone: "success",
    summaryBucket: "settled",
    certificateNo: "PC-GCC-003",
    contractTitle: "Superstructure Main Contract",
    contractor: "Apex Construction Group",
    amountValue: 2100000,
    ruleLabel: "HKIS GCC 2018",
    ruleTone: "info",
    ruleBucketId: "gcc",
    variationLabel: "Retention 5%",
    aiProgressLabel: "Matched (80%)",
    aiProgressTone: "success",
    txHashLabel: "0x9d4a...2b11",
    auditState: "secured"
  }
];

export const paymentNscCertificates: PaymentCertificateRecord[] = [
  {
    id: "nsc-lift-004",
    statusLabel: "CERTIFIED",
    statusTone: "success",
    summaryBucket: "settled",
    certificateNo: "NSC-LIFT-004",
    contractTitle: "Lift & Escalator Installation",
    contractor: "Otis Elevators",
    amountValue: 450200,
    ruleLabel: "NSC Standard Conditions",
    ruleTone: "info",
    ruleBucketId: "nsc-standard",
    variationLabel: "Retention 10%",
    aiProgressLabel: "Matched (100%)",
    aiProgressTone: "success",
    txHashLabel: "0x3a21...8f3b",
    auditState: "secured"
  },
  {
    id: "nsc-fac-011",
    statusLabel: "AI FLAGGED",
    statusTone: "danger",
    summaryBucket: "flagged",
    certificateNo: "NSC-FAC-011",
    contractTitle: "Curtain Wall & Facade",
    contractor: "FarEast Facade",
    amountValue: 1120000,
    ruleLabel: "NSC (NEC Back-to-Back)",
    ruleTone: "warning",
    ruleBucketId: "nsc-nec",
    variationLabel: "CE-002 Pending",
    aiProgressLabel: "Dev: AI 60% | Claim 80%",
    aiProgressTone: "danger",
    auditState: "pending"
  },
  {
    id: "nsc-bms-002",
    statusLabel: "PROCESSING",
    statusTone: "info",
    summaryBucket: "processing",
    certificateNo: "NSC-BMS-002",
    contractTitle: "Building Management System",
    contractor: "Honeywell Systems",
    amountValue: 280500,
    ruleLabel: "NSC Standard Conditions",
    ruleTone: "info",
    ruleBucketId: "nsc-standard",
    variationLabel: "No VO",
    aiProgressLabel: "Installation Verified",
    aiProgressTone: "success",
    txHashLabel: "0x1f4c...2a1c",
    auditState: "secured"
  },
  {
    id: "nsc-lift-003",
    statusLabel: "PAID",
    statusTone: "success",
    summaryBucket: "settled",
    certificateNo: "NSC-LIFT-003",
    contractTitle: "Lift & Escalator Installation",
    contractor: "Otis Elevators",
    amountValue: 650000,
    ruleLabel: "NSC Standard Conditions",
    ruleTone: "info",
    ruleBucketId: "nsc-standard",
    variationLabel: "Retention 10%",
    aiProgressLabel: "Matched (85%)",
    aiProgressTone: "success",
    txHashLabel: "0x2b11...9d4a",
    auditState: "secured"
  }
];

export const paymentValuationRecords: PaymentValuationRecord[] = [
  {
    id: "VAL-2026-009",
    zoneLabel: "Zone A (Podium)",
    contractor: "VoltTech Engineering",
    contractTitle: "Central MEP Plant",
    claimPercent: 100,
    aiPercent: 100,
    claimAmountValue: 4150000,
    aiAmountValue: 4150000,
    statusLabel: "COMPLETED",
    statusTone: "success",
    deviationLabel: "0 DAY VARIANCE",
    cameraLabel: "CAM_PLANT_01_360",
    issueLabel: "None",
    latitude: 22.30382,
    longitude: 114.18116,
    mapLeftPercent: "65%",
    mapTopPercent: "35%"
  },
  {
    id: "VAL-2026-010",
    zoneLabel: "Zone B (Tower 1)",
    contractor: "Apex Construction Group",
    contractTitle: "Superstructure Main Contract",
    claimPercent: 85,
    aiPercent: 78,
    claimAmountValue: 850000,
    aiAmountValue: 780000,
    statusLabel: "AI FLAGGED",
    statusTone: "danger",
    deviationLabel: "> 5% BEHIND CLAIM",
    cameraLabel: "CAM_TOWER_B_L08_360",
    issueLabel: "Concrete Pouring Incomplete",
    latitude: 22.30371,
    longitude: 114.18224,
    mapLeftPercent: "48%",
    mapTopPercent: "58%"
  },
  {
    id: "VAL-2026-008",
    zoneLabel: "Zone C (Block A)",
    contractor: "BuildRight Geo",
    contractTitle: "Foundation & Piling Phase 2",
    claimPercent: 65,
    aiPercent: 42,
    claimAmountValue: 1200000,
    aiAmountValue: 890500,
    statusLabel: "LAGGING",
    statusTone: "danger",
    deviationLabel: "> 20% BEHIND CLAIM",
    cameraLabel: "CAM_TOWER_A_L12_360",
    issueLabel: "MEP Trays Missing in Zone C",
    latitude: 22.30296,
    longitude: 114.18168,
    mapLeftPercent: "28%",
    mapTopPercent: "42%"
  }
];

export const paymentVariationRecords: PaymentVariationRecord[] = [
  {
    id: "CE-014",
    description: "Unforeseen underground utilities (Zone B)",
    contractor: "BuildRight Geo",
    estimatedAmountValue: 420500,
    ruleLabel: "NEC Clause 61",
    ruleTone: "warning",
    statusLabel: "Pending PM Assessment",
    daysLeftLabel: "3 Days"
  },
  {
    id: "VO-GCC-08",
    description: "Facade material upgrade to Type A",
    contractor: "Apex Construction Group",
    estimatedAmountValue: 150000,
    ruleLabel: "HKIS GCC",
    ruleTone: "info",
    statusLabel: "Architect Approved"
  }
];
