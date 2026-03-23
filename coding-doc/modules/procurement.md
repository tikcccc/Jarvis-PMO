# Procurement

## 1. Module Identity

- Route: `/procurement`
- Module id: `procurement`
- UI label: `Procurement`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source:
  - `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
  - use the shared shell and generic module composition from the approved prototype baseline
- Module PRD source:
  - `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/index.md`
  - `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/05-procurement.md`
  - use the split PRD as the detailed functional source for tender validation, procurement risk, and supplier-profiling workflow; if wording is unclear, verify against the source PDF
- Scope and naming source:
  - `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
  - procurement is one of the twelve core modules and is explicitly framed as `Procurement (Tender Validation)`
- Supporting coding docs:
  - `coding-doc/coding-architect.md`
  - `coding-doc/coding-plan.md`
  - `coding-doc/coding-rules.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md`
- Current implementation references:
  - `app/(platform)/procurement/page.tsx`
  - `components/modules/procurement/procurement-page.tsx`
  - `lib/mock-data/procurement.ts`
  - `lib/types.ts`

## 3. Business Intent

- Purpose:
  - provide a PMO-facing tender validation and procurement risk view that reduces disputes before contract award
- Core operator questions answered:
  - Is the tender package complete and internally consistent?
  - Which bidders are compliant, non-compliant, or high-risk?
  - Where are contractual or pricing anomalies concentrated?
  - Which service providers require escalation before award?
- Agent or automation role:
  - procurement/compliance agents surface BQ mismatches, tender risks, and supplier profile flags for PMO review

## 4. Current State and Gap

- Current state:
  - the route now renders a dedicated `ProcurementPage` through a thin App Router file
  - the procurement main page has been refactored to map the approved procurement prototype composition instead of the earlier custom demo layout
  - the page now includes a procurement-specific header, four KPI cards, a tender validation matrix with compact package switching, a service-provider profiling panel, a commercial spread / front-loading ECharts comparison, a light contractual-risk ECharts panel, and a card-based procurement intelligence log
  - clicking the `Procurement` navigation item now opens the main procurement page directly, without sub-route view switching
  - procurement detail updates stay in-page: changing the active package resets the bidder comparison set and refreshes the related supplier, chart, and log panels without navigating away
- Gap to target:
  - the current implementation is still demo-grade and backed by local mock data only
  - filter/search controls are visual placeholders and do not yet persist or query external procurement systems
  - deeper workflows such as tender upload, clause drill-down, and award submission can extend from the current workbench without replacing the shared shell

## 5. Required UI Composition

- Header or summary row:
  - title: `Project Procurement Management`
  - subtitle: `Zero-Dispute Supply Chain & Tender Validation`
  - actions should stay consistent with current app language, for example `Initiate Agent`
- KPI or overview grid:
  - recommended metrics:
    - tender packages under review
    - compliant bidders
    - flagged contractual risks
    - pending clarifications
- Primary working panel:
  - `Tender Validation Matrix`
  - a comparison table for bidders, packages, commercial spread, compliance score, deviation, and risk
  - this panel is the dominant focal zone and should stay visually aligned with the approved procurement prototype
- Secondary insight, log, or action panel:
  - `Service Provider Profiling` panel with radar-chart style supplier context and integrity score
  - `Commercial Spread & Front-Loading Analysis` chart using ECharts
  - `Contractual Risk AI` light analysis panel using ECharts for historic claim propensity
  - audit log or issue feed showing detected mismatches, missing submissions, or clause anomalies
  - a dark emphasis panel is optional, but the current procurement mapping follows the light-surface prototype version

## 6. Data and Code Ownership

- Route file:
  - keep `app/(platform)/procurement/page.tsx` thin and route to a dedicated page component
- Page component:
  - target file: `components/modules/procurement/procurement-page.tsx`
- Mock data:
  - target file: `lib/mock-data/procurement.ts`
  - keep `lib/mock-data/modules.ts` only for generic module metadata, not full procurement page content
- Types:
  - add procurement-specific types to `lib/types.ts` only if existing generic primitives are insufficient
  - reflect any new shared data shape in `coding-doc/data-contract.md`
- Shared UI dependencies:
  - reuse shared `Card`, `Badge`, `Button`, `IconButton`, and `ProgressBar`
  - use the shared `Card` emphasis surface for the dark `Contractual Risk AI` panel instead of ad-hoc background overrides
  - preserve existing table density and badge semantics from milestones, approvals, and finance pages

## 7. Interaction Notes

- Primary user actions:
  - switch or select tender package
  - compare bidders
  - inspect flagged clauses or BQ mismatches
  - inspect supplier profile and procurement intelligence signals in-page
- Selection or drill-down behavior:
  - a selected tender package or bidder should update the detail panel instead of navigating away immediately
- Empty or fallback behavior:
  - if procurement data is incomplete, show a safe placeholder state inside the module rather than a broken panel
- Responsive notes:
  - tables may require horizontal scrolling on smaller screens, but KPI cards and summary panels should still stack cleanly

## 8. Do Not Drift

- Preserve:
  - the current white-theme executive command-center shell
  - existing card, table, badge, and progress semantics
  - PMO naming from approved sources, especially `Procurement` and `Tender Validation`
- Avoid:
  - inventing a new visual system for this page
  - replacing the dense operational layout with marketing-style sections
  - pulling module scope from `reference-doc/PENDING/**`

## 9. Implementation Tasks

- [x] Create `components/modules/procurement/procurement-page.tsx` with a procurement-specific summary row, KPI grid, and tender comparison workbench.
- [x] Create `lib/mock-data/procurement.ts` for tender packages, bidder comparisons, supplier profiles, procurement issue logs, and prototype-mapped ECharts series.
- [x] Rewire `app/(platform)/procurement/page.tsx` to the dedicated procurement page component instead of `GenericModulePage`.
- [x] Update `lib/types.ts` and `coding-doc/data-contract.md` if procurement-specific records require shared typing.
- [x] Run a visual consistency pass against the shared shell and the approved prototype language.
- [x] Refactor the procurement main page to visually map the approved procurement prototype while removing the previous multi-view navigation.

## 10. Acceptance Checks

- [x] `/procurement` renders a procurement-specific page, not only the generic module template.
- [x] The page includes a summary/header, KPI grid, primary tender-validation matrix, supplier profiling panel, ECharts analytical surfaces, and procurement intelligence log.
- [x] Procurement labels and section language remain aligned with approved source wording.
- [x] Data is stored in typed mock-data files outside the route file.
- [x] Clicking the `Procurement` sidebar entry opens the main procurement page directly without additional child navigation.
- [x] The page remains visually consistent with the existing Jarvis shell on desktop and mobile.
- [x] The procurement main page visually maps the approved procurement prototype composition instead of the earlier custom demo layout.

## 11. Documentation Sync

- Update this file when:
  - procurement page blocks, workflow, or data semantics change
  - the current implementation status changes from `placeholder` to `partial` or `rich`
- Also update:
  - `coding-doc/data-contract.md` when shared types change
  - `coding-doc/acceptance-criteria.md` or `coding-doc/test-strategy.md` if procurement gets route-specific QA requirements
