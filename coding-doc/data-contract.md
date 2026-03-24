# Jarvis PMO Prototype Data Contract

## 1. Purpose

Define the typed mock-data contract for the frontend prototype so page structure and UI behavior stay stable during the Next.js migration.

## 2. Core Types

```ts
import type { IconName } from "@/lib/icons";

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

export type Tone = "default" | "info" | "success" | "warning" | "danger";

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

export interface ModuleMeta {
  id: Exclude<ModuleId, "dashboard">;
  title: string;
  desc: string;
  sections: string[];
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
```

## 3. Page-Specific Types

```ts
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

export interface RequirementAutomationAction {
  id: string;
  title: string;
  description: string;
  sourceLabel: string;
  cadenceLabel: string;
  statusLabel: string;
  tone: Tone;
  lastRunLabel: string;
}

export interface RequirementValidationCheck {
  id: string;
  label: string;
  targetLabel: string;
  statusLabel: string;
  tone: Tone;
  detail: string;
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
  governance: RequirementAttribute[];
  automationActions: RequirementAutomationAction[];
  validationChecks: RequirementValidationCheck[];
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

export interface ProgressSummaryMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  icon: IconName;
}

export interface ProgressTradeQuantity {
  id: string;
  trade: string;
  statusLabel: string;
  tone: Tone;
  actualPercent: number;
  plannedPercent: number;
}

export interface ProgressSnapshot {
  id: string;
  stageLabel: string;
  captureLabel: string;
  timestampLabel: string;
  gpsLabel: string;
  weatherLabel: string;
  noteLabel: string;
  tone: Tone;
}

export interface ProgressImpactRow {
  id: string;
  label: string;
  valueLabel: string;
  tone: Tone;
}

export interface ProgressImpactAnalysis {
  headline: string;
  summary: string;
  rows: ProgressImpactRow[];
  ctaLabel: string;
}

export interface ProgressZone {
  id: string;
  mapLabel: string;
  name: string;
  area: string;
  statusLabel: string;
  tone: Tone;
  progressPercent: number;
  cameraCoverageLabel: string;
  nextCaptureLabel: string;
  varianceLabel: string;
  latitude: number;
  longitude: number;
  cameraId: string;
  cameraLocationLabel: string;
  activeSnapshotId: string;
  snapshots: ProgressSnapshot[];
  tradeQuantities: ProgressTradeQuantity[];
  impactAnalysis: ProgressImpactAnalysis;
}

export interface HandoverCommandSummary {
  portfolioStatusPercent: number;
  verifiedAssetsLabel: string;
  verifiedAssetsDetail: string;
  waveLabel: string;
}

export interface HandoverZoneKpi {
  id: string;
  label: string;
  valueLabel: string;
  tone: Tone;
  icon: IconName;
}

export interface HandoverDefectRecord {
  id: string;
  typeLabel: string;
  locationLabel: string;
  statusLabel: string;
  statusTone: Tone;
  severityLabel: string;
  severityTone: Tone;
  detectedDateLabel: string;
  noteLabel: string;
}

export interface HandoverVerificationCheck {
  id: string;
  label: string;
  valueLabel: string;
  tone: Tone;
}

export interface HandoverVerificationSummary {
  statusLabel: string;
  statusTone: Tone;
  consistencyLabel: string;
  varianceLabel: string;
  certificateLabel: string;
  noteLabel: string;
  checks: HandoverVerificationCheck[];
}

export interface HandoverManualAsset {
  id: string;
  assetLabel: string;
  assetTypeLabel: string;
  locationLabel: string;
  statusLabel: string;
  statusTone: Tone;
}

export interface HandoverAuditFeedItem {
  id: string;
  message: string;
  tone: Tone;
}

export interface HandoverZone {
  id: string;
  mapLabel: string;
  name: string;
  label: string;
  areaLabel: string;
  statusLabel: string;
  tone: Tone;
  progressPercent: number;
  lastScanLabel: string;
  latitude: number;
  longitude: number;
  kpis: HandoverZoneKpi[];
  defects: HandoverDefectRecord[];
  verification: HandoverVerificationSummary;
  manualAssets: HandoverManualAsset[];
}

export interface PaymentTask {
  id: string;
  typeLabel: string;
  title: string;
  context: string;
  contractor: string;
  receivedLabel: string;
  deadlineLabel: string;
  priorityLabel: "High" | "Medium";
  priorityTone: Tone;
}

export interface PaymentOverviewMetric {
  id: string;
  label: string;
  valueLabel: string;
  detailLabel?: string;
  changeLabel?: string;
  tone: Tone;
  icon?: IconName;
}

export interface PaymentProgressComparisonItem {
  id: string;
  label: string;
  aiPercent: number;
  contractorPercent: number;
  aiSeriesLabel: string;
  contractorSeriesLabel: string;
  alertThresholdPercent: number;
}

export interface PaymentContractRuleItem {
  id: string;
  label: string;
  statusLabel: string;
  tone: Tone;
}

export interface PaymentLiveImpactCard {
  label: string;
  valueLabel: string;
  noteLabel: string;
  tone: Tone;
}

export interface PaymentRuleBucket {
  id: string;
  label: string;
  tone: Tone;
  accentHex: string;
}

export type PaymentCertificateSummaryBucket = "settled" | "processing" | "flagged";

export interface PaymentCertificateRecord {
  id: string;
  statusLabel: string;
  statusTone: Tone;
  summaryBucket: PaymentCertificateSummaryBucket;
  certificateNo: string;
  periodLabel?: string;
  contractTitle: string;
  contractor: string;
  amountValue: number;
  ruleLabel: string;
  ruleTone: Tone;
  ruleBucketId: string;
  variationLabel: string;
  aiProgressLabel: string;
  aiProgressTone: Tone;
  txHashLabel?: string;
  auditState: "secured" | "pending";
}

export interface PaymentValuationRecord {
  id: string;
  zoneLabel: string;
  contractor: string;
  contractTitle: string;
  claimPercent: number;
  aiPercent: number;
  claimAmountValue: number;
  aiAmountValue: number;
  statusLabel: string;
  statusTone: Tone;
  deviationLabel: string;
  cameraLabel: string;
  issueLabel: string;
  latitude: number;
  longitude: number;
  mapLeftPercent: string;
  mapTopPercent: string;
}

export interface PaymentVariationRecord {
  id: string;
  description: string;
  contractor: string;
  estimatedAmountValue: number;
  ruleLabel: string;
  ruleTone: Tone;
  statusLabel: string;
  daysLeftLabel?: string;
}
```

## 4. Data File Ownership

Suggested file mapping:

- `lib/navigation.ts`
  - `NavItem[]`
  - route labels and section grouping
- `lib/mock-data/modules.ts`
  - `ModuleMeta[]`
- `lib/mock-data/dashboard.ts`
  - dashboard metrics and intelligence feed
- `lib/mock-data/portfolio.ts`
  - `ProjectRecord[]`
- `lib/mock-data/milestones.ts`
  - `MilestoneRecord[]`
- `lib/mock-data/approvals.ts`
  - `ApprovalRecord[]`
  - `ApprovalCondition[]`
- `lib/mock-data/requirements.ts`
  - `MetricCard[]`
  - `RequirementRecord[]`
- `lib/mock-data/finance.ts`
  - finance dashboard metrics, audit rows, and stress-test scaffolding
- `lib/mock-data/procurement.ts`
  - `ProcurementMetric[]`
  - `ProcurementPackage[]`
  - `Record<string, ProcurementBidder[]>`
  - `Record<string, ProcurementSupplierProfile>`
  - `ProcurementIssueLog[]`
- `lib/mock-data/design.ts`
  - `DesignSummaryMetric[]`
  - `DesignLineageStage[]`
  - `DesignPackage[]`
  - `Record<string, DesignIssue[]>`
  - `Record<string, DesignSuggestion[]>`
  - `DesignIssueDistributionBucket[]`
  - `DesignTradeCostItem[]`
  - `DesignTradeCostTrendPoint[]`
  - `DesignDfmaSignal[]`
- `lib/mock-data/progress.ts`
  - `ProgressSummaryMetric[]`
  - `ProgressZone[]`
- `lib/mock-data/handover.ts`
  - `HandoverCommandSummary`
  - `HandoverAuditFeedItem[]`
  - `HandoverZone[]`
- `lib/mock-data/payment.ts`
  - `PaymentTask[]`
  - `PaymentOverviewMetric[]`
  - `PaymentProgressComparisonItem[]`
  - `PaymentContractRuleItem[]`
  - `PaymentLiveImpactCard`
  - `PaymentRuleBucket[]`
  - `PaymentCertificateRecord[]`
  - `PaymentValuationRecord[]`
  - `PaymentVariationRecord[]`

## 5. Contract Rules

- Keep display-ready strings for values that are already formatted in the reference prototype, such as `$142.8M` or `42.5%`.
- Add raw numeric fields only when a component actually needs math or sorting.
- Keep module labels and section names aligned with the reference docs.
- Do not invent extra domain concepts in mock data unless the UI needs them.
- Requirements records may include governance metadata, agent automation routines, and validation checks when the route needs to expose SSOT control behavior directly.
- Portfolio records use real geographic coordinates for map rendering; any no-token preview layout must be derived in the UI layer, not stored in the data file.

## 6. Input Source Rule

When mock data conflicts with later generated output, prefer data that traces back to:

1. `reference-doc/IN/**/prototype.html`
2. `reference-doc/IN/**/2026.03.JPM.Platform/index.md` and the matching per-module markdown
3. `reference-doc/IN/**/gemeni_chat.md`

If split PRD wording is ambiguous because of extraction noise, verify against the sibling `2026.03.JPM.Platform.pdf`.

`reference-doc/OUT` may inform naming consistency but should not silently replace the active baseline.
