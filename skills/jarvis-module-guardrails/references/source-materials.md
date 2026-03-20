# Source Materials

## Active Input Priority

Use project sources in this order:

1. `reference-doc/IN/**/prototype.html`
   - primary visual, structural, and interaction source
2. `reference-doc/IN/**/gemeni_chat.md`
   - module naming, scope, and feature intent
3. `coding-doc/coding-architect.md`
   - architecture and route scope
4. `coding-doc/coding-rules.md`
   - implementation guardrails
5. `coding-doc/ui-consistency.md`
   - UI constraints and page anatomy
6. `coding-doc/acceptance-criteria.md`
   - delivery expectations
7. current implementation in `app/`, `components/`, and `lib/mock-data/`
   - current status reference, not automatic source of truth when drift exists
8. `reference-doc/OUT/**`
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
- current implementation status
- target page composition
- data and component ownership
- module acceptance checks
- documentation sync notes

## Conflict Rule

If two sources conflict:

- `prototype.html` and `gemeni_chat.md` win for module naming, intent, and baseline scope
- `coding-doc/*.md` wins for app architecture, code structure, and shared implementation rules
- current code reflects status, not authority, when it has drifted
