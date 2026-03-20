import type { MetricCard, MilestoneRecord } from "@/lib/types";

export const milestoneStats: MetricCard[] = [
  {
    id: "critical-path",
    label: "Critical Path Status",
    value: "On Track",
    tone: "info",
    icon: "checkCircle2"
  },
  {
    id: "forecast-handover",
    label: "Forecast Handover",
    value: "Mar 2028",
    tone: "warning",
    icon: "calendar"
  },
  {
    id: "verification-rate",
    label: "Agent Verification Rate",
    value: "100%",
    tone: "success",
    icon: "shieldCheck"
  },
  {
    id: "delay-risk",
    label: "Delay Impact Risk",
    value: "Low",
    tone: "danger",
    icon: "trendingUp"
  }
];

export const milestones: MilestoneRecord[] = [
  { id: 1, stage: "Pre-Construction", title: "Land Acquisition & Title Deed", plannedDate: "2025-10-15", status: "Completed", tone: "success", evidenceLabel: "Deed_Ref_772.pdf", agentVerified: true },
  { id: 2, stage: "Approvals", title: "Master Plan (GBP) Approval", plannedDate: "2026-01-20", status: "Completed", tone: "success", evidenceLabel: "BD_Appr_2026.pdf", agentVerified: true },
  { id: 3, stage: "Site Works", title: "Foundation & Piling Commencement", plannedDate: "2026-03-01", status: "In Progress", tone: "success", progressPercent: 85, agentVerified: true },
  { id: 4, stage: "Site Works", title: "Superstructure Main Contract Award", plannedDate: "2026-05-15", status: "Pending", tone: "warning", agentVerified: false },
  { id: 5, stage: "Construction", title: "Tower A Structural Topping Out", plannedDate: "2027-02-10", status: "Pending", tone: "default", agentVerified: false },
  { id: 6, stage: "Approvals", title: "Occupation Permit (OP) Issuance", plannedDate: "2027-11-30", status: "Pending", tone: "default", agentVerified: false },
  { id: 7, stage: "Handover", title: "Final Unit Handover (DLV)", plannedDate: "2028-03-15", status: "Pending", tone: "default", agentVerified: false }
];

export const milestoneImpactRows = [
  { id: "topping-out", label: "Topping Out", value: "+2 Days" },
  { id: "occupation", label: "Occupation Permit", value: "Stable" },
  { id: "handover", label: "Final Handover", value: "On Schedule" }
];

export const milestoneLogs = [
  { id: "ingest", type: "INGEST", message: "P6 Schedule baseline-v2 ingested by Agent.", timeLabel: "2h ago" },
  { id: "verify", type: "VERIFY", message: "Building Dept approval letter (GBP) scanned & mapped.", timeLabel: "1d ago" },
  { id: "alert", type: "ALERT", message: "Foundation log shows ground conditions deviating.", timeLabel: "3d ago" }
];
