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

## Phase 6. QA and Consistency Pass

- Verify every route uses the same shell and token system.
- Verify motion stays inside the approved shell and module hierarchy guardrails.
- Confirm icon family, spacing, and card language remain consistent.
- Verify reduced-motion fallbacks for non-essential animation.
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
