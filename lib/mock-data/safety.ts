import type {
  SafetyCameraFeed,
  SafetyDeviceStatus,
  SafetyDistributionItem,
  SafetyDroneFinding,
  SafetyMapPoint,
  SafetyMetricCard,
  SafetyTrendChart,
  SafetyWeatherSummary,
  SafetyWorkerRecord
} from "@/lib/types";

export const safetySiteViewport = {
  latitude: 22.30345,
  longitude: 114.18163,
  zoom: 17.05
};

export const safetyCmpData = {
  lockDistribution: [
    { id: "online", label: "Online", value: 5, accentHex: "#2563EB" },
    { id: "offline", label: "Offline", value: 4, accentHex: "#60A5FA" }
  ] satisfies SafetyDistributionItem[],
  alertMetrics: [
    { id: "ai-camera", label: "AI Camera", valueLabel: "0", tone: "info", icon: "camera" },
    { id: "equipment", label: "Equip Alert", valueLabel: "0", tone: "default", icon: "shield" },
    { id: "vehicle", label: "Vehicle Alert", valueLabel: "9", tone: "warning", icon: "vehicle" },
    { id: "gas", label: "Gas Alert", valueLabel: "0", tone: "danger", icon: "wind" },
    { id: "e-lock", label: "E-Lock Alert", valueLabel: "0", tone: "danger", icon: "alert" },
    { id: "watch", label: "Watch Alert", valueLabel: "1", tone: "info", icon: "user" }
  ] satisfies SafetyMetricCard[],
  videoStatuses: [
    { id: "cctv-02", label: "CV202318 - AICCTV 02", statusLabel: "Online", tone: "success", detailLabel: "North gate live feed" },
    { id: "cctv-01", label: "CV202318 - AICCTV 01", statusLabel: "Online", tone: "success", detailLabel: "Tower access corridor" },
    { id: "ptz-07", label: "CV202318 - PTZ 07", statusLabel: "Watch", tone: "warning", detailLabel: "Excavation perimeter AI audit" }
  ] satisfies SafetyDeviceStatus[],
  weather: {
    updatedLabel: "2026-03-24 09:50 HKT",
    summary:
      "Under the anticyclone aloft, hot and mainly fine conditions continue over southern China. Gust exposure rises around noon and late afternoon cross-wind windows remain active for lifting operations.",
    conditionLabel: "Partly Cloudy",
    temperatureLabel: "24C",
    humidityLabel: "80%"
  } satisfies SafetyWeatherSummary,
  mapPoints: [
    {
      id: "cmp-lock-10",
      label: "E-Lock 10",
      detailLabel: "Deep pit access gate secure",
      tone: "info",
      icon: "shield",
      latitude: 22.30388,
      longitude: 114.18134,
      mapLeftPercent: "42%",
      mapTopPercent: "34%"
    },
    {
      id: "cmp-watch-west",
      label: "Watch Zone West",
      detailLabel: "Vehicle and personnel overlap",
      tone: "warning",
      icon: "vehicle",
      latitude: 22.30316,
      longitude: 114.18197,
      mapLeftPercent: "60%",
      mapTopPercent: "56%"
    },
    {
      id: "cmp-camera-gate",
      label: "AI Gate Camera",
      detailLabel: "Helmet and vest compliance capture",
      tone: "success",
      icon: "camera",
      latitude: 22.30355,
      longitude: 114.18102,
      mapLeftPercent: "28%",
      mapTopPercent: "48%"
    }
  ] satisfies SafetyMapPoint[]
};

export const safetyVideoData = {
  feeds: [
    {
      id: "gate-1",
      title: "CV2023 - Gate 1",
      timeLabel: "2026-03-24 11:22:15",
      statusLabel: "REC",
      tone: "success",
      imageUrl:
        "https://images.unsplash.com/photo-1541888081604-92e104e137b0?auto=format&fit=crop&w=1200&q=80",
      noteLabel: "Helmet and vest compliance"
    },
    {
      id: "tower-a",
      title: "CV2023 - Tower Crane A",
      timeLabel: "2026-03-24 11:22:15",
      statusLabel: "REC",
      tone: "success",
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=1200&q=80",
      noteLabel: "Cross-wind and swing radius"
    },
    {
      id: "excavation-zone",
      title: "CV2023 - Excavation Zone",
      timeLabel: "2026-03-24 11:22:15",
      statusLabel: "REC",
      tone: "warning",
      imageUrl:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
      noteLabel: "Unauthorized edge approach"
    },
    {
      id: "material-hub",
      title: "CV2023 - Material Hub",
      timeLabel: "2026-03-24 11:22:15",
      statusLabel: "OFFLINE",
      tone: "danger",
      imageUrl:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
      noteLabel: "Feed reconnect pending"
    }
  ] satisfies SafetyCameraFeed[],
  statusDistribution: [
    { id: "camera-online", label: "Online", value: 50, accentHex: "#3B82F6" },
    { id: "camera-offline", label: "Offline", value: 2, accentHex: "#CBD5E1" }
  ] satisfies SafetyDistributionItem[],
  alertTrend: {
    labels: ["08:00", "10:00", "12:00", "14:00", "16:00"],
    series: [
      {
        id: "ai-alerts",
        label: "AI Alerts",
        values: [2, 5, 1, 8, 3],
        accentHex: "#E11D48",
        tone: "danger",
        type: "line",
        area: true,
        smooth: true
      }
    ]
  } satisfies SafetyTrendChart,
  alerts: [
    { id: "helmet", label: "No Helmet Detected", statusLabel: "10:40 AM", tone: "danger" },
    { id: "zone", label: "Unauthorized Zone Access", statusLabel: "10:41 AM", tone: "danger" },
    { id: "smoking", label: "Smoking Detected", statusLabel: "10:42 AM", tone: "warning" },
    { id: "vest", label: "Missing Vest", statusLabel: "10:43 AM", tone: "warning" }
  ] satisfies SafetyDeviceStatus[]
};

export const safetyPersonnelData = {
  workforceDistribution: [
    { id: "concreter", label: "Concreter", value: 45, accentHex: "#3B82F6" },
    { id: "steel-fixer", label: "Steel Fixer", value: 30, accentHex: "#0EA5E9" },
    { id: "electrician", label: "Electrician", value: 15, accentHex: "#6366F1" },
    { id: "other", label: "Other", value: 10, accentHex: "#8B5CF6" }
  ] satisfies SafetyDistributionItem[],
  roster: [
    {
      id: "W-1042",
      name: "Chan Tai Man",
      tradeLabel: "Concreter",
      zoneLabel: "Zone A - Level 2",
      statusLabel: "Active",
      tone: "success"
    },
    {
      id: "W-1088",
      name: "Lee Siu Ming",
      tradeLabel: "Steel Fixer",
      zoneLabel: "Zone B - Foundation",
      statusLabel: "Idle",
      tone: "warning"
    },
    {
      id: "W-2091",
      name: "Wong Ka Ho",
      tradeLabel: "Electrician",
      zoneLabel: "Zone A - Level 1",
      statusLabel: "Active",
      tone: "success"
    },
    {
      id: "W-3044",
      name: "Ho Chi Kin",
      tradeLabel: "Crane Operator",
      zoneLabel: "Tower Crane 1",
      statusLabel: "Active",
      tone: "success"
    }
  ] satisfies SafetyWorkerRecord[],
  mapPoints: [
    {
      id: "personnel-zone-a",
      label: "Zone A",
      detailLabel: "45 workers active",
      tone: "info",
      icon: "user",
      latitude: 22.30362,
      longitude: 114.18156,
      mapLeftPercent: "50%",
      mapTopPercent: "40%"
    },
    {
      id: "personnel-zone-b",
      label: "Zone B",
      detailLabel: "12 workers in excavation support",
      tone: "warning",
      icon: "user",
      latitude: 22.30312,
      longitude: 114.18118,
      mapLeftPercent: "32%",
      mapTopPercent: "62%"
    }
  ] satisfies SafetyMapPoint[]
};

export const safetyCraneData = {
  metrics: [
    { id: "active-cranes", label: "Active Cranes", valueLabel: "3", tone: "info", icon: "shield" },
    { id: "wind-speed", label: "Max Wind Speed", valueLabel: "12 m/s", tone: "success", icon: "wind" },
    { id: "collision-risk", label: "Collision Risk", valueLabel: "SAFE", tone: "success", icon: "shield" },
    { id: "cert-validity", label: "Cert Validity", valueLabel: "100%", detailLabel: "12 valid / 2 expiring", tone: "info", icon: "activity" }
  ] satisfies SafetyMetricCard[],
  loadTrend: {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    unitLabel: "Load %",
    maxValue: 100,
    series: [
      {
        id: "crane-load",
        label: "Load %",
        values: [40, 60, 85, 95, 50],
        accentHex: "#3B82F6",
        tone: "info",
        type: "line",
        smooth: true,
        thresholdValue: 90
      }
    ]
  } satisfies SafetyTrendChart,
  certDistribution: [
    { id: "cert-valid", label: "Valid", value: 12, accentHex: "#3B82F6" },
    { id: "cert-expiring", label: "Expiring", value: 2, accentHex: "#0EA5E9" },
    { id: "cert-expired", label: "Expired", value: 0, accentHex: "#EF4444" }
  ] satisfies SafetyDistributionItem[],
  permits: [
    { id: "ptl-089", label: "PTL-2026-089", statusLabel: "Active", tone: "success", detailLabel: "Concrete bucket lifting" },
    { id: "ptl-090", label: "PTL-2026-090", statusLabel: "Pending", tone: "warning", detailLabel: "Facade frame lifting" }
  ] satisfies SafetyDeviceStatus[],
  cameraFeed: {
    id: "crane-cabin",
    title: "Crane 1 Cabin Cam",
    timeLabel: "Live",
    statusLabel: "REC",
    tone: "success",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=1200&q=80",
    noteLabel: "Cabin operator verification"
  } satisfies SafetyCameraFeed
};

export const safetyHoistData = {
  loadPercent: 75,
  speedTrend: {
    labels: ["10:00", "10:05", "10:10", "10:15", "10:20"],
    unitLabel: "m/s",
    series: [
      {
        id: "hoist-speed",
        label: "Speed",
        values: [1.2, 1.5, 0, 1.8, 1.5],
        accentHex: "#8B5CF6",
        tone: "info",
        type: "line",
        smooth: true,
        thresholdValue: 2
      }
    ]
  } satisfies SafetyTrendChart,
  statusMetrics: [
    { id: "door", label: "Door Status", valueLabel: "CLOSED", tone: "success", icon: "shield" },
    { id: "floor", label: "Current Floor", valueLabel: "Lvl 12", tone: "default", icon: "vehicle" },
    { id: "operator", label: "Operator Auth", valueLabel: "VERIFIED", tone: "success", icon: "user" }
  ] satisfies SafetyMetricCard[],
  cameraFeed: {
    id: "hoist-cabin",
    title: "Hoist A Cabin",
    timeLabel: "Live",
    statusLabel: "REC",
    tone: "success",
    imageUrl:
      "https://images.unsplash.com/photo-1541888081604-92e104e137b0?auto=format&fit=crop&w=1200&q=80",
    noteLabel: "Passenger and material transfer"
  } satisfies SafetyCameraFeed
};

export const safetyEnvironmentData = {
  metrics: [
    { id: "pm25", label: "PM 2.5", valueLabel: "30", detailLabel: "Good", tone: "success", icon: "wind" },
    { id: "pm10", label: "PM 10", valueLabel: "140", detailLabel: "High", tone: "danger", icon: "wind" },
    { id: "noise", label: "Noise", valueLabel: "72 dB", detailLabel: "Warning", tone: "warning", icon: "activity" },
    { id: "sprinkler", label: "Auto-Sprinkler Linkage", valueLabel: "ACTIVE", detailLabel: "Triggered 14:00", tone: "info", icon: "activity" }
  ] satisfies SafetyMetricCard[],
  airTrend: {
    labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    series: [
      {
        id: "pm25-trend",
        label: "PM2.5",
        values: [15, 22, 45, 85, 30, 25],
        accentHex: "#3B82F6",
        tone: "info",
        type: "line",
        area: true,
        smooth: true
      },
      {
        id: "pm10-trend",
        label: "PM10",
        values: [30, 45, 80, 140, 60, 45],
        accentHex: "#8B5CF6",
        tone: "warning",
        type: "line",
        area: true,
        smooth: true
      }
    ]
  } satisfies SafetyTrendChart,
  noiseTrend: {
    labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    minValue: 40,
    maxValue: 100,
    series: [
      {
        id: "noise-bars",
        label: "Noise",
        values: [55, 65, 88, 72, 60, 50],
        accentHex: "#10B981",
        tone: "success",
        type: "bar",
        thresholdValue: 85
      }
    ]
  } satisfies SafetyTrendChart
};

export const safetyExcavationData = {
  mapPoints: [
    {
      id: "sensor-s01",
      label: "Sensor S-01",
      detailLabel: "Displacement 2.0 mm",
      tone: "info",
      icon: "activity",
      latitude: 22.30342,
      longitude: 114.18161,
      mapLeftPercent: "46%",
      mapTopPercent: "32%"
    },
    {
      id: "elock-alarm",
      label: "Gate 3",
      detailLabel: "Unauthorized access alarm",
      tone: "danger",
      icon: "alert",
      latitude: 22.30303,
      longitude: 114.18189,
      mapLeftPercent: "62%",
      mapTopPercent: "60%"
    }
  ] satisfies SafetyMapPoint[],
  displacementTrend: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    unitLabel: "mm",
    series: [
      {
        id: "soil-shift",
        label: "Soil Displacement",
        values: [1.2, 1.5, 1.6, 2.1, 2.0],
        accentHex: "#0EA5E9",
        tone: "info",
        type: "line",
        smooth: true,
        area: true,
        thresholdValue: 5
      }
    ]
  } satisfies SafetyTrendChart,
  locks: [
    { id: "gate-3", label: "Gate 3 - Deep Pit", statusLabel: "ALARM", tone: "danger", detailLabel: "Unauthorized access detected" },
    { id: "gate-4", label: "Gate 4 - Slope Base", statusLabel: "SECURE", tone: "success", detailLabel: "Remote lock active" }
  ] satisfies SafetyDeviceStatus[]
};

export const safetyGasData = {
  metrics: [
    { id: "o2", label: "O2 Level", valueLabel: "20.9%", detailLabel: "Normal", tone: "success", icon: "activity" },
    { id: "co", label: "CO Level", valueLabel: "18 ppm", detailLabel: "Warning", tone: "warning", icon: "wind" },
    { id: "fan", label: "Auto-Ventilation Fan", valueLabel: "ACTIVE", detailLabel: "Linked to CO > 15 ppm", tone: "info", icon: "wind" }
  ] satisfies SafetyMetricCard[],
  trend: {
    labels: ["10:00", "10:10", "10:20", "10:30", "10:40"],
    series: [
      {
        id: "co",
        label: "CO (ppm)",
        values: [5, 12, 18, 10, 8],
        accentHex: "#F59E0B",
        tone: "warning",
        type: "line",
        smooth: true,
        thresholdValue: 25
      },
      {
        id: "h2s",
        label: "H2S (ppm)",
        values: [0, 1, 2, 1, 0],
        accentHex: "#8B5CF6",
        tone: "info",
        type: "line",
        smooth: true,
        thresholdValue: 10
      }
    ]
  } satisfies SafetyTrendChart,
  mapPoints: [
    {
      id: "b2-confined",
      label: "B2 Confined Space",
      detailLabel: "Ventilation linkage active",
      tone: "warning",
      icon: "wind",
      latitude: 22.30329,
      longitude: 114.18144,
      mapLeftPercent: "50%",
      mapTopPercent: "44%"
    }
  ] satisfies SafetyMapPoint[]
};

export const safetyStructuralData = {
  mapPoints: [
    {
      id: "structural-s1",
      label: "S1",
      detailLabel: "-2.0 mm settlement",
      tone: "success",
      icon: "activity",
      latitude: 22.30368,
      longitude: 114.18116,
      mapLeftPercent: "30%",
      mapTopPercent: "32%"
    },
    {
      id: "structural-s2",
      label: "S2",
      detailLabel: "+1.1 mm drift",
      tone: "success",
      icon: "activity",
      latitude: 22.30308,
      longitude: 114.18194,
      mapLeftPercent: "70%",
      mapTopPercent: "52%"
    }
  ] satisfies SafetyMapPoint[],
  settlementTrend: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    unitLabel: "mm",
    minValue: -5,
    maxValue: 5,
    series: [
      {
        id: "settlement",
        label: "Settlement",
        values: [0, -0.5, -1.2, -1.5, -1.4, -1.8, -2.0],
        accentHex: "#3B82F6",
        tone: "info",
        type: "line",
        smooth: true,
        area: true,
        thresholdValue: -4
      }
    ]
  } satisfies SafetyTrendChart,
  metrics: [
    { id: "current", label: "Current Value", valueLabel: "-2.0 mm", tone: "info", icon: "activity" },
    { id: "limit", label: "Warning Limit", valueLabel: "+/-4.0 mm", tone: "warning", icon: "alert" },
    { id: "status", label: "Status", valueLabel: "SAFE", tone: "success", icon: "shield" }
  ] satisfies SafetyMetricCard[]
};

export const safetyDroneData = {
  cameraFeed: {
    id: "drone-live",
    title: "High Altitude Scaffold Scan",
    timeLabel: "Live Flight",
    statusLabel: "LIVE",
    tone: "danger",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=1400&q=80",
    noteLabel: "AI scan route 03 - east facade"
  } satisfies SafetyCameraFeed,
  findings: [
    {
      id: "drone-missing-tie",
      title: "Missing Scaffold Tie",
      zoneLabel: "Tower A - Level 24 East Facade",
      severityLabel: "High Risk",
      severityTone: "danger",
      timeLabel: "Today 11:30"
    },
    {
      id: "drone-material",
      title: "Material Accumulated",
      zoneLabel: "Tower A - Roof Deck",
      severityLabel: "Medium Risk",
      severityTone: "warning",
      timeLabel: "Today 11:25"
    }
  ] satisfies SafetyDroneFinding[]
};
