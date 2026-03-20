# Jarvis PMO Prototype Data Contract

## 1. Purpose

Define the typed mock-data contract for the frontend prototype so page structure and UI behavior stay stable during the Next.js migration.

## 2. Core Types

```ts
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
  label: string;
  icon: string;
  group: "overview" | "portfolio" | "execution" | "site";
}

export interface ModuleMeta {
  id: ModuleId;
  title: string;
  description: string;
  sections: string[];
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  tone: Tone;
  icon: string;
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
  type: "precedent" | "subsequent";
  content: string;
  status: string;
  tone: Tone;
  deadline?: string;
  progressPercent?: number;
  evidenceLabel?: string;
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
