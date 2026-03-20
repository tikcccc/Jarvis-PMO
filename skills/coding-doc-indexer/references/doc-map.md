# Coding Doc Map

Use this map to choose which `coding-doc/` files to load based on the request.

## Core Files

- `coding-doc/coding-architect.md`: architecture, route scope, module inventory, stack, file structure.
- `coding-doc/coding-rules.md`: coding rules, source governance, quality gates, doc-sync expectations.
- `coding-doc/coding-plan.md`: implementation phases, migration order, delivery plan.
- `coding-doc/ui-consistency.md`: shell, spacing, shared visual language, allowed and forbidden UI drift.
- `coding-doc/animation-architecture.md`: motion stack, animation-library selection, motion budgets, and reduced-motion rules.
- `coding-doc/api-spec.md`: repository-style access seams and optional future route handlers.
- `coding-doc/data-contract.md`: shared type contracts and data ownership rules.
- `coding-doc/acceptance-criteria.md`: product structure, behavioral expectations, delivery constraints.
- `coding-doc/test-strategy.md`: smoke checks, visual regression focus, route coverage.

## Module Docs

- `coding-doc/modules/_template.md`: template for new module docs.
- `coding-doc/modules/<module>.md`: module-specific guidance and current-state record.

Load a module doc first when the request is about a named PMO module such as:

- `portfolio`
- `requirements`
- `milestones`
- `approvals`
- `procurement`
- `design`
- `finance`
- `payment`
- `progress`
- `quality`
- `safety`
- `handover`

## Intent to File Routing

- If asked about architecture, routes, or stack:
  - `coding-doc/coding-architect.md`
  - `coding-doc/animation-architecture.md` when motion or transition behavior is involved
  - `coding-doc/coding-plan.md` if implementation order is also asked

- If asked about coding rules, code-review baseline, or source governance:
  - `coding-doc/coding-rules.md`
  - `coding-doc/ui-consistency.md` when frontend behavior is involved
  - `coding-doc/animation-architecture.md` when frontend behavior includes motion or library choice

- If asked "what docs should I read for this module":
  - `coding-doc/modules/<module>.md` if it exists
  - `coding-doc/coding-architect.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md`
  - `coding-doc/data-contract.md` only if the question touches data shape or mock-data typing

- If asked about API seams or payloads:
  - `coding-doc/api-spec.md`
  - `coding-doc/data-contract.md`

- If asked about done criteria, coverage, or QA:
  - `coding-doc/acceptance-criteria.md`
  - `coding-doc/test-strategy.md`

- If the user asks a broad question like "how should we build this module/project":
  - start with:
    - `coding-doc/coding-architect.md`
    - `coding-doc/coding-plan.md`
    - `coding-doc/coding-rules.md`
    - `coding-doc/ui-consistency.md`
  - then add module docs or API/data docs only if needed

## Fallback

- If `coding-doc/modules/<module>.md` is missing, report that gap and fall back to:
  - `coding-doc/modules/_template.md`
  - `coding-doc/coding-architect.md`
  - `coding-doc/ui-consistency.md`
- If files conflict, cite both and ask for the source-of-truth decision only when the conflict changes implementation behavior.
