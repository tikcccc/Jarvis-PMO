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

## 5. Contract Rules

- Keep display-ready strings for values that are already formatted in the reference prototype, such as `$142.8M` or `42.5%`.
- Add raw numeric fields only when a component actually needs math or sorting.
- Keep module labels and section names aligned with the reference docs.
- Do not invent extra domain concepts in mock data unless the UI needs them.
- Portfolio records use real geographic coordinates for map rendering; any no-token preview layout must be derived in the UI layer, not stored in the data file.

## 6. Input Source Rule

When mock data conflicts with later generated output, prefer data that traces back to:

1. `reference-doc/IN/**/prototype.html`
2. `reference-doc/IN/**/gemeni_chat.md`

`reference-doc/OUT` may inform naming consistency but should not silently replace the active baseline.
