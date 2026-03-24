import type { HandoverAuditFeedItem, HandoverCommandSummary, HandoverZone } from "@/lib/types";

export const handoverCommandSummary: HandoverCommandSummary = {
  portfolioStatusPercent: 86.4,
  verifiedAssetsLabel: "12 / 14",
  verifiedAssetsDetail: "Digital twin packs cleared for release",
  waveLabel: "Phase 1 closeout wave",
  overviewMetrics: [
    {
      id: "rectification-rate",
      label: "Rectification Rate",
      valueLabel: "91.2%",
      tone: "success",
      icon: "shieldCheck",
      badgeLabel: "AI Verified",
      progressPercent: 91
    },
    {
      id: "lod-consistency",
      label: "LOD 500 Consistency",
      valueLabel: "99.9%",
      tone: "info",
      icon: "box",
      detailLabel: "Compliant below 5 mm variance"
    },
    {
      id: "active-snags",
      label: "Active Snags",
      valueLabel: "14",
      tone: "warning",
      icon: "alertTriangle",
      detailLabel: "6 contractor evidence packs pending",
      progressPercent: 40
    },
    {
      id: "forecasted-handover",
      label: "Forecasted Handover",
      valueLabel: "May 15, 2026",
      tone: "info",
      icon: "clock",
      detailLabel: "52 days remaining",
      emphasis: "emphasis"
    }
  ]
};

export const handoverSiteViewport = {
  latitude: 22.30356,
  longitude: 114.18176,
  zoom: 16.95
};

export const handoverAuditFeed: HandoverAuditFeedItem[] = [
  {
    id: "tower-a-scan",
    tone: "info",
    message: "JARVIS_SCAN_09 is reconciling Tower A point-cloud evidence against BIM LOD 500 and the latest defect-closure proof."
  },
  {
    id: "car-park-certificate",
    tone: "success",
    message: "Basement Car Park consistency certificate was minted after the final laser-scan sweep and evidence hash validation."
  },
  {
    id: "podium-rectification",
    tone: "warning",
    message: "Podium atrium sealant and tile-alignment pack is still waiting for AI comparison before the handover dossier can close."
  }
];

export const handoverZones: HandoverZone[] = [
  {
    id: "tower-a",
    mapLabel: "Tower A",
    name: "Tower A",
    label: "Tower A - L42 Unit 05",
    areaLabel: "Residential tower closeout and sample-unit certification",
    statusLabel: "Rectifying",
    tone: "info",
    progressPercent: 92,
    lastScanLabel: "2026-03-23 09:40 HKT",
    latitude: 22.30373,
    longitude: 114.18128,
    kpis: [
      {
        id: "tower-a-consistency",
        label: "Zone Consistency",
        valueLabel: "99.9%",
        tone: "success",
        icon: "box"
      },
      {
        id: "tower-a-closure",
        label: "AI Auto-Closure",
        valueLabel: "92%",
        tone: "info",
        icon: "shieldCheck"
      },
      {
        id: "tower-a-avg-rectification",
        label: "Avg Rectification",
        valueLabel: "3.1 Hrs",
        tone: "warning",
        icon: "clock"
      },
      {
        id: "tower-a-active-snags",
        label: "Active Snags",
        valueLabel: "2",
        tone: "danger",
        icon: "alertTriangle"
      }
    ],
    defects: [
      {
        id: "DEF_1042",
        typeLabel: "Wall crack (> 0.2 mm)",
        locationLabel: "L12 lobby return wall",
        statusLabel: "AI Verifying",
        statusTone: "warning",
        severityLabel: "High",
        severityTone: "danger",
        detectedDateLabel: "2026-03-20",
        noteLabel: "Pre-fix and post-fix captures are aligned, but the hairline spread still exceeds the tolerance band by 0.4 mm.",
        baselineLabel: "Reality 360 baseline",
        comparisonLabel: "BIM heatmap compare",
        matchScoreLabel: "98.5% match",
        actionLabel: "Confirm Closure"
      },
      {
        id: "DEF_1045",
        typeLabel: "Window seal leak",
        locationLabel: "L42 unit 05 living room",
        statusLabel: "Pending Fix",
        statusTone: "warning",
        severityLabel: "Medium",
        severityTone: "warning",
        detectedDateLabel: "2026-03-21",
        noteLabel: "Contractor evidence has not been uploaded with the required matching camera angle for auto-closure.",
        baselineLabel: "Original Eagle Eye capture",
        comparisonLabel: "Latest contractor proof",
        matchScoreLabel: "86.4% match",
        actionLabel: "Request Re-shot"
      }
    ],
    verification: {
      statusLabel: "Sync Complete",
      statusTone: "success",
      consistencyLabel: "99.9%",
      varianceLabel: "Variance detected: +/- 3.2 mm",
      certificateLabel: "Reality-vs-Model Cert",
      noteLabel:
        "Point-cloud evidence is synchronized with the LOD 500 model. Handover release is blocked only by the remaining snag loop.",
      recordActionLabel: "View Blockchain Record",
      checks: [
        {
          id: "tower-a-geometry",
          label: "Geometry delta",
          valueLabel: "+/- 3.2 mm",
          tone: "success"
        },
        {
          id: "tower-a-completeness",
          label: "Asset completeness",
          valueLabel: "100% detected",
          tone: "success"
        },
        {
          id: "tower-a-evidence",
          label: "Closure evidence",
          valueLabel: "92% sealed",
          tone: "warning"
        }
      ]
    },
    manualAssets: [
      {
        id: "tower-a-chiller",
        assetLabel: "Chiller Unit A1",
        assetTypeLabel: "Mechanical",
        locationLabel: "Roof plant room",
        statusLabel: "Certified",
        statusTone: "success"
      },
      {
        id: "tower-a-switchboard",
        assetLabel: "Smart Switchboard",
        assetTypeLabel: "Electrical",
        locationLabel: "L42 riser room",
        statusLabel: "Verified",
        statusTone: "info"
      },
      {
        id: "tower-a-panel",
        assetLabel: "Facade Panel Type B",
        assetTypeLabel: "Architectural",
        locationLabel: "Tower A east elevation",
        statusLabel: "Certified",
        statusTone: "success"
      }
    ]
  },
  {
    id: "podium",
    mapLabel: "Podium",
    name: "Podium",
    label: "Podium - Main Atrium",
    areaLabel: "Retail podium and arrival hall rectification loop",
    statusLabel: "Snagging",
    tone: "warning",
    progressPercent: 78,
    lastScanLabel: "2026-03-22 16:15 HKT",
    latitude: 22.3034,
    longitude: 114.18223,
    kpis: [
      {
        id: "podium-consistency",
        label: "Zone Consistency",
        valueLabel: "99.8%",
        tone: "success",
        icon: "box"
      },
      {
        id: "podium-closure",
        label: "AI Auto-Closure",
        valueLabel: "78%",
        tone: "info",
        icon: "shieldCheck"
      },
      {
        id: "podium-avg-rectification",
        label: "Avg Rectification",
        valueLabel: "5.4 Hrs",
        tone: "warning",
        icon: "clock"
      },
      {
        id: "podium-active-snags",
        label: "Active Snags",
        valueLabel: "12",
        tone: "danger",
        icon: "alertTriangle"
      }
    ],
    defects: [
      {
        id: "DEF_1043",
        typeLabel: "Pipe rusting",
        locationLabel: "Plant room B",
        statusLabel: "Pending Fix",
        statusTone: "warning",
        severityLabel: "Medium",
        severityTone: "warning",
        detectedDateLabel: "2026-03-18",
        noteLabel: "Corrosion treatment evidence is missing the required close-range capture for AI comparison.",
        baselineLabel: "Pipe condition baseline",
        comparisonLabel: "Sealant and coating proof",
        matchScoreLabel: "81.7% match",
        actionLabel: "Escalate to MEP team"
      },
      {
        id: "DEF_0988",
        typeLabel: "Tile misalignment",
        locationLabel: "Main atrium entrance",
        statusLabel: "Auto-Closed",
        statusTone: "success",
        severityLabel: "Low",
        severityTone: "info",
        detectedDateLabel: "2026-03-15",
        noteLabel: "Follow-up panorama confirmed the corrected tile line is now within the finish tolerance.",
        baselineLabel: "Pre-fix finish capture",
        comparisonLabel: "AI closure evidence",
        matchScoreLabel: "99.1% match",
        actionLabel: "Archive Record"
      }
    ],
    verification: {
      statusLabel: "Rectification Loop",
      statusTone: "warning",
      consistencyLabel: "99.8%",
      varianceLabel: "Variance detected: +/- 4.8 mm",
      certificateLabel: "Reality-vs-Model Cert",
      noteLabel:
        "The podium remains structurally aligned to model, but finish-stage defects continue to hold back the digital handover release package.",
      recordActionLabel: "Review Open Variances",
      checks: [
        {
          id: "podium-geometry",
          label: "Geometry delta",
          valueLabel: "+/- 4.8 mm",
          tone: "success"
        },
        {
          id: "podium-completeness",
          label: "Asset completeness",
          valueLabel: "99.6% detected",
          tone: "info"
        },
        {
          id: "podium-evidence",
          label: "Closure evidence",
          valueLabel: "78% sealed",
          tone: "warning"
        }
      ]
    },
    manualAssets: [
      {
        id: "podium-bms",
        assetLabel: "BMS Touch Panel",
        assetTypeLabel: "Controls",
        locationLabel: "Atrium concierge",
        statusLabel: "Awaiting Closure",
        statusTone: "warning"
      },
      {
        id: "podium-door",
        assetLabel: "Automatic Sliding Door",
        assetTypeLabel: "Architectural",
        locationLabel: "Main entrance",
        statusLabel: "Verified",
        statusTone: "info"
      },
      {
        id: "podium-fan",
        assetLabel: "Smoke Extract Fan",
        assetTypeLabel: "Mechanical",
        locationLabel: "Plant room B",
        statusLabel: "Certified",
        statusTone: "success"
      }
    ]
  },
  {
    id: "car-park",
    mapLabel: "Car Park",
    name: "Car Park",
    label: "B1 Basement Parking",
    areaLabel: "Back-of-house and basement digital twin release",
    statusLabel: "Verified",
    tone: "success",
    progressPercent: 100,
    lastScanLabel: "2026-03-21 11:00 HKT",
    latitude: 22.30321,
    longitude: 114.18171,
    kpis: [
      {
        id: "car-park-consistency",
        label: "Zone Consistency",
        valueLabel: "100%",
        tone: "success",
        icon: "box"
      },
      {
        id: "car-park-closure",
        label: "AI Auto-Closure",
        valueLabel: "100%",
        tone: "success",
        icon: "shieldCheck"
      },
      {
        id: "car-park-avg-rectification",
        label: "Avg Rectification",
        valueLabel: "1.2 Hrs",
        tone: "info",
        icon: "clock"
      },
      {
        id: "car-park-active-snags",
        label: "Active Snags",
        valueLabel: "0",
        tone: "success",
        icon: "alertTriangle"
      }
    ],
    defects: [],
    verification: {
      statusLabel: "Certified",
      statusTone: "success",
      consistencyLabel: "100%",
      varianceLabel: "Variance detected: +/- 1.1 mm",
      certificateLabel: "Reality-vs-Model Cert",
      noteLabel:
        "All closure evidence has been sealed and the final geometry scan passed with no outstanding variance flags.",
      recordActionLabel: "Download Signed Record",
      checks: [
        {
          id: "car-park-geometry",
          label: "Geometry delta",
          valueLabel: "+/- 1.1 mm",
          tone: "success"
        },
        {
          id: "car-park-completeness",
          label: "Asset completeness",
          valueLabel: "100% detected",
          tone: "success"
        },
        {
          id: "car-park-evidence",
          label: "Closure evidence",
          valueLabel: "100% sealed",
          tone: "success"
        }
      ]
    },
    manualAssets: [
      {
        id: "car-park-fan",
        assetLabel: "Jet Fan Cluster 3",
        assetTypeLabel: "Mechanical",
        locationLabel: "B1 north drive aisle",
        statusLabel: "Certified",
        statusTone: "success"
      },
      {
        id: "car-park-signage",
        assetLabel: "Wayfinding Sign Set",
        assetTypeLabel: "Architectural",
        locationLabel: "Lift lobby threshold",
        statusLabel: "Verified",
        statusTone: "info"
      },
      {
        id: "car-park-drainage",
        assetLabel: "Drainage Trap Assembly",
        assetTypeLabel: "Civil",
        locationLabel: "Pump room inlet",
        statusLabel: "Certified",
        statusTone: "success"
      }
    ]
  }
];
