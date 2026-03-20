import type {
  ProcurementBidder,
  ProcurementIssueLog,
  ProcurementMetric,
  ProcurementPackage,
  ProcurementSupplierProfile
} from "@/lib/types";

export const procurementSummaryCards: ProcurementMetric[] = [
  {
    id: "packages-under-review",
    label: "Tender Packages Under Review",
    value: "6",
    detail: "2 packages exceed commercial spread threshold",
    tone: "info",
    icon: "shoppingCart"
  },
  {
    id: "compliant-bidders",
    label: "Compliant Bidders",
    value: "14 / 18",
    detail: "78% pass digital BQ validation",
    tone: "success",
    icon: "shieldCheck"
  },
  {
    id: "flagged-contract-risks",
    label: "Flagged Contractual Risks",
    value: "9",
    detail: "3 unbalanced bid patterns detected",
    tone: "danger",
    icon: "alertTriangle"
  },
  {
    id: "pending-clarifications",
    label: "Pending Clarifications",
    value: "21",
    detail: "7 responses due inside the next 48 hours",
    tone: "warning",
    icon: "clock"
  }
];

export const procurementPackages: ProcurementPackage[] = [
  {
    id: "facade-envelope",
    code: "PKG-07",
    name: "Facade & External Envelope",
    stage: "Stage 2 Tender",
    scope: "Facade, glazing, access gantry",
    closingDate: "24 Mar 2026",
    status: "Bid Review",
    tone: "info",
    bidderCount: 4,
    clarificationCount: 6,
    bqCoverage: "98.6%",
    lead: "Commercial / Design",
    engineerEstimate: "$49.2M"
  },
  {
    id: "mep-integrated",
    code: "PKG-11",
    name: "MEP Integrated Services",
    stage: "Clarification Round",
    scope: "HVAC, fire, electrical backbone",
    closingDate: "28 Mar 2026",
    status: "Clarifications",
    tone: "warning",
    bidderCount: 4,
    clarificationCount: 9,
    bqCoverage: "97.1%",
    lead: "MEP / Operations",
    engineerEstimate: "$63.4M"
  },
  {
    id: "vertical-transport",
    code: "PKG-14",
    name: "Vertical Transportation",
    stage: "Recommendation",
    scope: "Lift, escalator, maintenance package",
    closingDate: "18 Mar 2026",
    status: "Ready for Award",
    tone: "success",
    bidderCount: 3,
    clarificationCount: 2,
    bqCoverage: "99.4%",
    lead: "PMO / Site",
    engineerEstimate: "$18.8M"
  }
];

export const procurementBiddersByPackageId: Record<string, ProcurementBidder[]> = {
  "facade-envelope": [
    {
      id: "aurex-build-systems",
      packageId: "facade-envelope",
      supplierId: "supplier-aurex-build-systems",
      name: "Aurex Build Systems",
      commercialOffer: "$48.6M",
      commercialSpread: "-1.2% vs estimate",
      complianceScore: 96,
      bqDeviation: "0.9%",
      riskScore: 28,
      riskLevel: "Low",
      riskTone: "success",
      pricingPattern: "Balanced",
      recommendedAction: "Shortlist",
      recommendedActionTone: "success",
      summary: "Clause schedule aligns with the tender baseline and only minor mock-up sequencing confirmation remains.",
      flags: ["Digital BQ matched 99.1%", "Bid bond verified", "No abnormal front-loading"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "1 minor deviation",
          tone: "success"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "0.6% avg. claims / contract",
          tone: "success"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Float preserved on 3 critical activities",
          tone: "info"
        }
      ]
    },
    {
      id: "novacore-contracting",
      packageId: "facade-envelope",
      supplierId: "supplier-novacore-contracting",
      name: "NovaCore Contracting",
      commercialOffer: "$45.8M",
      commercialSpread: "-6.9% vs estimate",
      complianceScore: 82,
      bqDeviation: "4.8%",
      riskScore: 71,
      riskLevel: "High",
      riskTone: "danger",
      pricingPattern: "Front-loaded",
      recommendedAction: "Escalate",
      recommendedActionTone: "danger",
      summary: "Early trade items are heavily discounted while variation-sensitive items sit above the peer benchmark.",
      flags: ["Unbalanced bid alert", "Missing mock-up lead times", "Clause 17 carve-out requested"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "4 material deviations",
          tone: "danger"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "7.2% avg. claims / contract",
          tone: "danger"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "18-day compression on access cycle",
          tone: "warning"
        }
      ]
    },
    {
      id: "cascade-envelope-jv",
      packageId: "facade-envelope",
      supplierId: "supplier-cascade-envelope-jv",
      name: "Cascade Envelope JV",
      commercialOffer: "$49.4M",
      commercialSpread: "+0.4% vs estimate",
      complianceScore: 90,
      bqDeviation: "1.7%",
      riskScore: 46,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Neutral",
      recommendedAction: "Clarify",
      recommendedActionTone: "warning",
      summary: "Technical submission is credible, but two proposed substitutions need formal design confirmation before ranking.",
      flags: ["2 substitutions pending sign-off", "Warranty schedule complete", "Programme buffers intact"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "2 substitutions awaiting approval",
          tone: "warning"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "2.1% avg. claims / contract",
          tone: "info"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Baseline maintained on sample zones",
          tone: "success"
        }
      ]
    },
    {
      id: "buildaxis-facades",
      packageId: "facade-envelope",
      supplierId: "supplier-buildaxis-facades",
      name: "BuildAxis Facades",
      commercialOffer: "$50.1M",
      commercialSpread: "+1.8% vs estimate",
      complianceScore: 88,
      bqDeviation: "2.4%",
      riskScore: 54,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Back-loaded",
      recommendedAction: "Hold",
      recommendedActionTone: "warning",
      summary: "Strong technical compliance but late-stage rates remain above peer median and require a final negotiation pass.",
      flags: ["Late-stage rate premium", "Sample board complete", "Insurance certificates valid"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "No major deviations",
          tone: "success"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "3.4% avg. claims / contract",
          tone: "warning"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Acceleration cost loaded late",
          tone: "warning"
        }
      ]
    }
  ],
  "mep-integrated": [
    {
      id: "vector-mep-solutions",
      packageId: "mep-integrated",
      supplierId: "supplier-vector-mep-solutions",
      name: "Vector MEP Solutions",
      commercialOffer: "$62.1M",
      commercialSpread: "-2.1% vs estimate",
      complianceScore: 95,
      bqDeviation: "1.2%",
      riskScore: 32,
      riskLevel: "Low",
      riskTone: "success",
      pricingPattern: "Balanced",
      recommendedAction: "Shortlist",
      recommendedActionTone: "success",
      summary: "Submission is complete and trade-by-trade breakdown remains consistent with benchmarked quantities.",
      flags: ["Factory test matrix linked", "BIM quantities aligned", "Warranty schedule complete"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "1 clarification only",
          tone: "success"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "1.1% avg. claims / contract",
          tone: "success"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Commissioning float preserved",
          tone: "success"
        }
      ]
    },
    {
      id: "helios-engineering",
      packageId: "mep-integrated",
      supplierId: "supplier-helios-engineering",
      name: "Helios Engineering",
      commercialOffer: "$60.4M",
      commercialSpread: "-4.7% vs estimate",
      complianceScore: 87,
      bqDeviation: "2.9%",
      riskScore: 57,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Neutral",
      recommendedAction: "Clarify",
      recommendedActionTone: "warning",
      summary: "Competitive pricing is acceptable, but exclusions around control systems and mock-up testing remain open.",
      flags: ["Controls exclusions unresolved", "Panel factory witness pending", "2 alternates submitted"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "2 unresolved exclusions",
          tone: "warning"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "4.1% avg. claims / contract",
          tone: "warning"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Testing sequence still under review",
          tone: "info"
        }
      ]
    },
    {
      id: "orchid-systems",
      packageId: "mep-integrated",
      supplierId: "supplier-orchid-systems",
      name: "Orchid Systems",
      commercialOffer: "$58.9M",
      commercialSpread: "-7.1% vs estimate",
      complianceScore: 79,
      bqDeviation: "5.2%",
      riskScore: 74,
      riskLevel: "High",
      riskTone: "danger",
      pricingPattern: "Front-loaded",
      recommendedAction: "Escalate",
      recommendedActionTone: "danger",
      summary: "Key plant-room packages are underpriced while variation-prone control items carry a significant premium.",
      flags: ["Interface matrix incomplete", "Control items above peer median", "Historic EOT claims trend"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "3 schedule departures",
          tone: "danger"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "8.0% avg. claims / contract",
          tone: "danger"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Plant-room sequence under-resourced",
          tone: "warning"
        }
      ]
    },
    {
      id: "allied-building-services",
      packageId: "mep-integrated",
      supplierId: "supplier-allied-building-services",
      name: "Allied Building Services",
      commercialOffer: "$64.6M",
      commercialSpread: "+1.9% vs estimate",
      complianceScore: 91,
      bqDeviation: "1.8%",
      riskScore: 43,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Balanced",
      recommendedAction: "Hold",
      recommendedActionTone: "warning",
      summary: "A dependable baseline offer with low clause exposure, but the commercial spread remains above the target award zone.",
      flags: ["Low clause drift", "Long-lead equipment secured", "Commercial premium remains"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "No major deviations",
          tone: "success"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "2.8% avg. claims / contract",
          tone: "info"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Equipment lead-times locked",
          tone: "success"
        }
      ]
    }
  ],
  "vertical-transport": [
    {
      id: "elevon-mobility",
      packageId: "vertical-transport",
      supplierId: "supplier-elevon-mobility",
      name: "Elevon Mobility",
      commercialOffer: "$18.5M",
      commercialSpread: "-1.6% vs estimate",
      complianceScore: 94,
      bqDeviation: "0.7%",
      riskScore: 29,
      riskLevel: "Low",
      riskTone: "success",
      pricingPattern: "Balanced",
      recommendedAction: "Recommend Award",
      recommendedActionTone: "success",
      summary: "Best overall balance across price, compliance, and maintenance coverage with clean historic delivery performance.",
      flags: ["Maintenance schedule included", "Parts availability confirmed", "No anomaly in lift breakdown rates"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "0 material deviations",
          tone: "success"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "0.9% avg. claims / contract",
          tone: "success"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Installation logic approved",
          tone: "success"
        }
      ]
    },
    {
      id: "summit-lifts",
      packageId: "vertical-transport",
      supplierId: "supplier-summit-lifts",
      name: "Summit Lifts",
      commercialOffer: "$17.9M",
      commercialSpread: "-4.8% vs estimate",
      complianceScore: 85,
      bqDeviation: "2.6%",
      riskScore: 55,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Neutral",
      recommendedAction: "Clarify",
      recommendedActionTone: "warning",
      summary: "Competitive commercial position, but maintenance exclusions and testing windows need closure before recommendation.",
      flags: ["Maintenance exclusions open", "Witness test dates pending", "Two alternates proposed"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "2 open exclusions",
          tone: "warning"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "3.7% avg. claims / contract",
          tone: "warning"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Testing sequence needs firm dates",
          tone: "info"
        }
      ]
    },
    {
      id: "prime-vertical-group",
      packageId: "vertical-transport",
      supplierId: "supplier-prime-vertical-group",
      name: "Prime Vertical Group",
      commercialOffer: "$19.4M",
      commercialSpread: "+3.2% vs estimate",
      complianceScore: 92,
      bqDeviation: "1.5%",
      riskScore: 41,
      riskLevel: "Medium",
      riskTone: "warning",
      pricingPattern: "Back-loaded",
      recommendedAction: "Negotiate",
      recommendedActionTone: "warning",
      summary: "Technically strong and low-risk, but commercial loading sits above the recommended award band.",
      flags: ["High maintenance premium", "Strong reliability history", "Minor handover wording drift"],
      riskSignals: [
        {
          id: "clause-anomaly",
          label: "Clause anomaly",
          value: "1 handover wording deviation",
          tone: "info"
        },
        {
          id: "historic-claims",
          label: "Historic claims exposure",
          value: "1.8% avg. claims / contract",
          tone: "info"
        },
        {
          id: "programme-realism",
          label: "Programme realism",
          value: "Programme aligned with tower sequence",
          tone: "success"
        }
      ]
    }
  ]
};

export const procurementSupplierProfilesById: Record<string, ProcurementSupplierProfile> = {
  "supplier-aurex-build-systems": {
    id: "supplier-aurex-build-systems",
    name: "Aurex Build Systems",
    qualificationStatus: "Pre-Qualified",
    qualificationTone: "success",
    historicProjects: "12 Jarvis-tracked tenders",
    claimRatio: "0.6%",
    responseTime: "2.1 days",
    integrityScore: 92,
    lastAward: "Oct 2025 | West Tower Envelope",
    highlight: "High delivery consistency across facade works with clean clause history and strong response speed.",
    redFlags: ["Pending final mock-up sequencing confirmation", "Commercial interview still to close leadership attendance"]
  },
  "supplier-novacore-contracting": {
    id: "supplier-novacore-contracting",
    name: "NovaCore Contracting",
    qualificationStatus: "Conditional",
    qualificationTone: "danger",
    historicProjects: "7 Jarvis-tracked tenders",
    claimRatio: "7.2%",
    responseTime: "5.8 days",
    integrityScore: 58,
    lastAward: "Jan 2024 | Harbour Retail Podium",
    highlight: "Aggressive early-trade pricing correlates with past VO escalation and repeated clause negotiation attempts.",
    redFlags: [
      "3 prior claims tied to specification exclusions",
      "High front-loading ratio on preliminaries",
      "No signed glazing motorization subcontractor commitment"
    ]
  },
  "supplier-cascade-envelope-jv": {
    id: "supplier-cascade-envelope-jv",
    name: "Cascade Envelope JV",
    qualificationStatus: "Qualified with Conditions",
    qualificationTone: "warning",
    historicProjects: "9 Jarvis-tracked tenders",
    claimRatio: "2.1%",
    responseTime: "3.0 days",
    integrityScore: 76,
    lastAward: "Jul 2025 | East Residential Block",
    highlight: "Capable partner with stable delivery record, but design substitutions must be frozen before ranking improves.",
    redFlags: ["Two facade substitutions pending consultant sign-off", "Need final warranty wording alignment"]
  },
  "supplier-buildaxis-facades": {
    id: "supplier-buildaxis-facades",
    name: "BuildAxis Facades",
    qualificationStatus: "Qualified",
    qualificationTone: "warning",
    historicProjects: "8 Jarvis-tracked tenders",
    claimRatio: "3.4%",
    responseTime: "3.7 days",
    integrityScore: 72,
    lastAward: "Mar 2025 | City Mall Refit",
    highlight: "Low clause drift and good sample-board discipline, but late-stage rate loading needs another commercial round.",
    redFlags: ["Acceleration cost concentrated in late activities", "Final negotiation still open on maintenance unit rates"]
  },
  "supplier-vector-mep-solutions": {
    id: "supplier-vector-mep-solutions",
    name: "Vector MEP Solutions",
    qualificationStatus: "Pre-Qualified",
    qualificationTone: "success",
    historicProjects: "15 Jarvis-tracked tenders",
    claimRatio: "1.1%",
    responseTime: "1.9 days",
    integrityScore: 90,
    lastAward: "Nov 2025 | Garden Residences MEP",
    highlight: "Consistent BIM-to-BQ discipline with strong commissioning performance across similar mixed-use schemes.",
    redFlags: ["Commercial interview remains pending with operations lead"]
  },
  "supplier-helios-engineering": {
    id: "supplier-helios-engineering",
    name: "Helios Engineering",
    qualificationStatus: "Qualified with Conditions",
    qualificationTone: "warning",
    historicProjects: "10 Jarvis-tracked tenders",
    claimRatio: "4.1%",
    responseTime: "3.9 days",
    integrityScore: 69,
    lastAward: "Apr 2025 | Tech Campus Expansion",
    highlight: "Technically competent supplier with manageable claims history, pending closure of controls and testing exclusions.",
    redFlags: ["Controls exclusions unresolved", "Factory witness dates not confirmed"]
  },
  "supplier-orchid-systems": {
    id: "supplier-orchid-systems",
    name: "Orchid Systems",
    qualificationStatus: "Conditional",
    qualificationTone: "danger",
    historicProjects: "6 Jarvis-tracked tenders",
    claimRatio: "8.0%",
    responseTime: "6.2 days",
    integrityScore: 55,
    lastAward: "Aug 2024 | Riverside Towers",
    highlight: "Historic EOT and interface claims materially increase award risk despite the aggressive entry price.",
    redFlags: ["Incomplete interface matrix", "Control items priced above peer median", "Historic EOT claim pattern"]
  },
  "supplier-allied-building-services": {
    id: "supplier-allied-building-services",
    name: "Allied Building Services",
    qualificationStatus: "Qualified",
    qualificationTone: "warning",
    historicProjects: "11 Jarvis-tracked tenders",
    claimRatio: "2.8%",
    responseTime: "3.2 days",
    integrityScore: 74,
    lastAward: "Sep 2025 | Harbour Offices Fit-Out",
    highlight: "Reliable delivery baseline with low clause drift, but the current commercial premium is outside the target award band.",
    redFlags: ["Commercial premium remains above peer median"]
  },
  "supplier-elevon-mobility": {
    id: "supplier-elevon-mobility",
    name: "Elevon Mobility",
    qualificationStatus: "Pre-Qualified",
    qualificationTone: "success",
    historicProjects: "13 Jarvis-tracked tenders",
    claimRatio: "0.9%",
    responseTime: "2.0 days",
    integrityScore: 91,
    lastAward: "Dec 2025 | Skybridge Apartments",
    highlight: "Strong reliability and low claims profile make this the cleanest award case in the current recommendation package.",
    redFlags: ["Final maintenance spare parts list still under legal review"]
  },
  "supplier-summit-lifts": {
    id: "supplier-summit-lifts",
    name: "Summit Lifts",
    qualificationStatus: "Qualified with Conditions",
    qualificationTone: "warning",
    historicProjects: "8 Jarvis-tracked tenders",
    claimRatio: "3.7%",
    responseTime: "4.1 days",
    integrityScore: 71,
    lastAward: "May 2025 | Greenline Tower",
    highlight: "Competitive pricing stays viable if maintenance exclusions and test windows are contractually closed.",
    redFlags: ["Maintenance exclusions open", "Witness test dates pending"]
  },
  "supplier-prime-vertical-group": {
    id: "supplier-prime-vertical-group",
    name: "Prime Vertical Group",
    qualificationStatus: "Qualified",
    qualificationTone: "warning",
    historicProjects: "9 Jarvis-tracked tenders",
    claimRatio: "1.8%",
    responseTime: "3.4 days",
    integrityScore: 79,
    lastAward: "Jun 2025 | Harbourfront Hotel",
    highlight: "Low-risk technical offer with strong reliability data, but the current maintenance premium needs negotiation.",
    redFlags: ["Maintenance premium sits above target band", "Minor handover wording deviation"]
  }
};

export const procurementIssueLog: ProcurementIssueLog[] = [
  {
    id: "facade-unbalanced-bid-alert",
    packageId: "facade-envelope",
    bidderId: "novacore-contracting",
    category: "BQ Validation",
    title: "Unbalanced bid pattern detected",
    message: "Preliminaries and early envelope items are priced 14% below benchmark while variation-sensitive line items exceed peer median by 11%.",
    owner: "Procurement Agent",
    status: "Escalate",
    tone: "danger",
    timeLabel: "9 min ago"
  },
  {
    id: "facade-substitution-review",
    packageId: "facade-envelope",
    bidderId: "cascade-envelope-jv",
    category: "Compliance Audit",
    title: "Facade substitutions need consultant sign-off",
    message: "Two proposed material substitutions remain outside the approved technical schedule and require design endorsement before ranking.",
    owner: "Design Lead",
    status: "Pending",
    tone: "warning",
    timeLabel: "22 min ago"
  },
  {
    id: "facade-bid-bond-verified",
    packageId: "facade-envelope",
    bidderId: "aurex-build-systems",
    category: "Tender Audit",
    title: "Bid bond and insurance pack verified",
    message: "Aurex Build Systems submitted a complete security package with no variance against the tender requirements.",
    owner: "Commercial Control",
    status: "Closed",
    tone: "success",
    timeLabel: "41 min ago"
  },
  {
    id: "mep-interface-gap",
    packageId: "mep-integrated",
    bidderId: "orchid-systems",
    category: "Contract Risk",
    title: "Interface matrix missing plant-room responsibility split",
    message: "Mechanical and controls responsibility overlap introduces a likely claims seam during commissioning unless clarified pre-award.",
    owner: "Jarvis Contract AI",
    status: "Escalate",
    tone: "danger",
    timeLabel: "14 min ago"
  },
  {
    id: "mep-controls-exclusion",
    packageId: "mep-integrated",
    bidderId: "helios-engineering",
    category: "Compliance Audit",
    title: "Controls package exclusions remain open",
    message: "Helios still excludes two control-panel witness test activities from the confirmed commercial scope.",
    owner: "MEP Lead",
    status: "Pending",
    tone: "warning",
    timeLabel: "33 min ago"
  },
  {
    id: "lift-award-path",
    packageId: "vertical-transport",
    bidderId: "elevon-mobility",
    category: "Tender Evaluation",
    title: "Award recommendation path ready",
    message: "Elevon Mobility leads on combined compliance, risk, and maintenance coverage after final commercial normalization.",
    owner: "PMO Review",
    status: "Ready",
    tone: "success",
    timeLabel: "18 min ago"
  },
  {
    id: "lift-maintenance-exclusion",
    packageId: "vertical-transport",
    bidderId: "summit-lifts",
    category: "Contract Risk",
    title: "Maintenance exclusions reduce lifecycle comparability",
    message: "Optional maintenance allowances prevent direct apples-to-apples comparison until clarified within the tender addendum.",
    owner: "Operations Lead",
    status: "Pending",
    tone: "warning",
    timeLabel: "29 min ago"
  }
];
