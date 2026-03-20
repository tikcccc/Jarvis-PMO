# Jarvis PMO Prototype API Spec

## 1. Scope

The first frontend phase is prototype-only. There is no real backend yet. The "API" contract in this phase defines stable data access seams so the Next.js UI can migrate from inline constants to structured providers without a later rewrite.

## 2. Preferred Access Pattern

Use repository-style functions first. Route handlers can be added later if the prototype needs remote-like loading.

```ts
getNavigation(): Promise<NavItem[]>
getModuleMeta(moduleId: ModuleId): Promise<ModuleMeta>
getDashboardMetrics(): Promise<MetricCard[]>
getDashboardFeed(): Promise<FeedItem[]>
getPortfolioProjects(): Promise<ProjectRecord[]>
getMilestones(projectId: string): Promise<MilestoneRecord[]>
getApprovals(projectId: string): Promise<ApprovalRecord[]>
getApprovalConditions(approvalId: string): Promise<ApprovalCondition[]>
```

## 3. Optional Future Route Handlers

If route handlers are needed for demos or integration seams, expose these endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/prototype/navigation` | Sidebar/navigation config |
| `GET` | `/api/prototype/dashboard` | Dashboard metrics and feed |
| `GET` | `/api/prototype/portfolio` | Portfolio projects and map data |
| `GET` | `/api/prototype/milestones` | Milestone timeline data |
| `GET` | `/api/prototype/approvals` | Approval list |
| `GET` | `/api/prototype/approvals/:id` | Approval condition detail |
| `GET` | `/api/prototype/modules/:moduleId` | Generic module overview data |

## 4. Response Shape Rules

- Response payloads must mirror the typed contracts from `coding-doc/data-contract.md`.
- Keep tone and label fields explicit to reduce view-level mapping logic.
- Preserve display formatting where the prototype relies on exact strings.

## 5. Error Handling

Prototype phase may use simplified error handling:

- return empty arrays for missing mock datasets
- throw only for invalid route/module ids
- avoid loading spinners that change layout height dramatically

## 6. Source Governance

- Input data should trace back to approved files in `reference-doc/IN/`.
- `reference-doc/PENDING` is not a valid API data source.
- If generated `OUT` materials are used, they must be traceable to the current active `IN` baseline.
