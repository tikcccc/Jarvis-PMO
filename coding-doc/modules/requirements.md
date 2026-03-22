# Requirements

## 1. Module Identity

- Route: `/requirements`
- Module id: `requirements`
- UI label: `Requirements`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source:
  - `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
  - use the shared shell and baseline module card language from the approved prototype
- Scope and naming source:
  - `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
  - requirements is one of the twelve core modules and is framed as `Project Requirements Management`
- Supporting coding docs:
  - `coding-doc/coding-architect.md`
  - `coding-doc/coding-plan.md`
  - `coding-doc/coding-rules.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md`
- Current implementation references:
  - `app/(platform)/requirements/page.tsx`
  - `components/modules/requirements/requirements-page.tsx`
  - `lib/mock-data/requirements.ts`
  - `lib/types.ts`

## 3. Business Intent

- Purpose:
  - provide a PMO-facing single source of truth for the nine key project requirement elements so the baseline stays controlled before downstream module execution
- Core operator questions answered:
  - Are all nine requirement elements present, current, and baseline-approved?
  - Which requirement elements show drift, missing evidence, or pending review?
  - What downstream modules are affected by a requirement change?
  - What did the recording or review agents last update?
- Agent or automation role:
  - recording and review agents should surface baseline changes, missing references, sync status, and requirement traceability for PMO review

## 4. Current State and Gap

- Current state:
  - the route exists and follows approved module naming
  - the route now renders a dedicated `RequirementsPage` through a thin App Router file
  - the page includes a requirements-specific summary row, KPI ribbon, baseline workbench table, and a single selected-record detail card with an integrated alert strip
  - the active requirement record updates supporting evidence, traceability, and audit history in place without route navigation
- Gap to target:
  - the current implementation is still demo-grade and backed by local mock data only
  - same-route secondary views such as dedicated logs or change-request queues are not yet split out from the main workbench
  - future backend integration can replace the current mock baseline and evidence data without changing the route composition

## 5. Required UI Composition

- Header or summary row:
  - title: `Project Requirements Management`
  - subtitle: `The Project's Digital Gene Bank (9 Key Elements)`
  - status badge should communicate SSOT or master-record state
  - actions should stay consistent with current app language, for example `Change Requests`, `Audit Logs`, and `Initiate Agent`
- KPI or overview grid:
  - recommended metrics:
    - requirement elements in baseline
    - drift alerts
    - pending reviews
    - last master sync
- Primary working panel:
  - `Requirements Baseline Workbench`
  - a dense matrix, list, or table for the nine requirement elements with fields such as integrity, owner, baseline version, linked modules, open changes, and sync status
  - selection should happen in-page and make one active requirement record clearly dominant
- Secondary insight, log, or action panel:
  - `Selected Requirement Detail` panel showing an integrated alert strip, baseline statement, evidence sources, approval state, affected modules, and latest change summary
  - `Change Log` or audit surface showing recent baseline edits, missing source warnings, and review events
  - a compact dark alert strip is allowed for `Baseline Drift Radar` when analytical pressure needs stronger emphasis

## 6. Data and Code Ownership

- Route file:
  - keep `app/(platform)/requirements/page.tsx` thin and route to a dedicated page component once the module moves beyond the generic placeholder
- Page component:
  - target file: `components/modules/requirements/requirements-page.tsx`
- Mock data:
  - target file: `lib/mock-data/requirements.ts`
  - keep `lib/mock-data/modules.ts` only for lightweight module metadata, not full requirements page content
- Types:
  - add requirements-specific types to `lib/types.ts` only if shared generic primitives are insufficient
  - reflect any new shared data shape in `coding-doc/data-contract.md`
- Shared UI dependencies:
  - reuse shared `Card`, `Badge`, `Button`, `TabButton`, `IconButton`, and `ProgressBar`
  - preserve current table density, badge semantics, and shell spacing from the approved prototype and existing rich modules

## 7. Interaction Notes

- Primary user actions:
  - scan requirement health
  - select a requirement element
  - inspect baseline evidence and downstream impact
  - review recent changes or open issues
  - initiate a recording or review agent
- Selection or drill-down behavior:
  - selecting a requirement element should update the detail panel in place instead of navigating away immediately
  - if logs or traceability need more emphasis later, same-route secondary views are allowed, but the base route should remain the main workbench
- Empty or fallback behavior:
  - if evidence or ownership data is incomplete, show a safe placeholder inside the detail panel rather than breaking layout
- Responsive notes:
  - desktop remains the current delivery priority
  - on narrower widths, keep the active requirement detail near the top and move tertiary logs below the primary work surface

## 8. Do Not Drift

- Preserve:
  - the current white-theme executive command-center shell
  - approved PMO naming, especially `Requirements` and `Project Requirements Management`
  - shared card, badge, button, and table semantics
- Avoid:
  - leaving the module as a permanent generic nine-card page
  - inventing a new visual system unrelated to the approved prototype
  - turning the route into a document repository UI with no operational hierarchy
  - pulling scope from `reference-doc/PENDING/**`

## 9. Implementation Tasks

- [x] Create `components/modules/requirements/requirements-page.tsx` with a requirements-specific summary row, KPI ribbon, primary workbench, and detail/log panels.
- [x] Create `lib/mock-data/requirements.ts` for requirement records, drift signals, evidence, and change-log data.
- [x] Rewire `app/(platform)/requirements/page.tsx` to the dedicated requirements page component instead of `GenericModulePage`.
- [x] Update `lib/types.ts` and `coding-doc/data-contract.md` if requirements-specific records need shared typing.
- [x] Run a visual consistency pass against the shared shell and approved prototype language.

## 10. Acceptance Checks

- [x] `/requirements` renders a requirements-specific page, not only the generic module template.
- [x] The page includes a summary/header, KPI overview, primary requirement workbench, and secondary detail or log panel.
- [x] The active requirement selection is clear and updates supporting detail in place.
- [x] Requirements labels and section language remain aligned with approved source wording.
- [x] Data is stored in typed mock-data files outside the route file.
- [x] The page remains visually consistent with the existing Jarvis shell on desktop.

## 11. Documentation Sync

- Update this file when:
  - requirements page blocks, workflow, or data semantics change
  - the current implementation status changes from `placeholder` to `partial` or `rich`
- Also update:
  - `coding-doc/data-contract.md` when shared types change
  - `coding-doc/acceptance-criteria.md` or `coding-doc/test-strategy.md` if requirements gets route-specific QA requirements
