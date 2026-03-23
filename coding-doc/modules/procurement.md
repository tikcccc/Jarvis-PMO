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
  - the page includes a procurement-specific tender pulse ribbon, KPI signals, tender package selector, bidder comparison table, selected-bidder summary strip, supplier profile panel, dark contract-risk panel, and intelligence log
  - the module now supports two same-route views:
    - `Workbench` at `/procurement`
    - `Logs` at `/procurement?view=logs`
  - the sidebar can expand the `Procurement` item to expose the `Workbench` and `Logs` entry points without creating a separate top-level module
  - procurement detail updates stay in-page: changing the active package resets the bidder comparison set and refreshes the related supplier/risk panels without navigating away
- Gap to target:
  - the current implementation is still demo-grade and backed by local mock data only
  - filter/search controls are visual placeholders and do not yet persist or query external procurement systems
  - deeper workflows such as tender upload, clause drill-down, and award submission can extend from the current workbench without replacing the shared shell

## 5. Required UI Composition

- Header or summary row:
  - title: `Project Procurement Management`
  - subtitle: `Zero-Dispute Supply Chain & Tender Validation`
  - actions should stay consistent with current app language, for example `Audit Logs` and `Initiate Agent`
- KPI or overview grid:
  - recommended metrics:
    - tender packages under review
    - compliant bidders
    - flagged contractual risks
    - pending clarifications
- Primary working panel:
  - `Tender Validation Workbench`
  - a comparison table or score panel for bidders, packages, commercial spread, compliance score, and recommended action
  - this panel should embody the reference module sections:
    - `Digital BQ Validation`
    - `Compliance Auditing`
    - `Contractual Risk Prediction`
    - `Intelligent Tender Evaluation`
- Secondary insight, log, or action panel:
  - `Service Provider Profiling` panel listing supplier history, qualification status, and red flags
  - audit log or issue feed showing detected mismatches, missing submissions, or clause anomalies
  - a log-focused same-route view is allowed when the issue feed needs to become the dominant focal zone
  - a dark emphasis panel is allowed for contract risk scoring because dark panels are already approved for special analytical views

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
  - open supplier profile or audit log
  - switch between `Workbench` and `Logs` without leaving the procurement module route family
- Selection or drill-down behavior:
  - a selected tender package or bidder should update the detail panel instead of navigating away immediately
  - `Logs` may use the same package and bidder selection state while making the intelligence feed the primary surface
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
- [x] Create `lib/mock-data/procurement.ts` for tender packages, bidder comparisons, supplier profiles, and procurement issue logs.
- [x] Rewire `app/(platform)/procurement/page.tsx` to the dedicated procurement page component instead of `GenericModulePage`.
- [x] Update `lib/types.ts` and `coding-doc/data-contract.md` if procurement-specific records require shared typing.
- [x] Run a visual consistency pass against the shared shell and the approved prototype language.

## 10. Acceptance Checks

- [x] `/procurement` renders a procurement-specific page, not only the generic module template.
- [x] `/procurement?view=logs` renders a log-focused procurement view while keeping the same module route.
- [x] The page includes a summary/header, KPI grid, primary tender-validation panel, and secondary risk/log panel.
- [x] Procurement labels and section language remain aligned with approved source wording.
- [x] Data is stored in typed mock-data files outside the route file.
- [x] The procurement sidebar entry can expand to expose `Workbench` and `Logs` child links without breaking shell consistency.
- [x] The page remains visually consistent with the existing Jarvis shell on desktop and mobile.

## 11. Documentation Sync

- Update this file when:
  - procurement page blocks, workflow, or data semantics change
  - the current implementation status changes from `placeholder` to `partial` or `rich`
- Also update:
  - `coding-doc/data-contract.md` when shared types change
  - `coding-doc/acceptance-criteria.md` or `coding-doc/test-strategy.md` if procurement gets route-specific QA requirements
