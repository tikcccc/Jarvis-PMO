import type {
  DesignDfmaSignal,
  DesignIssue,
  DesignIssueDistributionBucket,
  DesignLineageStage,
  DesignPackage,
  DesignSuggestion,
  DesignSummaryMetric,
  DesignTradeCostItem,
  DesignTradeCostTrendPoint
} from "@/lib/types";

export const designSummaryMetrics: DesignSummaryMetric[] = [
  {
    id: "packages-synced",
    label: "Model Packages Synced",
    value: "8/9",
    statusLabel: "Healthy",
    tone: "info",
    icon: "box"
  },
  {
    id: "open-issues",
    label: "Open Issues (Clash/Spec)",
    value: "24",
    statusLabel: "-12 this week",
    tone: "danger",
    icon: "alertTriangle"
  },
  {
    id: "constructability-index",
    label: "MiC Ind. Index",
    value: "85/100",
    statusLabel: "Target Met",
    tone: "success",
    icon: "cpu"
  },
  {
    id: "forecast-cost-delta",
    label: "Forecast Cost Delta",
    value: "+1.2%",
    statusLabel: "Under Control",
    tone: "warning",
    icon: "dollarSign"
  }
];

export const designLineageStages: DesignLineageStage[] = [
  {
    id: "master-plan",
    stage: "Master Plan",
    dateLabel: "2025-Q4",
    statusLabel: "Base",
    tone: "default",
    icon: "mapPin"
  },
  {
    id: "gbp",
    stage: "GBP",
    dateLabel: "2026-01",
    statusLabel: "Approved",
    tone: "success",
    icon: "fileText"
  },
  {
    id: "tender",
    stage: "Tender",
    dateLabel: "2026-03",
    statusLabel: "Active",
    tone: "info",
    icon: "shoppingCart"
  },
  {
    id: "construction",
    stage: "Construction",
    dateLabel: "Pending",
    statusLabel: "Locked",
    tone: "default",
    icon: "hammer"
  }
];

export const designPackages: DesignPackage[] = [
  {
    id: "pkg-podium",
    name: "Podium & Retail Zone",
    syncLabel: "98%",
    statusLabel: "Watch",
    tone: "warning"
  },
  {
    id: "pkg-towerA",
    name: "Tower A (L1-L20)",
    syncLabel: "85%",
    statusLabel: "Critical",
    tone: "danger"
  },
  {
    id: "pkg-towerB",
    name: "Tower B (L1-L20)",
    syncLabel: "100%",
    statusLabel: "Stable",
    tone: "success"
  },
  {
    id: "pkg-basement",
    name: "Basement Carpark",
    syncLabel: "100%",
    statusLabel: "Stable",
    tone: "success"
  }
];

export const designIssuesByPackageId: Record<string, DesignIssue[]> = {
  "pkg-towerA": [
    {
      id: "ISS-4092",
      packageId: "pkg-towerA",
      typeLabel: "Clash",
      typeTone: "danger",
      severityLabel: "High",
      severityTone: "danger",
      trade: "MEP vs Structural",
      area: "Tower A - L12 Shaft",
      description: "HVAC Main Duct intersects with Shear Wall SW-04.",
      specReference: "N/A",
      statusLabel: "Open",
      statusTone: "danger"
    },
    {
      id: "ISS-4093",
      packageId: "pkg-towerA",
      typeLabel: "Spec Mismatch",
      typeTone: "warning",
      severityLabel: "Medium",
      severityTone: "warning",
      trade: "Architecture",
      area: "Tower A - L15 Lobby",
      description: "Floor finish specified as Marble in Doc, but BIM model shows Ceramic Tile.",
      specReference: "SPEC-FIN-02",
      statusLabel: "Review",
      statusTone: "warning"
    },
    {
      id: "ISS-4095",
      packageId: "pkg-towerA",
      typeLabel: "Missing Info",
      typeTone: "default",
      severityLabel: "High",
      severityTone: "danger",
      trade: "Facade",
      area: "Tower A - South Elev",
      description: "Curtain wall bracket details missing, preventing accurate steel quantity extraction.",
      specReference: "LOD 400 Req",
      statusLabel: "Open",
      statusTone: "danger"
    },
    {
      id: "ISS-4098",
      packageId: "pkg-towerA",
      typeLabel: "Clash",
      typeTone: "danger",
      severityLabel: "Low",
      severityTone: "success",
      trade: "Plumbing vs Elec",
      area: "Tower A - L08 Ceiling",
      description: "Cable tray clearance < 100mm from sprinkler pipe.",
      specReference: "MEP-COORD-01",
      statusLabel: "Resolved",
      statusTone: "success"
    }
  ],
  "pkg-podium": [
    {
      id: "ISS-3101",
      packageId: "pkg-podium",
      typeLabel: "Error",
      typeTone: "warning",
      severityLabel: "High",
      severityTone: "danger",
      trade: "Structural",
      area: "Podium - Transfer Plate",
      description: "Rebar density exceeds constructability limits (MiC constraint).",
      specReference: "STR-MIC-05",
      statusLabel: "Open",
      statusTone: "danger"
    }
  ],
  "pkg-towerB": [],
  "pkg-basement": []
};

export const designSuggestions: DesignSuggestion[] = [
  {
    id: "VE-01",
    packageId: "global",
    typeLabel: "Value Engineering",
    description: "Replace specified generic fire doors on L1-L5 with pre-certified sizes to reduce unit cost.",
    savingsLabel: "$120,000",
    statusLabel: "Pending PMO",
    tone: "warning"
  },
  {
    id: "VE-02",
    packageId: "global",
    typeLabel: "Constructability",
    description: "Optimize MEP routing in Basement to allow standard 3m modular pipe racks.",
    savingsLabel: "$330,000",
    statusLabel: "In Review",
    tone: "info"
  }
];

export const designIssueDistribution: DesignIssueDistributionBucket[] = [
  {
    id: "clashes",
    label: "Clashes",
    count: 12,
    colorHex: "#f43f5e"
  },
  {
    id: "spec-mismatch",
    label: "Spec Mismatch",
    count: 8,
    colorHex: "#fbbf24"
  },
  {
    id: "missing-info",
    label: "Missing Info",
    count: 4,
    colorHex: "#a855f7"
  }
];

export const designTradeCostItems: DesignTradeCostItem[] = [
  {
    id: "structural-steel",
    trade: "Structural Steel",
    budgetValue: 45,
    extractedValue: 46.2,
    unit: "M",
    status: "over"
  },
  {
    id: "mep-systems",
    trade: "MEP Systems",
    budgetValue: 32.5,
    extractedValue: 31.8,
    unit: "M",
    status: "under"
  },
  {
    id: "facade-glazing",
    trade: "Facade & Glazing",
    budgetValue: 28,
    extractedValue: 28,
    unit: "M",
    status: "on-track"
  }
];

export const designTradeCostTrend: DesignTradeCostTrendPoint[] = [
  { id: "oct", monthLabel: "Oct", actualValue: 102, budgetValue: 100 },
  { id: "nov", monthLabel: "Nov", actualValue: 105, budgetValue: 100 },
  { id: "dec", monthLabel: "Dec", actualValue: 103, budgetValue: 100 },
  { id: "jan", monthLabel: "Jan", actualValue: 106, budgetValue: 100 },
  { id: "feb", monthLabel: "Feb", actualValue: 101, budgetValue: 100 },
  { id: "mar", monthLabel: "Mar", actualValue: 101.2, budgetValue: 100 }
];

export const designDfmaSignals: DesignDfmaSignal[] = [
  {
    id: "mic-standardization",
    label: "MiC Standardization",
    valueLabel: "92%",
    progressPercent: 92,
    tone: "success"
  },
  {
    id: "non-standard-elements",
    label: "Non-Standard Elements",
    valueLabel: "8.4%",
    progressPercent: 8.4,
    tone: "warning"
  }
];

export const designDfmaNarrative =
  "Highly adapted for off-site prefabrication. Est. wet-trade reduction: 65%.";
