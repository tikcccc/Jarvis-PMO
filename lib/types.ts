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

export interface QualityTask {
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

export interface QualityOverviewMetric {
  id: string;
  label: string;
  valueLabel: string;
  detailLabel?: string;
  changeLabel?: string;
  tone: Tone;
  icon?: IconName;
}

export interface QualityPassRateTrend {
  labels: string[];
  firstPassRate: number[];
  defectRectificationRate: number[];
}

export interface QualityLiveFeedItem {
  id: string;
  typeLabel: string;
  message: string;
  timeLabel: string;
  tone: Tone;
  icon: "checkCircle2" | "shieldAlert" | "messageSquare" | "camera";
}

export interface QualityStepCheck {
  id: string;
  label: string;
  passed: boolean;
}

export interface QualityAiCheck {
  id: string;
  label: string;
  resultLabel: string;
  tone: Tone;
}

export interface QualitySupervisionCase {
  id: string;
  title: string;
  zoneLabel: string;
  contractor: string;
  disciplineLabel: string;
  statusLabel: string;
  statusTone: Tone;
  timeLabel: string;
  commenceChecks: QualityStepCheck[];
  commenceNote: string;
  executionSummary: string;
  executionTone: Tone;
  submissionNote: string;
  submissionAttachmentLabel: string;
  aiChecks: QualityAiCheck[];
  completionNote: string;
}

export interface QualityPersonnelRecord {
  id: string;
  name: string;
  roleLabel: string;
  company: string;
  zoneLabel: string;
  timeInLabel: string;
  statusLabel: string;
  tone: Tone;
  reasonLabel?: string;
}

export interface QualityRfiStatusSummary {
  id: string;
  label: string;
  count: number;
  tone: Tone;
}

export interface QualityDistributionItem {
  id: string;
  label: string;
  percent: number;
  accentHex: string;
}

export interface QualityRfiRecord {
  id: string;
  statusLabel: string;
  statusTone: Tone;
  typeLabel: string;
  locationLabel: string;
  description: string;
  contractor: string;
  submittedLabel: string;
  slaLabel: string;
  slaTone: Tone;
}

export interface QualityInspectionFormRecord {
  formId: string;
  statusLabel: string;
  statusTone: Tone;
  taskTitle: string;
  typeLabel: string;
  typeTone: Tone;
  contractor: string;
  locationLabel: string;
  aiVerificationLabel: string;
  aiVerificationTone: Tone;
  submittedLabel: string;
  auditState: "secured" | "pending";
}

export interface QualityDailyProcessEntry {
  id: string;
  label: string;
  tone: Tone;
}

export interface QualityDailyLogRecord {
  dateLabel: string;
  weatherLabel: string;
  temperatureLabel: string;
  workersCount: number;
  managementCount: number;
  mainConCount: number;
  specialistCount: number;
  anomaliesCount: number;
  statusLabel: string;
  tone: Tone;
  hashLabel: string;
  processEntries: QualityDailyProcessEntry[];
  anomalyNote?: string;
}

export type SafetyStatusIconKey =
  | "camera"
  | "shield"
  | "vehicle"
  | "wind"
  | "alert"
  | "user"
  | "activity"
  | "globe"
  | "mapPin";

export interface SafetyMetricCard {
  id: string;
  label: string;
  valueLabel: string;
  detailLabel?: string;
  tone: Tone;
  icon: SafetyStatusIconKey;
}

export interface SafetyDeviceStatus {
  id: string;
  label: string;
  statusLabel: string;
  tone: Tone;
  detailLabel?: string;
}

export interface SafetyWeatherSummary {
  updatedLabel: string;
  summary: string;
  conditionLabel: string;
  temperatureLabel: string;
  humidityLabel: string;
}

export interface SafetyDistributionItem {
  id: string;
  label: string;
  value: number;
  accentHex: string;
}

export interface SafetyTrendSeries {
  id: string;
  label: string;
  values: number[];
  accentHex: string;
  tone: Tone;
  type: "line" | "bar";
  area?: boolean;
  smooth?: boolean;
  thresholdValue?: number;
}

export interface SafetyTrendChart {
  labels: string[];
  unitLabel?: string;
  minValue?: number;
  maxValue?: number;
  series: SafetyTrendSeries[];
}

export interface SafetyMapPoint {
  id: string;
  label: string;
  detailLabel: string;
  tone: Tone;
  icon: SafetyStatusIconKey;
  latitude: number;
  longitude: number;
  mapLeftPercent: string;
  mapTopPercent: string;
}

export interface SafetyCameraFeed {
  id: string;
  title: string;
  timeLabel: string;
  statusLabel: string;
  tone: Tone;
  imageUrl?: string;
  noteLabel?: string;
}

export interface SafetyWorkerRecord {
  id: string;
  name: string;
  tradeLabel: string;
  zoneLabel: string;
  statusLabel: string;
  tone: Tone;
}

export interface SafetyDroneFinding {
  id: string;
  title: string;
  zoneLabel: string;
  severityLabel: string;
  severityTone: Tone;
  timeLabel: string;
}
