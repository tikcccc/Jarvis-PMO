# Progress

## 1. Module Identity

- Route: `/progress`
- Module id: `progress`
- UI label: `Progress (Eagle Eye)`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/09-progress-eagle-eye.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/progress/page.tsx`, `components/modules/progress/progress-page.tsx`, `components/modules/progress/progress-site-map.tsx`, `lib/mock-data/progress.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: give PMO leaders a one-screen progress command center that ties GIS-linked zone status, Eagle Eye panorama evidence, AI trade quantification, and downstream schedule impact into the same route.
- Core operator questions answered: which zone is lagging, what the latest stage-gated capture shows, how actual trade quantities compare with plan, and whether current variance threatens downstream milestones or handover.
- Agent or automation role: Eagle Eye captures fixed project-stage panoramas, the Progress Agent aligns those captures with Master P6 gates, quantifies trade completion, and raises impact alerts when variance crosses the configured threshold.

## 4. Current State and Gap

- Current state: the route now replaces the generic placeholder with a dedicated overview-to-detail workflow, including a Mapbox-backed GIS site map with safe fallback, monitored-zone drill-down, stage-based snapshot timeline, Eagle Eye evidence image, AI trade progress bars, and a dark analytical delay-impact panel.
- Gap to target: the page still uses typed mock data and a single shared Eagle Eye evidence image rather than live site imagery, BIM overlays, and schedule APIs.

## 5. Required UI Composition

- Page archetype and why it fits: map/context plus live-operations drill-down, because the module needs a fast sitewide scan first and an evidence-backed anomaly workbench second.
- Header or summary row: compact KPI band for global progress, network uptime, lagging zones, and P6 sync freshness.
- KPI or overview strategy: summary metrics stay in a small top strip so the GIS surface remains the dominant overview block.
- Primary focal zone: GIS / BIM site map with Eagle Eye zone markers and selected-zone context.
- Secondary support zone: monitored-zone list in overview, then the panorama evidence surface plus AI trade quantification in detail mode.
- Same-route alternate view, if justified: same-route switch between site overview and selected-zone detail view.
- Chart surfaces, if justified: none; the operator question is better served by map, evidence timeline, and plan-vs-actual bars than by a generic chart.

## 6. Data and Code Ownership

- Route file: `app/(platform)/progress/page.tsx`
- Page component: `components/modules/progress/progress-page.tsx`
- Map component: `components/modules/progress/progress-site-map.tsx`
- Mock data: `lib/mock-data/progress.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/icon-button.tsx`, `components/ui/progress-bar.tsx`

## 7. Interaction Notes

- Primary user actions: scan zone status on the GIS map, hover/select a zone, open the zone detail, inspect the Eagle Eye capture, and switch between available project-stage snapshots.
- Selection or drill-down behavior: map marker hover updates the selected-zone context, clicking a marker or monitored-zone row opens the in-place detail view for that zone, and the back action returns to the overview without leaving the route.
- Chart drill-down, legend, or filter behavior: not applicable for the current implementation.
- Empty or fallback behavior: if `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing, the GIS surface falls back to a styled preview state instead of failing route render.
- Responsive notes: desktop-first delivery; the route keeps large map and evidence surfaces at desktop widths and stacks gracefully on narrower layouts without altering the shared shell.

## 8. Do Not Drift

- Preserve: route name, `Progress (Eagle Eye)` terminology, white command-center shell, GIS-first overview, stage-gated snapshot logic, and the single dark emphasis panel reserved for delay impact analysis.
- Avoid: turning the route into a generic KPI dashboard, replacing the GIS surface with a placeholder card, using a continuous video-player timeline, or moving the main operator story away from zone anomaly detection and evidence-backed schedule impact.

## 9. Implementation Tasks

- [x] Replace the generic progress placeholder with a dedicated module page and thin route wrapper.
- [x] Add typed progress mock data for summary metrics, GIS zones, capture gates, trade quantities, and delay-impact outputs.
- [x] Implement overview-to-detail drill-down with GIS map, Eagle Eye evidence image, discrete project-stage timeline, and a single dark analytical pressure panel.

## 10. Acceptance Checks

- [x] `/progress` renders a GIS-led overview and an in-place zone detail view without shell drift.
- [x] The detail view uses fixed project-stage capture gates rather than a continuous media scrubber.
- [x] Delay impact analysis is the only dark emphasis panel on the route, while the remaining surfaces keep the shared white Jarvis card language.

## 11. Documentation Sync

- Update this file when: the overview/detail composition, map behavior, stage-gated timeline logic, or progress mock-data fields change.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
