# Requirements

## 1. Module Identity

- Route: `/requirements`
- Module id: `Requirements`
- UI label: `Requirements`
- Current implementation status: `rich`

## 2. Approved Source Inputs

- Visual source: `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
- Module PRD source: `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/02-requirements.md`
- Scope and naming source: `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Supporting coding docs: `coding-doc/coding-architect.md`, `coding-doc/coding-plan.md`, `coding-doc/coding-rules.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/data-contract.md`, `coding-doc/test-strategy.md`
- Current implementation references: `app/(platform)/requirements/page.tsx`, `components/modules/requirements/requirements-page.tsx`, `lib/mock-data/requirements.ts`, `lib/types.ts`

## 3. Business Intent

- Purpose: provide a one-screen SSOT workspace for the nine requirement elements that govern project scope, assumptions, constraints, standards, and handover information quality.
- Core operator questions answered: which requirement baselines are healthy, where cross-module drift exists, what evidence supports the current baseline, and which agent or compliance routines still need review.
- Agent or automation role: Recording Agents capture baseline data from source artifacts, monitor deltas, run cross-checks, and surface drift or compliance review queues before downstream modules diverge.

## 4. Current State and Gap

- Current state: the route now supports overview and element-level dossier drill-down for all nine requirement elements, including governance metadata, automation routines, validation checks, evidence packs, linkages, and audit history.
- Gap to target: the page still uses typed mock data rather than live ingestion, and the `Open Raw JSON Record` / `Audit Logs` actions remain presentation-only.

## 5. Required UI Composition

- Page archetype and why it fits: comparison/risk-first workbench with dossier drill-down, because operators need fast cross-element scan plus evidence-backed detail when drift appears.
- Header or summary row: dark SSOT baseline band showing integrity, drift, review load, cross-check domain count, and live agent routine count.
- KPI or overview strategy: compact executive strip plus a dedicated `Global Drift Radar` row before the 9-element gene-bank grid/table.
- Primary focal zone: `Digital Gene Bank (9 Key Elements)` cards or list with drill-down entry into an element dossier.
- Secondary support zone: `Global Drift Radar` row surfacing the highest-priority cross-module propagation records.
- Same-route alternate view, if justified: `Map` and `List` views for the element register.
- Chart surfaces, if justified: none currently; queue, evidence, governance, and validation patterns answer the operator questions more directly than charts.

## 6. Data and Code Ownership

- Route file: `app/(platform)/requirements/page.tsx`
- Page component: `components/modules/requirements/requirements-page.tsx`
- Mock data: `lib/mock-data/requirements.ts`
- Types: `lib/types.ts`
- Shared UI dependencies: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/progress-bar.tsx`

## 7. Interaction Notes

- Primary user actions: switch between `Map` and `List`, open a requirement dossier, inspect drift radar, and review evidence / automation / validation surfaces.
- Selection or drill-down behavior: clicking an element card, list row, or radar card opens the dossier view for that element in-place.
- Chart drill-down, legend, or filter behavior: not applicable for the current implementation.
- Empty or fallback behavior: if no radar records are active, the route shows a calm empty state rather than leaving a blank panel.
- Responsive notes: desktop-first delivery; current layout keeps dense operational content and uses stacked cards on narrower widths without changing shell behavior.

## 8. Do Not Drift

- Preserve: approved route name, the 9-element SSOT framing, white executive command-center shell, compact operational density, badge semantics, and evidence/audit language rooted in the prototype.
- Avoid: generic marketing-style hero layouts, unrelated chart additions, moving shell chrome, or collapsing this module into the same formula as finance/procurement when the operator task is evidence and baseline governance.

## 9. Implementation Tasks

- [x] Map all nine requirement elements to richer typed mock data that reflects the PRD field structure.
- [x] Surface agent automation, cross-check validation, governance metadata, evidence, and audit history inside the dossier view.
- [x] Keep the overview anchored to SSOT integrity, drift radar, and gene-bank scan patterns rather than adding unnecessary charts.

## 10. Acceptance Checks

- [x] `/requirements` renders nine requirement elements and keeps route/module naming aligned with the approved references.
- [x] Each element dossier exposes captured fields, governance metadata, automation routines, validation checks, evidence, linkages, and audit history.
- [x] The overview highlights integrity, drift, review load, cross-check coverage, and the highest-priority propagation signals without shell drift.

## 11. Documentation Sync

- Update this file when: dossier sections, overview composition, drill-down behavior, or typed requirement record fields change.
- Update chart surfaces, chart roles, or visualization rules here when they change.
- Also update: `coding-doc/data-contract.md`, `coding-doc/acceptance-criteria.md`, `coding-doc/test-strategy.md`
