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
  children?: NavChildItem[];
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export interface NavChildItem {
  id: string;
  href: string;
  label: string;
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

export interface RequirementAttribute {
  label: string;
  value: string;
}

export interface RequirementEvidence {
  id: string;
  label: string;
  kind: string;
  sourceLabel: string;
}

export interface RequirementImpactLink {
  id: string;
  targetLabel: string;
  targetType: "module" | "requirement";
  impactLabel: string;
  tone: Tone;
  note: string;
}

export interface RequirementHistoryEntry {
  id: string;
  version: string;
  dateLabel: string;
  author: string;
  action: string;
  tone: Tone;
  type: "baseline" | "review" | "drift";
}

export interface RequirementRiskAlert {
  id: string;
  severityLabel: string;
  sourceLabel: string;
  message: string;
  budgetImpactLabel: string;
  timelineImpactLabel: string;
  recommendedAction: string;
}

export interface RequirementRecord {
  id: string;
  title: string;
  integrityScore: number;
  owner: string;
  version: string;
  statusLabel: string;
  tone: Tone;
  syncTimeLabel: string;
  statement: string;
  openChangeCount: number;
  relatedModules: string[];
  specificFields: RequirementAttribute[];
  evidence: RequirementEvidence[];
  linkages: RequirementImpactLink[];
  history: RequirementHistoryEntry[];
  riskAlert?: RequirementRiskAlert;
}

export interface ProcurementMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  icon: IconName;
}

export interface ProcurementPackage {
  id: string;
  code: string;
  name: string;
  stage: string;
  scope: string;
  closingDate: string;
  status: string;
  tone: Tone;
  bidderCount: number;
  clarificationCount: number;
  bqCoverage: string;
  lead: string;
  engineerEstimate: string;
}

export interface ProcurementRiskSignal {
  id: string;
  label: string;
  value: string;
  tone: Tone;
}

export interface ProcurementBidder {
  id: string;
  packageId: string;
  supplierId: string;
  name: string;
  commercialOffer: string;
  commercialSpread: string;
  complianceScore: number;
  bqDeviation: string;
  riskScore: number;
  riskLevel: string;
  riskTone: Tone;
  pricingPattern: string;
  recommendedAction: string;
  recommendedActionTone: Tone;
  summary: string;
  flags: string[];
  riskSignals: ProcurementRiskSignal[];
}

export interface ProcurementSupplierProfile {
  id: string;
  name: string;
  qualificationStatus: string;
  qualificationTone: Tone;
  historicProjects: string;
  claimRatio: string;
  responseTime: string;
  integrityScore: number;
  lastAward: string;
  highlight: string;
  redFlags: string[];
}

export interface ProcurementIssueLog {
  id: string;
  packageId: string;
  bidderId?: string;
  category: string;
  title: string;
  message: string;
  owner: string;
  status: string;
  tone: Tone;
  timeLabel: string;
}

export interface DesignSummaryMetric {
  id: string;
  label: string;
  value: string;
  statusLabel: string;
  tone: Tone;
  icon: IconName;
}

export interface DesignLineageStage {
  id: string;
  stage: string;
  dateLabel: string;
  statusLabel: string;
  tone: Tone;
  icon: IconName;
}

export interface DesignPackage {
  id: string;
  name: string;
  syncLabel: string;
  statusLabel: string;
  tone: Tone;
}

export interface DesignIssue {
  id: string;
  packageId: string;
  typeLabel: string;
  typeTone: Tone;
  severityLabel: "High" | "Medium" | "Low";
  severityTone: Tone;
  trade: string;
  area: string;
  description: string;
  specReference: string;
  statusLabel: string;
  statusTone: Tone;
}

export interface DesignSuggestion {
  id: string;
  packageId: string;
  typeLabel: string;
  description: string;
  savingsLabel: string;
  statusLabel: string;
  tone: Tone;
}

export interface DesignIssueDistributionBucket {
  id: string;
  label: string;
  count: number;
  colorHex: string;
}

export interface DesignTradeCostItem {
  id: string;
  trade: string;
  budgetValue: number;
  extractedValue: number;
  unit: string;
  status: "over" | "under" | "on-track";
}

export interface DesignTradeCostTrendPoint {
  id: string;
  monthLabel: string;
  actualValue: number;
  budgetValue: number;
}

export interface DesignDfmaSignal {
  id: string;
  label: string;
  valueLabel: string;
  progressPercent: number;
  tone: Tone;
}
