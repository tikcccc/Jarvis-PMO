# Handover

## 1. Module Identity

- Route: `/handover`
- Module id: `handover`
- UI label: `Handover`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`, `coding-doc/modules/prototype/handover_prototype.html`, `coding-doc/modules/prototype/handver_prototype(2).html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/12-handover.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/handover/page.tsx`, `components/modules/handover/handover-page.tsx`, `components/modules/handover/handover-site-map.tsx`, `lib/mock-data/handover.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a digital-twin-led closeout command center that combines GIS-linked asset status, Eagle Eye panorama evidence, AI snag closure, reality-vs-model verification, and digital asset manuals on the same route.
- Core operator questions answered: which assets are ready for digital twin release, which defect loops are still open, whether final scan evidence matches the BIM handover model, and which certified assets are ready to pass into operations.
- Agent or automation role: Eagle Eye and laser-scan captures provide visual and spatial evidence, AI verifies defect closure and geometry variance, and the handover workflow gates certificate release on evidence-backed closeout status.

## 4. Current State and Gap

- Current state: the route now follows the refreshed `handver_prototype(2).html` reading path, with a `Handover Master Command` header, a summary KPI strip, a Mapbox-backed GIS overview with safe fallback, an audit log, and a digital-twin asset list that drills into the same-route detail workspace.
- Current state: the detail view now uses the approved `public/image/eagle eye/eagle eye.png` asset for both the Eagle Eye evidence surface and the AI comparison tiles, and exposes `Reality 360` / `BIM Heatmap` switching, AI snag auto-closure evidence, a dark `Reality-vs-Model Cert` panel, and the digital asset manual on the same route.
- Gap to target: the module still uses typed mock data rather than live Eagle Eye, point-cloud, BIM, blockchain, and FM handover integrations.

## 5. Required UI Composition

- Page archetype and why it fits: map/context plus certification drill-down, because operators need a macro GIS closeout scan first and a detailed digital-twin verification workspace second.
- Header or summary row: one dominant command card carries the portfolio closeout signal and is followed by a compact four-card summary KPI strip for rectification rate, LOD consistency, active snags, and forecasted handover timing.
- KPI or overview strategy: the summary KPI strip is allowed on this route because the refreshed prototype uses it as a compact executive summary ahead of the GIS work surface; keep the GIS surface visually dominant and the right rail secondary.
- Primary focal zone: GIS macro view with Mapbox-backed asset markers and direct drill-down into the selected asset.
- Secondary support zone: audit log plus digital-twin asset list in overview, then AI snag auto-closure and digital asset manual in detail mode.
- Same-route alternate view, if justified: same-route switch between GIS overview and a selected-asset detail workspace, with `Reality 360` / `BIM Heatmap` toggling inside the Eagle Eye evidence surface.
- Chart surfaces, if justified: none; the module's operator questions are better served by map, evidence, defect lists, and certification checks than by generic charting.

## 6. Data and Code Ownership

- Route file: `app/(platform)/handover/page.tsx`
- Page component: `components/modules/handover/handover-page.tsx`
- Map component: `components/modules/handover/handover-site-map.tsx`
- Mock data: `lib/mock-data/handover.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/progress-bar.tsx`

## 7. Interaction Notes

- Primary user actions: scan asset status on the GIS overview, hover/select an asset, open the in-place detail view, switch between `Reality 360` and `BIM Heatmap`, inspect AI evidence cards, and release or export closeout evidence packages.
- Selection or drill-down behavior: hovering or focusing an asset updates the GIS/list context; clicking a GIS marker or asset row opens the in-place detail view; the back action returns to the macro GIS overview without leaving `/handover`; selecting a snag record expands its evidence comparison card in place.
- Chart drill-down, legend, or filter behavior: not applicable for the current implementation.
- Empty or fallback behavior: if `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing, the GIS surface falls back to a styled preview state instead of failing route render; the detail view still renders with the approved Eagle Eye panorama asset.
- Responsive notes: desktop-first delivery; the route preserves the wide GIS and panorama surfaces expected by the prototype and stacks secondary panels without changing shell behavior.

## 8. Do Not Drift

- Preserve: `Handover Master Command`, the compact summary KPI strip, GIS-first overview, in-place detail flow, `Reality 360` / `BIM Heatmap` language, AI snag detection semantics, the dark `Reality-vs-Model Cert` panel, and digital asset manual semantics.
- Avoid: collapsing the route back into a generic module placeholder, replacing the GIS overview with a static illustration, using a remote placeholder image instead of the approved Eagle Eye asset, or moving the detail workflow to a separate route.

## 9. Implementation Tasks

- [x] Replace the generic handover placeholder with a dedicated module page and thin route wrapper.
- [x] Add typed handover mock data for command summary, GIS assets, audit feed, defect records, reality-vs-model checks, and digital manual assets.
- [x] Implement same-route overview-to-detail drill-down using the approved Mapbox GIS stack and the approved Eagle Eye panorama asset.
- [x] Align the route composition to `coding-doc/modules/prototype/handver_prototype(2).html` while preserving the Jarvis PMO shell and shared UI primitives.

## 10. Acceptance Checks

- [x] `/handover` renders a GIS-led asset overview with the shared Jarvis shell intact.
- [x] Clicking a GIS marker or asset row opens an in-place panorama detail view and the back action returns to the overview without route navigation.
- [x] The detail view keeps the prototype's AI snag detection, reality-vs-model verification, and digital asset manual surfaces while using the approved Eagle Eye panorama asset.
- [x] The overview keeps the summary KPI strip and Mapbox GIS as the dominant focal sequence, with the right rail reserved for audit and asset context.

## 11. Documentation Sync

- Update this file when: the overview/detail composition, KPI strategy, GIS behavior, Eagle Eye visual-mode behavior, defect-closure flow, verification summary, or digital-manual structure changes.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
