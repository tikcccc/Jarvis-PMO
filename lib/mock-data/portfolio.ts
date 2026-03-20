import type { MetricCard, ProjectRecord } from "@/lib/types";

export const portfolioStats: MetricCard[] = [
  {
    id: "asset-value",
    label: "Total Asset Value",
    value: "$2.4B",
    tone: "info",
    icon: "wallet"
  },
  {
    id: "data-integrity",
    label: "SSOT Data Integrity",
    value: "99.8%",
    tone: "success",
    icon: "database"
  },
  {
    id: "pending-approvals",
    label: "Pending Approvals",
    value: "24",
    tone: "warning",
    icon: "fileCheck"
  },
  {
    id: "vo-sum",
    label: "Active VO Sum",
    value: "$12.4M",
    tone: "danger",
    icon: "activity"
  }
];

export const projects: ProjectRecord[] = [
  {
    id: 1,
    name: "Horizon Estates Phase I",
    status: "On Track",
    tone: "success",
    budgetLabel: "$120M",
    approvalLabel: "92%",
    landStatus: "Cleared",
    latitude: 22.3027,
    longitude: 114.1772
  },
  {
    id: 2,
    name: "Harbor View Tower",
    status: "At Risk",
    tone: "warning",
    budgetLabel: "$85M",
    approvalLabel: "45%",
    landStatus: "Contested",
    latitude: 22.2832,
    longitude: 114.2139
  },
  {
    id: 3,
    name: "Oakwood Business Park",
    status: "Delayed",
    tone: "danger",
    budgetLabel: "$210M",
    approvalLabel: "12%",
    landStatus: "Pending",
    latitude: 22.3701,
    longitude: 114.1187
  },
  {
    id: 4,
    name: "Central Metro Hub",
    status: "On Track",
    tone: "success",
    budgetLabel: "$340M",
    approvalLabel: "100%",
    landStatus: "Cleared",
    latitude: 22.3368,
    longitude: 114.1545
  }
];

export const portfolioProjectLogs = [
  { id: "land-conditions", icon: "fileCheck" as const, message: "Lands Dept Condition 4.2 extracted.", timeLabel: "2h ago" },
  { id: "planning-delay", icon: "clock" as const, message: "Warning: Planning delay impact +2 days.", timeLabel: "1d ago" },
  { id: "brief-update", icon: "target" as const, message: "Client brief baseline updated.", timeLabel: "3d ago" }
];
