# Quality

## 1. Module Identity

- Route: `/quality`
- Module id: `quality`
- UI label: `Quality (DWSS)`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`, `coding-doc/modules/prototype/dwss_prototype.html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/10-quality-dwss.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/quality/page.tsx`, `components/modules/quality/quality-page.tsx`, `lib/mock-data/quality.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a dedicated Jarvis DWSS workbench covering pending inspection tasks, quality overview, work-supervision double-lock control, biometric competency monitoring, dynamic RFI tracking, inspection forms, and automated site-daily records on the same route.
- Core operator questions answered: what needs immediate quality action now, whether commence/completion locks are cleared, whether site personnel are authorized, which RFIs threaten workfront release, and whether daily records are complete and immutable.
- Agent or automation role: DWSS orchestrates commence/completion locks, Eagle Eye provides AI verification, biometric checks validate workforce competency, and the system auto-generates immutable daily reports from site events.

## 4. Current State and Gap

- Current state: the route now replaces the generic placeholder with a dedicated same-route DWSS workspace, including process-center tasks, overview analytics, supervision queue/detail flow, competency roster, RFI registry, inspection-form registry, and site-daily archive/detail drill-down.
- Gap to target: the page still uses typed mock data rather than live DWSS workflow records, biometric hardware feeds, BIM-linked RFI integrations, and immutable ledger backends.

## 5. Required UI Composition

- Page archetype and why it fits: queue/casework plus same-route workbench, because operators need to move from pending quality actions into deeper evidence-backed review surfaces without leaving the module.
- Header or summary row: a local DWSS header keeps the portfolio breadcrumb, overview shortcut, and quick-search actions tied to the active quality work surface.
- KPI or overview strategy: the overview uses a compact KPI ribbon, one dominant pass-rate chart, and a live quality-feed sidecar.
- Primary focal zone: whichever DWSS work surface is active, especially the work-supervision queue/detail flow and the site-daily archive/detail view.
- Secondary support zone: the left DWSS sub-navigation and registries that let operators switch between queue, supervision, biometric, RFI, form, and archive views without route changes.
- Same-route alternate view, if justified: site-daily archive switches to the selected daily report in place; work-supervision switches selected case detail in place.
- Chart surfaces, if justified: one ECharts line chart is used for first-time-pass versus defect-rectification trend because that comparison is the overview's core quality-control signal.

## 6. Data and Code Ownership

- Route file: `app/(platform)/quality/page.tsx`
- Page component: `components/modules/quality/quality-page.tsx`
- Mock data: `lib/mock-data/quality.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`

## 7. Interaction Notes

- Primary user actions: switch between DWSS workbench views, process pending tasks, select a supervision case, inspect competency alerts, review RFI registry rows, inspect form status, and open a daily archive entry.
- Selection or drill-down behavior: the left DWSS sidebar changes same-route content; the work-supervision queue updates the selected detail canvas in place; clicking a daily archive row opens the report detail inside the route, and the back action returns to the archive without route navigation.
- Chart drill-down, legend, or filter behavior: the overview chart supports hover tooltips; registry views expose search/filter affordances without leaving the route.
- Empty or fallback behavior: queue extensions such as `My Approvals`, `Processed`, and `Initiated by Me` retain a placeholder state until deeper process-center variants are implemented.
- Responsive notes: desktop-first delivery; the internal DWSS sidebar and workspace stay optimized for desktop widths, matching the current project delivery scope.

## 8. Do Not Drift

- Preserve: `Quality (DWSS)` naming, payment-style workbench shell, DWSS prototype hierarchy, same-route sub-navigation, pass-rate chart, work-supervision double-lock narrative, competency roster, RFI registry, inspection-form registry, and site-daily archive/detail flow.
- Avoid: collapsing the route back into a generic module placeholder, inventing a new global visual language, or replacing the prototype's evidence-led DWSS surfaces with generic KPI-only dashboards.

## 9. Implementation Tasks

- [x] Replace the generic quality placeholder with a dedicated DWSS module page and thin route wrapper.
- [x] Add typed quality mock data for queue tasks, overview metrics, pass-rate trend, supervision cases, competency roster, RFI registry, inspection forms, and site-daily archive/detail records.
- [x] Align `/quality` with the payment workbench shell while preserving the DWSS prototype's page composition and same-route workflow model.
- [x] Allow `/quality` to render full-bleed inside the shared shell for embedded DWSS work surfaces.

## 10. Acceptance Checks

- [x] `/quality` renders the full Jarvis DWSS workbench instead of the generic module placeholder.
- [x] `/quality` renders edge-to-edge inside the shared shell without reintroducing a centered max-width wrapper.
- [x] The overview keeps the pass-rate chart and live quality-feed sidecar inside the shared Jarvis card language.
- [x] The work-supervision queue updates the selected detail surface in place, and the site-daily archive opens report detail in place without leaving the route.
- [x] The biometric, RFI, inspection-form, and site-daily views keep their DWSS-specific registry layouts and do not drift into a copied generic module formula.

## 11. Documentation Sync

- Update this file when: the DWSS sub-navigation, overview composition, supervision workflow, registry layouts, or site-daily drill-down behavior changes.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
