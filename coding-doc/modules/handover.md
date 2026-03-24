# Handover

## 1. Module Identity

- Route: `/handover`
- Module id: `handover`
- UI label: `Handover`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`, `coding-doc/modules/prototype/handover_prototype.html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/12-handover.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/handover/page.tsx`, `components/modules/handover/handover-page.tsx`, `components/modules/handover/handover-site-map.tsx`, `lib/mock-data/handover.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a digital-twin-led closeout command center that combines GIS-linked asset status, Eagle Eye panorama evidence, AI snag closure, reality-vs-model verification, and digital asset manuals on the same route.
- Core operator questions answered: which assets are ready for digital twin release, which defect loops are still open, whether final scan evidence matches the BIM handover model, and which certified assets are ready to pass into operations.
- Agent or automation role: Eagle Eye and laser-scan captures provide visual and spatial evidence, AI verifies defect closure and geometry variance, and the handover workflow gates certificate release on evidence-backed closeout status.

## 4. Current State and Gap

- Current state: the route now replaces the generic placeholder with a prototype-faithful handover workflow, including the `Handover Master Command` overview, a Mapbox-backed GIS asset map with safe fallback, an asset-verification side list, an audit feed, and an in-place panorama detail view using the approved Eagle Eye panorama asset.
- Current state: the detail view exposes the original prototype's main surfaces on the same route: KPI band, AI snag detection, reality-vs-model verification, and digital asset manual.
- Gap to target: the module still uses typed mock data rather than live Eagle Eye, point-cloud, BIM, blockchain, and FM handover integrations.

## 5. Required UI Composition

- Page archetype and why it fits: map/context plus certification drill-down, because operators need a macro GIS closeout scan first and a detailed digital-twin verification workspace second.
- Header or summary row: one dominant command card carries the portfolio closeout signal; detailed KPI cards appear only after entering a selected asset's detail view.
- KPI or overview strategy: do not add a generic top KPI strip to the overview; keep the GIS surface as the primary focal zone and let the right rail support asset selection.
- Primary focal zone: GIS macro view with Mapbox-backed asset markers and direct drill-down into the selected asset.
- Secondary support zone: asset-verification list and audit feed in overview, then Eagle Eye panorama plus AI snag detection in detail mode.
- Same-route alternate view, if justified: same-route switch between GIS overview and panorama detail for the selected asset.
- Chart surfaces, if justified: none; the module's operator questions are better served by map, evidence, defect lists, and certification checks than by generic charting.

## 6. Data and Code Ownership

- Route file: `app/(platform)/handover/page.tsx`
- Page component: `components/modules/handover/handover-page.tsx`
- Map component: `components/modules/handover/handover-site-map.tsx`
- Mock data: `lib/mock-data/handover.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/progress-bar.tsx`

## 7. Interaction Notes

- Primary user actions: scan asset status on the GIS overview, hover/select an asset, open the in-place detail view, inspect Eagle Eye evidence, review active defects, and release or export closeout evidence packages.
- Selection or drill-down behavior: hovering or focusing an asset updates the GIS/list context; clicking a GIS marker or asset row opens the in-place detail view; the back action returns to the macro GIS overview without leaving `/handover`.
- Chart drill-down, legend, or filter behavior: not applicable for the current implementation.
- Empty or fallback behavior: if `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing, the GIS surface falls back to a styled preview state instead of failing route render; the detail view still renders with the approved Eagle Eye panorama asset.
- Responsive notes: desktop-first delivery; the route preserves the wide GIS and panorama surfaces expected by the prototype and stacks secondary panels without changing shell behavior.

## 8. Do Not Drift

- Preserve: `Handover Master Command`, GIS-first overview, in-place panorama detail flow, AI snag detection language, reality-vs-model verification, and digital asset manual semantics.
- Avoid: collapsing the route back into a generic module placeholder, replacing the GIS overview with a static illustration, using a remote placeholder image instead of the approved Eagle Eye asset, or moving the detail workflow to a separate route.

## 9. Implementation Tasks

- [x] Replace the generic handover placeholder with a dedicated module page and thin route wrapper.
- [x] Add typed handover mock data for command summary, GIS assets, audit feed, defect records, reality-vs-model checks, and digital manual assets.
- [x] Implement same-route overview-to-detail drill-down using the approved Mapbox GIS stack and the approved Eagle Eye panorama asset.

## 10. Acceptance Checks

- [x] `/handover` renders a GIS-led asset overview with the shared Jarvis shell intact.
- [x] Clicking a GIS marker or asset row opens an in-place panorama detail view and the back action returns to the overview without route navigation.
- [x] The detail view keeps the prototype's AI snag detection, reality-vs-model verification, and digital asset manual surfaces while using the approved Eagle Eye panorama asset.

## 11. Documentation Sync

- Update this file when: the overview/detail composition, GIS behavior, defect-closure flow, verification summary, or digital-manual structure changes.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
