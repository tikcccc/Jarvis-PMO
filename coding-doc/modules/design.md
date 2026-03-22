# Design

## 1. Module Identity

- Route: `/design`
- Module id: `design`
- UI label: `Design (BIM-Cost)`
- Current implementation status: `placeholder`

## 2. Approved Source Inputs

- Visual source:
  - `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
  - use the shared shell and baseline module composition from the approved prototype
- Scope and naming source:
  - `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
  - design is one of the twelve core modules and is framed as `Project Design Management (BIM-Cost Sync)`
- Supporting coding docs:
  - `coding-doc/coding-architect.md`
  - `coding-doc/coding-plan.md`
  - `coding-doc/coding-rules.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md`
- Current implementation references:
  - `app/(platform)/design/page.tsx`
  - `components/modules/generic/generic-module-page.tsx`
  - `lib/navigation.ts`
  - `lib/mock-data/modules.ts`
  - `lib/types.ts`

## 3. Business Intent

- Purpose:
  - provide a PMO-facing design control workbench that keeps BIM model health, specification completeness, and quantity-driven cost impact synchronized before procurement and construction execution
- Core operator questions answered:
  - Which model packages or zones currently show clash, error, or missing-information issues?
  - Which specification gaps or coordination conflicts are creating downstream cost risk?
  - What is the current trade-level cost signal extracted from the model?
  - Which AI-generated value-engineering or coordination suggestions need PMO review?
- Agent or automation role:
  - design and BIM agents should surface clash detection, spec mismatches, quantity-to-cost deltas, and value-engineering recommendations for PMO action

## 4. Current State and Gap

- Current state:
  - the route exists and follows approved module naming
  - `app/(platform)/design/page.tsx` still renders `GenericModulePage` with `moduleId="design"`
  - the current UI is limited to generic section cards for the four design module themes and shared top-level actions
- Gap to target:
  - the module does not yet provide a dedicated BIM-cost coordination workbench
  - there is no model/package selector, clash viewer, design-health detail panel, trade cost breakdown, or design-agent suggestion feed
  - module-specific mock data and a dedicated `components/modules/design/` implementation do not exist yet

## 5. Required UI Composition

- Header or summary row:
  - title: `Project Design Management`
  - subtitle: `Real-time BIM-Cost Synchronization`
  - status badge should communicate overall model-sync or design-health state
  - actions should stay consistent with current app language, for example `Audit Logs` and `Initiate Agent`
- KPI or overview grid:
  - recommended metrics:
    - model packages in sync
    - open clash/error/missing issues
    - forecast cost delta from BIM quantities
    - pending value-engineering recommendations
- Primary working panel:
  - `BIM-Cost Coordination Workbench`
  - a dominant work surface should combine package or zone selection, a mock BIM coordination canvas, and an issue matrix for clash, error, missing, and specification mismatch signals
  - this panel should embody the reference module sections:
    - `Intelligent BIM Consistency`
    - `Digital Specification Management`
    - `Real-Time Cost Estimation`
    - `Design Health Monitoring`
- Secondary insight, log, or action panel:
  - `Selected Design Issue` panel showing issue severity, impacted trade, affected area, specification reference, and recommended next action
  - `Trade Cost Extractor` panel showing cost breakdown signals such as steel, MEP, facade, or other major packages derived from model quantities
  - `Design Agent Suggestions` or coordination-log feed for value-engineering recommendations and sync exceptions
  - a dark emphasis panel is allowed for high-pressure coordination or cost-risk analysis when stronger analytical contrast is justified

## 6. Data and Code Ownership

- Route file:
  - keep `app/(platform)/design/page.tsx` thin and route to a dedicated page component once the module moves beyond the generic placeholder
- Page component:
  - target file: `components/modules/design/design-page.tsx`
- Mock data:
  - target file: `lib/mock-data/design.ts`
  - keep `lib/mock-data/modules.ts` only for lightweight module metadata, not full design page content
- Types:
  - add design-specific types to `lib/types.ts` only if existing generic primitives are insufficient
  - reflect any new shared data shape in `coding-doc/data-contract.md`
- Shared UI dependencies:
  - reuse shared `Card`, `Badge`, `Button`, `IconButton`, and `ProgressBar`
  - preserve shared shell spacing, table density, and approved dark-panel semantics
  - keep any BIM-viewer mock surface inside the existing card and shell system rather than creating a full-screen detached experience

## 7. Interaction Notes

- Primary user actions:
  - switch model package or zone
  - inspect a clash, error, or missing-information issue
  - review trade-level cost impact
  - assess or escalate a design-agent recommendation
  - open coordination or audit logs
- Selection or drill-down behavior:
  - selecting a package, zone, or issue should update the supporting detail panel in place instead of navigating away immediately
  - if later needed, same-route secondary views for logs or cost scenarios are allowed, but the base route should remain the main coordination workbench
- Empty or fallback behavior:
  - if BIM extraction, issue data, or cost sync data is incomplete, show a safe placeholder state inside the workbench instead of breaking the route
  - if a richer viewer surface is not available yet, degrade to a static coordination canvas or diagram inside the card
- Responsive notes:
  - desktop remains the current delivery priority
  - on narrower widths, keep the active issue detail and cost summary close to the top while tertiary logs can move below the primary work surface

## 8. Do Not Drift

- Preserve:
  - the current white-theme executive command-center shell
  - approved PMO naming, especially `Design (BIM-Cost)` and `Project Design Management`
  - shared card, badge, button, progress, and table semantics
  - a dense operational workbench-first layout instead of a showcase-first layout
- Avoid:
  - leaving the route as a permanent generic four-card page
  - turning the module into a full-screen 3D demo that breaks the shared shell
  - inventing a new visualization language unrelated to the approved prototype
  - pulling scope from `reference-doc/PENDING/**`

## 9. Implementation Tasks

- [ ] Create `components/modules/design/design-page.tsx` with a design-specific summary row, KPI ribbon, BIM-cost workbench, and detail/log panels.
- [ ] Create `lib/mock-data/design.ts` for model packages, design-health issues, trade cost signals, and design-agent recommendations.
- [ ] Rewire `app/(platform)/design/page.tsx` to a dedicated design page component instead of `GenericModulePage`.
- [ ] Update `lib/types.ts` and `coding-doc/data-contract.md` if design-specific records need shared typing.
- [ ] Run a visual consistency pass against the shared shell and approved prototype language.

## 10. Acceptance Checks

- [ ] `/design` renders a design-specific page, not only the generic module template.
- [ ] The page includes a summary/header, KPI overview, primary BIM-cost workbench, and secondary detail or log panel.
- [ ] The active package, zone, or issue selection is clear and updates supporting detail in place.
- [ ] Design labels and section language remain aligned with approved source wording.
- [ ] Data is stored in typed mock-data files outside the route file.
- [ ] Empty or reduced-detail BIM states fail safely without breaking the page shell.
- [ ] The page remains visually consistent with the existing Jarvis shell on desktop.

## 11. Documentation Sync

- Update this file when:
  - design page blocks, workflow, or data semantics change
  - the current implementation status changes from `placeholder` to `partial` or `rich`
- Also update:
  - `coding-doc/data-contract.md` when shared types change
  - `coding-doc/acceptance-criteria.md` or `coding-doc/test-strategy.md` if design gets route-specific QA requirements or viewer-specific fallback rules
