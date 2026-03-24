# Safety

## 1. Module Identity

- Route: `/safety`
- Module id: `safety`
- UI label: `Safety (Smart Site)`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`, `coding-doc/modules/prototype/safty_prototpye.html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/11-safety-smart-site.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/safety/page.tsx`, `components/modules/safety/safety-page.tsx`, `components/modules/safety/safety-site-map.tsx`, `lib/mock-data/safety.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a dedicated Smart Site safety workbench covering the central management platform plus the nine DevB-designated modules on the same route.
- Core operator questions answered: where live safety pressure is accumulating, whether site devices and access controls remain compliant, which zones or systems need immediate intervention, and how field evidence aligns with safety operations.
- Agent or automation role: the CMP aggregates smart-site telemetry, AI vision flags unsafe behavior, device integrations drive alerting and automated linkage actions, and GIS context keeps operators anchored to the active site zone.

## 4. Current State and Gap

- Current state: the route now replaces the generic placeholder with a dedicated safety workbench, adds a payment-style internal sidebar, keeps all safety detail views on the same route, and swaps prototype GIS placeholders for the approved Mapbox stack with safe fallback behavior.
- Gap to target: the page still uses typed mock data rather than live device feeds, DevB reporting APIs, UWB positioning, equipment telemetry, environmental sensors, or drone mission systems.

## 5. Required UI Composition

- Page archetype and why it fits: live operations and alerts, because the module's primary job is real-time site safety awareness and operator response instead of document review.
- Header or summary row: a local safety header keeps the portfolio breadcrumb, command-center return action, and Smart Site search tied to the active work surface.
- KPI or overview strategy: the CMP view uses compact operational cards around one dominant GIS surface; detail views mirror the prototype's chart, map, and feed blocks without adding a generic top-KPI dashboard.
- Primary focal zone: the active safety work surface, especially the CMP GIS map and the selected detail module's dominant chart or live-feed panel.
- Secondary support zone: the left module sidebar plus the detail-side status panels, lists, and alert cards.
- Same-route alternate view, if justified: the internal safety sidebar switches between CMP and the nine safety modules without route navigation.
- Chart surfaces, if justified: charts are limited to live trend questions such as load, environmental thresholds, gas levels, soil displacement, and structural settlement.

## 6. Data and Code Ownership

- Route file: `app/(platform)/safety/page.tsx`
- Page component: `components/modules/safety/safety-page.tsx`
- Map component: `components/modules/safety/safety-site-map.tsx`
- Mock data: `lib/mock-data/safety.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`

## 7. Interaction Notes

- Primary user actions: switch between CMP and safety modules, inspect live map nodes, review camera and device states, and scan trend or defect panels without leaving the route.
- Selection or drill-down behavior: the left safety sidebar changes same-route content; GIS markers focus the active safety node in place across CMP, personnel, excavation, gas, and structural views.
- Chart drill-down, legend, or filter behavior: trend charts support hover tooltips; map views support `MAP` and `SATELLITE` switching through the shared Mapbox control pattern.
- Empty or fallback behavior: if `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is absent, GIS views fall back to the approved preview state instead of failing route render.
- Responsive notes: desktop-first delivery; the internal safety sidebar and workbench proportions are tuned for desktop widths, matching the current frontend scope.

## 8. Do Not Drift

- Preserve: `Safety (Smart Site)` naming, payment-style dual-sidebar workbench shell, same-route module switching, Mapbox GIS usage, and the prototype-aligned layout rhythm of each safety detail page.
- Avoid: reintroducing the generic module placeholder, adding numbering back to the internal safety menu labels, or replacing the prototype's map / chart / live-feed composition with a generic KPI-first dashboard.

## 9. Implementation Tasks

- [x] Replace the generic safety placeholder with a dedicated Smart Site module page and thin route wrapper.
- [x] Add typed safety mock data for CMP, smart video, personnel, crane, hoist, environment, excavation, gas, structural, and drone views.
- [x] Align `/safety` with the payment-style workbench shell while keeping each safety detail page visually aligned to the safety prototype.
- [x] Replace safety GIS placeholders with the approved Mapbox stack and keep the shared safe fallback behavior.
- [x] Remove numeric prefixes from the internal safety menu labels.

## 10. Acceptance Checks

- [x] `/safety` renders a dedicated Smart Site workbench instead of the generic module placeholder.
- [x] `/safety` renders full-bleed inside the shared shell and preserves the payment-style internal sidebar proportions without shell drift.
- [x] The internal safety menu lists CMP and all nine Smart Site modules without numeric label prefixes.
- [x] CMP, personnel, excavation, gas, and structural GIS views use the approved Mapbox pattern with safe fallback behavior.
- [x] Each safety detail page keeps the prototype-aligned dominant surface and support panels instead of collapsing into a copied generic module layout.

## 11. Documentation Sync

- Update this file when: the safety sub-navigation, GIS behaviors, dominant detail surfaces, or Smart Site module set changes.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/coding-architect.md`, `coding-doc/ui-consistency.md`, `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
