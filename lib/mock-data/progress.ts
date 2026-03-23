import type { ProgressCaptureGate, ProgressSummaryMetric, ProgressZone } from "@/lib/types";

export const progressSummaryMetrics: ProgressSummaryMetric[] = [
  {
    id: "global-site-progress",
    label: "Global Site Progress",
    value: "42.5%",
    detail: "vs 45.0% plan",
    tone: "info",
    icon: "activity"
  },
  {
    id: "eagle-eye-network",
    label: "Eagle Eye Network",
    value: "142 / 145",
    detail: "Active camera nodes",
    tone: "success",
    icon: "eye"
  },
  {
    id: "zones-lagging",
    label: "Zones Lagging",
    value: "1",
    detail: "Action required now",
    tone: "danger",
    icon: "alertTriangle"
  },
  {
    id: "master-p6-sync",
    label: "Master P6 Sync",
    value: "T - 15 Mins",
    detail: "Last schedule reconciliation",
    tone: "default",
    icon: "clock"
  }
];

export const progressCaptureGates: ProgressCaptureGate[] = [
  {
    id: "structure",
    shortLabel: "STR",
    stage: "Structure Release"
  },
  {
    id: "mep",
    shortLabel: "MEP",
    stage: "MEP Rough-in"
  },
  {
    id: "masonry",
    shortLabel: "MAS",
    stage: "Masonry Baseline"
  },
  {
    id: "drywall",
    shortLabel: "DRY",
    stage: "Drywall Close-up"
  },
  {
    id: "ceiling",
    shortLabel: "CEIL",
    stage: "Ceiling Closure"
  },
  {
    id: "handover",
    shortLabel: "DLV",
    stage: "Handover Gate"
  }
];

export const progressSiteViewport = {
  latitude: 22.30345,
  longitude: 114.18163,
  zoom: 17.15
};

export const progressZones: ProgressZone[] = [
  {
    id: "zone-a",
    mapLabel: "Zone A",
    name: "Zone A (Podium)",
    area: "Retail podium and arrival hall",
    statusLabel: "Completed",
    tone: "success",
    progressPercent: 100,
    cameraCoverageLabel: "48 / 48 active",
    nextCaptureLabel: "Closeout archive scheduled",
    varianceLabel: "0 day variance",
    latitude: 22.30382,
    longitude: 114.18116,
    cameraId: "EE-ZONEA-01",
    cameraLocationLabel: "Zone A (Podium - Level 1)",
    activeGateId: "handover",
    captureDates: {
      structure: "2026-01-06",
      mep: "2026-01-24",
      masonry: "2026-02-08",
      drywall: "2026-02-20",
      ceiling: "2026-03-05",
      handover: "2026-03-18"
    },
    tradeQuantities: [
      {
        id: "zone-a-mep",
        trade: "MEP Rough-in",
        statusLabel: "Ahead",
        tone: "success",
        actualPercent: 100,
        plannedPercent: 96
      },
      {
        id: "zone-a-masonry",
        trade: "Masonry & Drywall",
        statusLabel: "Completed",
        tone: "info",
        actualPercent: 100,
        plannedPercent: 100
      },
      {
        id: "zone-a-hvac",
        trade: "HVAC Installation",
        statusLabel: "Completed",
        tone: "info",
        actualPercent: 100,
        plannedPercent: 100
      }
    ],
    impactAnalysis: {
      headline: "No active critical-path pressure detected in Zone A.",
      summary:
        "All tracked trades have cleared their planned gates. Eagle Eye is now collecting archival evidence for turnover, payment support, and dispute-proof closeout records.",
      rows: [
        {
          id: "zone-a-ceiling",
          label: "Ceiling Closure",
          valueLabel: "Closed",
          tone: "success"
        },
        {
          id: "zone-a-final-snag",
          label: "Final Snag Cycle",
          valueLabel: "Monitoring",
          tone: "info"
        },
        {
          id: "zone-a-handover",
          label: "Handover Pack",
          valueLabel: "Ready",
          tone: "success"
        }
      ],
      ctaLabel: "Export Archive Pack"
    }
  },
  {
    id: "zone-b",
    mapLabel: "Zone B",
    name: "Zone B (Tower 1)",
    area: "Residential core and corridor spine",
    statusLabel: "On Track",
    tone: "success",
    progressPercent: 85,
    cameraCoverageLabel: "46 / 49 active",
    nextCaptureLabel: "Ceiling closure gate on 2026-03-29",
    varianceLabel: "+1 day float preserved",
    latitude: 22.30371,
    longitude: 114.18224,
    cameraId: "EE-ZONEB-03",
    cameraLocationLabel: "Zone B (Tower 1 - Level 9)",
    activeGateId: "ceiling",
    captureDates: {
      structure: "2026-01-09",
      mep: "2026-01-30",
      masonry: "2026-02-16",
      drywall: "2026-03-01",
      ceiling: "2026-03-29",
      handover: "2026-04-18"
    },
    tradeQuantities: [
      {
        id: "zone-b-mep",
        trade: "MEP Rough-in",
        statusLabel: "Ahead",
        tone: "success",
        actualPercent: 82,
        plannedPercent: 80
      },
      {
        id: "zone-b-masonry",
        trade: "Masonry & Drywall",
        statusLabel: "On Track",
        tone: "info",
        actualPercent: 87,
        plannedPercent: 85
      },
      {
        id: "zone-b-hvac",
        trade: "HVAC Installation",
        statusLabel: "Watch",
        tone: "warning",
        actualPercent: 78,
        plannedPercent: 80
      }
    ],
    impactAnalysis: {
      headline: "No critical-path impact is currently forecast for Zone B.",
      summary:
        "Ceiling closure remains protected, but the HVAC finish-out package should stay under watch through the next scheduled capture gate to avoid losing the current float.",
      rows: [
        {
          id: "zone-b-ceiling",
          label: "Ceiling Closure",
          valueLabel: "On Time",
          tone: "success"
        },
        {
          id: "zone-b-floor",
          label: "Floor Finishes",
          valueLabel: "+ 1 Day Buffer",
          tone: "warning"
        },
        {
          id: "zone-b-handover",
          label: "Final Handover",
          valueLabel: "Protected",
          tone: "success"
        }
      ],
      ctaLabel: "Generate Watchlist Report"
    }
  },
  {
    id: "zone-c",
    mapLabel: "Zone C",
    name: "Zone C (Block A)",
    area: "Fit-out corridor and service edge",
    statusLabel: "Lagging",
    tone: "danger",
    progressPercent: 42.5,
    cameraCoverageLabel: "48 / 52 active",
    nextCaptureLabel: "Recovery re-scan due 2026-03-30",
    varianceLabel: "> 3 days behind P6",
    latitude: 22.30296,
    longitude: 114.18168,
    cameraId: "EE-ZONEC-05",
    cameraLocationLabel: "Zone C (Block A - Floor 5)",
    activeGateId: "drywall",
    flaggedGateId: "drywall",
    captureDates: {
      structure: "2026-01-11",
      mep: "2026-02-03",
      masonry: "2026-02-19",
      drywall: "2026-03-23",
      ceiling: "2026-04-09",
      handover: "2026-04-26"
    },
    tradeQuantities: [
      {
        id: "zone-c-mep",
        trade: "MEP Rough-in",
        statusLabel: "Ahead",
        tone: "success",
        actualPercent: 85,
        plannedPercent: 80
      },
      {
        id: "zone-c-masonry",
        trade: "Masonry & Drywall",
        statusLabel: "Lagging",
        tone: "danger",
        actualPercent: 65,
        plannedPercent: 80
      },
      {
        id: "zone-c-hvac",
        trade: "HVAC Installation",
        statusLabel: "On Track",
        tone: "info",
        actualPercent: 100,
        plannedPercent: 100
      }
    ],
    impactAnalysis: {
      headline: "Masonry and drywall in Zone C are more than 3 days behind the Master P6 schedule.",
      summary:
        "Threshold has been triggered. The current variance erodes the ceiling closure handoff and compresses the floor finish sequence unless the recovery crew is inserted before the next project-gate capture.",
      rows: [
        {
          id: "zone-c-ceiling",
          label: "Ceiling Closure",
          valueLabel: "+ 4 Days",
          tone: "danger"
        },
        {
          id: "zone-c-floor",
          label: "Floor Finishes",
          valueLabel: "+ 2 Days",
          tone: "warning"
        },
        {
          id: "zone-c-handover",
          label: "Final Handover",
          valueLabel: "Secured (Float)",
          tone: "success"
        }
      ],
      ctaLabel: "Generate Recovery Report"
    }
  }
];
