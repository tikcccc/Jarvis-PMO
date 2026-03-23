import type { ProgressSummaryMetric, ProgressZone } from "@/lib/types";

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
    activeSnapshotId: "zone-a-0318-0800",
    snapshots: [
      {
        id: "zone-a-0308-0800",
        stageLabel: "Closeout Readiness",
        captureLabel: "08 Mar",
        timestampLabel: "2026-03-08 08:00 HKT",
        gpsLabel: "22.30382, 114.18116",
        weatherLabel: "25°C | Overcast",
        noteLabel: "Podium finishes substantially complete. Archive capture initiated.",
        tone: "info"
      },
      {
        id: "zone-a-0311-0800",
        stageLabel: "Closeout Readiness",
        captureLabel: "11 Mar",
        timestampLabel: "2026-03-11 08:00 HKT",
        gpsLabel: "22.30382, 114.18116",
        weatherLabel: "24°C | Light rain",
        noteLabel: "Minor snag closure verified against turnover checklist.",
        tone: "info"
      },
      {
        id: "zone-a-0314-0800",
        stageLabel: "Archive Capture",
        captureLabel: "14 Mar",
        timestampLabel: "2026-03-14 08:00 HKT",
        gpsLabel: "22.30382, 114.18116",
        weatherLabel: "26°C | Clear",
        noteLabel: "Daily fixed-time capture preserved complete evidence pack for turnover.",
        tone: "success"
      },
      {
        id: "zone-a-0318-0800",
        stageLabel: "Archive Capture",
        captureLabel: "18 Mar",
        timestampLabel: "2026-03-18 08:00 HKT",
        gpsLabel: "22.30382, 114.18116",
        weatherLabel: "27°C | Clear",
        noteLabel: "Final closeout panorama stored with timestamp, GPS, and weather metadata.",
        tone: "success"
      }
    ],
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
    activeSnapshotId: "zone-b-0329-0800",
    snapshots: [
      {
        id: "zone-b-0317-0800",
        stageLabel: "Ceiling Closure Prep",
        captureLabel: "17 Mar",
        timestampLabel: "2026-03-17 08:00 HKT",
        gpsLabel: "22.30371, 114.18224",
        weatherLabel: "24°C | Humid",
        noteLabel: "Daily fixed-time capture confirms corridor framing ready for closure.",
        tone: "info"
      },
      {
        id: "zone-b-0321-0800",
        stageLabel: "Ceiling Closure Prep",
        captureLabel: "21 Mar",
        timestampLabel: "2026-03-21 08:00 HKT",
        gpsLabel: "22.30371, 114.18224",
        weatherLabel: "25°C | Cloudy",
        noteLabel: "HVAC finish package remains slightly behind but float is still protected.",
        tone: "warning"
      },
      {
        id: "zone-b-0325-0800",
        stageLabel: "Closure Verification",
        captureLabel: "25 Mar",
        timestampLabel: "2026-03-25 08:00 HKT",
        gpsLabel: "22.30371, 114.18224",
        weatherLabel: "26°C | Clear",
        noteLabel: "Secondary capture verifies ceiling close-up sequencing remains viable.",
        tone: "info"
      },
      {
        id: "zone-b-0329-0800",
        stageLabel: "Closure Verification",
        captureLabel: "29 Mar",
        timestampLabel: "2026-03-29 08:00 HKT",
        gpsLabel: "22.30371, 114.18224",
        weatherLabel: "27°C | Clear",
        noteLabel: "Latest panorama confirms on-time handoff into floor-finish workfront.",
        tone: "success"
      }
    ],
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
    activeSnapshotId: "zone-c-0323-0800",
    snapshots: [
      {
        id: "zone-c-0311-0800",
        stageLabel: "Masonry Baseline",
        captureLabel: "11 Mar",
        timestampLabel: "2026-03-11 08:00 HKT",
        gpsLabel: "22.30296, 114.18168",
        weatherLabel: "24°C | Cloudy",
        noteLabel: "Fixed-time panorama shows drywall boarding below planned density.",
        tone: "warning"
      },
      {
        id: "zone-c-0315-0800",
        stageLabel: "Masonry Baseline",
        captureLabel: "15 Mar",
        timestampLabel: "2026-03-15 08:00 HKT",
        gpsLabel: "22.30296, 114.18168",
        weatherLabel: "25°C | Clear",
        noteLabel: "Progress Agent detects recurring lag on corridor edge and service wall package.",
        tone: "warning"
      },
      {
        id: "zone-c-0319-0800",
        stageLabel: "Drywall Close-up",
        captureLabel: "19 Mar",
        timestampLabel: "2026-03-19 08:00 HKT",
        gpsLabel: "22.30296, 114.18168",
        weatherLabel: "26°C | Hazy",
        noteLabel: "Deviation threshold approaches as planned area remains incomplete.",
        tone: "warning"
      },
      {
        id: "zone-c-0323-0800",
        stageLabel: "Drywall Close-up",
        captureLabel: "23 Mar",
        timestampLabel: "2026-03-23 08:00 HKT",
        gpsLabel: "22.30296, 114.18168",
        weatherLabel: "27°C | Clear",
        noteLabel: "Threshold triggered. Zone C is now more than 3 days behind the Master P6 schedule.",
        tone: "danger"
      },
      {
        id: "zone-c-0330-0800",
        stageLabel: "Recovery Re-scan",
        captureLabel: "30 Mar",
        timestampLabel: "2026-03-30 08:00 HKT",
        gpsLabel: "22.30296, 114.18168",
        weatherLabel: "26°C | Forecast",
        noteLabel: "Next scheduled capture reserved for recovery verification after manpower rebalance.",
        tone: "info"
      }
    ],
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
