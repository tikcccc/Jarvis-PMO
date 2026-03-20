import type { MetricCard, ModuleMeta } from "@/lib/types";

export const moduleMetaById: Record<ModuleMeta["id"], ModuleMeta> = {
  portfolio: {
    id: "portfolio",
    title: "Project Portfolio Management",
    desc: "Single Source of Truth (SSOT) Digital Command Center",
    sections: ["Automated Recording via Agents", "SSOT Central Database", "Intelligent Threshold Alerting", "Strategic Dashboard"]
  },
  requirements: {
    id: "requirements",
    title: "Project Requirements Management",
    desc: "The Project's Digital Gene Bank (9 Key Elements)",
    sections: [
      "Client Requirements",
      "Project Brief",
      "Feasibility Studies",
      "Site Information",
      "Project Budget",
      "Project Programme",
      "Procurement Strategy",
      "Responsibility Matrix",
      "Information Requirements"
    ]
  },
  milestones: {
    id: "milestones",
    title: "Project Milestone Management",
    desc: "Critical Path Prediction & Control",
    sections: ["Agent-Driven Plan Parsing", "Multi-Source Evidence Tracking", "Dynamic Baseline Management", "Delay Prediction Engine"]
  },
  approvals: {
    id: "approvals",
    title: "Project Government Approval Management",
    desc: "Condition Tracking & Compliance Loop",
    sections: ["Agent-Driven Condition Extraction", "Compliance Evidence Capture", "Approval SSOT Database", "Delay Impact Simulation"]
  },
  procurement: {
    id: "procurement",
    title: "Project Procurement Management",
    desc: "Zero-Dispute Supply Chain & Tender Validation",
    sections: [
      "Digital BQ Validation",
      "Compliance Auditing",
      "Contractual Risk Prediction",
      "Intelligent Tender Evaluation",
      "Service Provider Profiling"
    ]
  },
  design: {
    id: "design",
    title: "Project Design Management",
    desc: "Real-time BIM-Cost Synchronization",
    sections: [
      "Intelligent BIM Consistency",
      "Digital Specification Management",
      "Real-Time Cost Estimation",
      "Design Health Monitoring"
    ]
  },
  finance: {
    id: "finance",
    title: "Project Finance Management",
    desc: "7 Core Financial Elements (Budget to VO Sum)",
    sections: [
      "Total Funding & Revenue",
      "Total Budget Control",
      "Planned vs Awarded Contracts",
      "Invoiced vs Paid Tracking",
      "VO Sum Management",
      "Cash Flow Forecasting",
      "Anomaly Detection"
    ]
  },
  payment: {
    id: "payment",
    title: "Project Payment Management (Jarvis PAY)",
    desc: "Zero-Dispute Multi-Contract Engine (NEC/GCC/EPC)",
    sections: ["Multi-Contract Rule Engine", "Objective Progress Verification", "Real-Time CE/VO Integration", "Blockchain Audit Trail"]
  },
  progress: {
    id: "progress",
    title: "Project Progress Management",
    desc: "Jarvis Eagle Eye & Progress Agent",
    sections: ["360° Site Data Capture", "AI Trade Recognition", "Visual Quantity Tracking", "4D Progress Dashboard"]
  },
  quality: {
    id: "quality",
    title: "Project Quality Management (Jarvis DWSS)",
    desc: "Zero-Defect Digital Work Supervision",
    sections: ["Work Commence / Completion Approval", "Biometric Personnel Tracking", "Dynamic RFI Tracking", "Automated Site Daily"]
  },
  safety: {
    id: "safety",
    title: "Project Safety Management",
    desc: "Smart Site CMP & 9 指定 Site Modules",
    sections: [
      "Smart Video Analytics",
      "Personnel Location",
      "Tower Crane Monitoring",
      "Hoisting Safety",
      "Environmental Monitoring",
      "Excavation/Slope Sensors",
      "Gas Detection",
      "Structural Health",
      "Drone Inspection"
    ]
  },
  handover: {
    id: "handover",
    title: "Project Handover Management",
    desc: "Digital Twin & Zero-Defect Delivery",
    sections: ["AI Auto-Defect Detection", "Digital Rectification Loop", "Reality-vs-Model Verification", "Interactive User Manual"]
  }
};

export const genericModuleActionMetrics: MetricCard[] = [
  {
    id: "audit-logs",
    label: "Audit Logs",
    value: "Ready",
    tone: "info",
    icon: "fileText"
  },
  {
    id: "initiate-agent",
    label: "Initiate Agent",
    value: "Available",
    tone: "success",
    icon: "activity"
  }
];
