import type { IconName } from "@/lib/icons";

export type Tone = "default" | "info" | "success" | "warning" | "danger";

export type ModuleId =
  | "dashboard"
  | "portfolio"
  | "requirements"
  | "milestones"
  | "approvals"
  | "procurement"
  | "design"
  | "finance"
  | "payment"
  | "progress"
  | "quality"
  | "safety"
  | "handover";

export interface NavItem {
  id: ModuleId;
  href: string;
  label: string;
  icon: IconName;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  tone: Tone;
  icon: IconName;
}

export interface FeedItem {
  id: string;
  agent: string;
  message: string;
  tone: Tone;
  timeLabel: string;
}

export interface ModuleMeta {
  id: Exclude<ModuleId, "dashboard">;
  title: string;
  desc: string;
  sections: string[];
}

export interface ProjectRecord {
  id: number;
  name: string;
  status: string;
  tone: Tone;
  budgetLabel: string;
  approvalLabel: string;
  landStatus: string;
  latitude: number;
  longitude: number;
}

export interface MilestoneRecord {
  id: number;
  stage: string;
  title: string;
  plannedDate: string;
  status: string;
  tone: Tone;
  progressPercent?: number;
  evidenceLabel?: string;
  agentVerified: boolean;
}

export interface ApprovalRecord {
  id: number;
  title: string;
  department: string;
  reference: string;
  status: string;
  tone: Tone;
  conditionCount: number;
  closedCount: number;
  lastUpdateLabel: string;
}

export interface ApprovalCondition {
  id: number;
  type: "Precedent" | "Subsequent";
  content: string;
  status: string;
  tone: Tone;
  deadline?: string;
  progressPercent?: number;
  evidenceLabel?: string;
}
