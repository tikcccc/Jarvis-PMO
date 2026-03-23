# Payment

## 1. Module Identity

- Route: `/payment`
- Module id: `payment`
- UI label: `Jarvis PAY`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`, `coding-doc/modules/prototype/payment_prototype(1).html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/08-payment-jarvis-pay.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/payment/page.tsx`, `components/modules/payment/payment-page.tsx`, `lib/mock-data/payment.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a dedicated Jarvis PAY workbench covering queue handling, payment overview, AI valuation, payment ledgers, and CE / VO tracking on the same route.
- Core operator questions answered: which payment items need action now, whether physical progress supports the claimed value, how payment exposure is distributed across contract families, and which CE / VO items threaten certification timing.
- Agent or automation role: Eagle Eye and the Progress Agent provide physical verification, while Jarvis PAY applies contract-rule logic and flags payment claims that exceed evidence-backed progress.

## 4. Current State and Gap

- Current state: the route now replaces the generic placeholder with a dedicated same-route payment workspace, including payment sub-navigation, overview dashboard, valuation drill-down, MC / NSC ledgers, and CE / VO tracking. The route is allowed to render full-bleed inside the shared shell because it is expected to host embedded external payment or DWSS-style surfaces.
- Gap to target: the module still uses typed mock data rather than live ERP, SSOT, blockchain, schedule, and camera integrations, even though the valuation overview now uses the shared Mapbox GIS stack and the inspection detail uses the approved Eagle Eye panorama asset.

## 5. Required UI Composition

- Page archetype and why it fits: queue/casework plus same-route workbench, because the operator needs both pending actions and deeper certification evidence without leaving the module.
- Header or summary row: a local payment header keeps the portfolio breadcrumb, overview shortcut, and quick search actions tied to the selected payment work surface.
- KPI or overview strategy: the overview uses a compact KPI ribbon plus one dominant AI verification surface and two supporting panels for contract logic and CE / VO pressure.
- Primary focal zone: the selected payment work surface, especially AI valuation overview/detail when the module opens.
- Secondary support zone: the payment sub-navigation and ledger summaries that let operators switch between work queues and ledgers without route changes.
- Same-route alternate view, if justified: valuation overview switches to in-place inspection detail; other payment views remain on the same route via the module sidebar.
- Chart surfaces, if justified: one ECharts comparison chart is used for AI progress versus contractor claim because that comparison is the module's core guardrail question.

## 6. Data and Code Ownership

- Route file: `app/(platform)/payment/page.tsx`
- Page component: `components/modules/payment/payment-page.tsx`
- Mock data: `lib/mock-data/payment.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`

## 7. Interaction Notes

- Primary user actions: switch between queue, overview, valuation, ledger, and CE / VO views; open a valuation zone; inspect AI-versus-claim discrepancy; and return to the valuation overview in place.
- Selection or drill-down behavior: the left payment sidebar changes same-route content; valuation marker focus synchronizes with the monitored-zone list; clicking a zone or row opens the inspection detail inside the route.
- Chart drill-down, legend, or filter behavior: the overview chart supports hover tooltips and deviation highlighting for AI-to-claim gaps.
- Empty or fallback behavior: non-implemented queue views such as `Copied to Me`, `Processed`, and `Initiated by Me` retain the prototype placeholder state; the valuation GIS surface falls back to a safe preview when `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is absent.
- Responsive notes: desktop-first delivery; the internal payment sidebar and workspace stay optimized for desktop widths, matching the current project delivery scope.

## 8. Do Not Drift

- Preserve: `Jarvis PAY` naming, payment-specific sub-navigation, AI valuation flow, MC / NSC ledger split, CE / VO management language, and the prototype's same-route workbench model.
- Avoid: collapsing the route back into a generic module placeholder, renaming payment concepts with finance terminology, or reintroducing inconsistent mock totals, contractor names, or relative-time labels.

## 9. Implementation Tasks

- [x] Replace the generic payment placeholder with a dedicated payment module page and thin route wrapper.
- [x] Add typed payment mock data for queue items, overview metrics, contract-rule states, ledgers, valuation cases, and CE / VO records.
- [x] Correct prototype data inconsistencies for totals, rule distribution coverage, contractor naming, zone issue naming, and fixed-date labels while preserving the prototype layout.
- [x] Allow `/payment` to render full-bleed inside the shared shell for future embedded payment or DWSS surfaces.
- [x] Replace the static valuation mock imagery with the shared Mapbox GIS implementation and the approved Eagle Eye panorama asset.

## 10. Acceptance Checks

- [x] `/payment` renders the full Jarvis PAY workbench instead of the generic module placeholder.
- [x] `/payment` renders edge-to-edge inside the shared shell without reintroducing a centered max-width wrapper.
- [x] MC and NSC ledger totals and rule distributions are derived from the same certificate dataset and stay internally consistent.
- [x] The valuation view supports same-route overview-to-detail inspection without leaving the payment route.
- [x] The valuation overview uses the approved Mapbox GIS stack with safe fallback behavior, and the inspection detail uses the approved Eagle Eye panorama asset.

## 11. Documentation Sync

- Update this file when: the payment sub-navigation, overview composition, valuation drill-down flow, ledger model, or CE / VO behavior changes.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
