# Source Materials

## Active Input Priority

Use project sources in this order:

1. `reference-doc/IN/**/prototype.html`
   - primary visual, structural, and interaction source
2. `reference-doc/IN/**/2026.03.JPM.Platform/index.md` plus the matching per-module markdown
   - primary module PRD working copy derived from the approved `2026.03.JPM.Platform.pdf`
   - use for detailed module workflow, agent behavior, data capture, and section semantics
3. `reference-doc/IN/**/gemeni_chat.md`
   - module naming, high-level scope, and feature intent
4. `coding-doc/coding-architect.md`
   - architecture and route scope
5. `coding-doc/coding-rules.md`
   - implementation guardrails
6. `coding-doc/ui-consistency.md`
   - UI constraints and page anatomy
7. `coding-doc/acceptance-criteria.md`
   - delivery expectations
8. current implementation in `app/`, `components/`, and `lib/mock-data/`
   - current status reference, not automatic source of truth when drift exists
9. `reference-doc/OUT/**`
   - comparison material only

## Ignore By Default

- `reference-doc/PENDING/**`

Only use pending files after explicit human approval.

## Module Doc Storage

- template: `coding-doc/modules/_template.md`
- one module doc per route/module id:
  - `coding-doc/modules/procurement.md`
  - `coding-doc/modules/design.md`
  - etc.

Each module doc should capture:

- approved source inputs
- matching split PRD source path when available
- current implementation status
- target page composition
- data and component ownership
- module acceptance checks
- documentation sync notes

## Conflict Rule

If two sources conflict:

- `prototype.html` wins for shell, panel language, and visual structure
- split module PRD markdown and `gemeni_chat.md` win for module naming, intent, and baseline scope
- if split module PRD wording is ambiguous because of extraction noise, verify against the sibling `2026.03.JPM.Platform.pdf`
- `coding-doc/*.md` wins for app architecture, code structure, and shared implementation rules
- current code reflects status, not authority, when it has drifted
