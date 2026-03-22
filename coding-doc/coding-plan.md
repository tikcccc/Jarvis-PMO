# Jarvis PMO Prototype Delivery Plan

## Goal

Turn the current Jarvis PMO prototype reference into a maintainable Next.js frontend while preserving the existing UI language and module structure.

## Phase 1. Document and Freeze the Baseline

- Confirm the active input set under `reference-doc/IN/`.
- Freeze the current visual baseline from `prototype.html`.
- Document source priority and `IN` / `OUT` / `PENDING` usage rules.
- Record route and module naming before implementation starts.

## Phase 2. Scaffold the Next.js Frontend

- Create a Next.js App Router project with TypeScript.
- Add Tailwind CSS and `lucide-react`.
- Add global font, root layout, shell layout, and shared CSS token files.
- Implement placeholder routes for dashboard and all twelve modules.

## Phase 3. Extract Shared UI

- Build reusable `Card`, `Badge`, `ProgressBar`, `IconButton`, and page header primitives.
- Build reusable motion tokens and keyframes in `styles/jarvis-ui/motion.css`.
- Build the persistent app shell:
  - collapsible sidebar
  - sticky top header
  - floating Jarvis intelligence button
- Move navigation config into a shared typed source.

## Phase 4. Migrate High-Fidelity Screens

Implement the complex reference-heavy pages first:

1. Strategic Overview
2. Portfolio
3. Milestones
4. Gov Approvals
5. Finance

These pages define most of the shell, grid, table, progress bar, and dark-panel patterns used elsewhere.
- During each screen migration, decide whether the module needs a chart-first, map-first, or workbench-first analytical surface.
- Before implementation, classify the module archetype and reading path, for example map-first, queue/casework-first, comparison/risk-first, timeline-first, live-operations-first, finance/scenario-first, or coordination/canvas-first.
- Record whether summary signals belong in a top KPI band, compact ribbon, inline strip, or inside the primary surface instead of assuming every route needs the same top section.
- Only introduce charting when a trend, comparison, distribution, or forecast view materially reduces operator scan time.
- Record approved chart surfaces in the corresponding module doc instead of assuming every module should gain charts.

## Phase 5. Migrate Remaining Modules

- Requirements
- Procurement
- Design
- Jarvis PAY
- Progress (Eagle Eye)
- Quality (DWSS)
- Safety (Smart Site)
- Handover

During this phase, reuse existing shared sections whenever possible instead of cloning new markup.
- Keep workbench-first modules such as requirements and approvals focused on queue, table, detail, and evidence patterns unless a chart has a clear operational role.
- Do not reuse the exact same `top KPI + main workbench + right side panel` rhythm across unrelated modules just because it already exists.
- If two modules share a similar composition, document the workflow reason in the module doc instead of implying the similarity is the default.

## Phase 6. QA and Consistency Pass

- Verify every route uses the same shell and token system.
- Verify motion stays inside the approved shell and module hierarchy guardrails.
- Confirm icon family, spacing, and card language remain consistent.
- Verify reduced-motion fallbacks for non-essential animation.
- Verify analytical charts, when present, keep shared color semantics, readable legends, and stable empty states.
- Verify module differences are rational and task-led, while similarities are justified by genuinely similar operator workflows.
- Run responsive checks for desktop and mobile.
- Compare the migrated pages against the original reference prototype.

## Deliverables

- maintainable Next.js app structure
- project architecture docs in `coding-doc/`
- reusable `front-end-ui` skill for future UI work
- reusable `front-end-motion` skill and animation architecture guidance for future motion work
- documented acceptance and testing rules to prevent visual drift

## Implementation Constraints

- Existing prototype is the baseline. Modify, do not redesign.
- Shared styles must be centralized.
- `reference-doc/PENDING` stays out of scope until approved.
