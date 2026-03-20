---
name: coding-doc-indexer
description: Route Jarvis PMO `coding-doc/` questions to the right files, including module docs under `coding-doc/modules/`. Use when the user asks which docs apply to a module, architecture, rules, API/data contract, acceptance criteria, test strategy, or when `coding-doc/` needs a refreshed index.
---

# Coding Doc Indexer

Use this skill to turn broad documentation questions into targeted file reads for this repository.

## Workflow

1. Confirm `coding-doc/` exists in the current project root.
2. Build or refresh the doc index:
   - `python3 skills/coding-doc-indexer/scripts/index_coding_docs.py coding-doc --output coding-doc/.doc-index.json`
3. Read `references/doc-map.md` and route the request by intent.
4. For module-specific questions:
   - load `coding-doc/modules/<module>.md` first if it exists
   - if it does not exist, load `coding-doc/modules/_template.md` and report that the module doc is missing
   - then load only the supporting core docs needed for that module question
5. For broad project questions, start from:
   - `coding-doc/coding-architect.md`
   - `coding-doc/coding-plan.md`
   - `coding-doc/coding-rules.md`
   - `coding-doc/ui-consistency.md`
6. Keep reads narrow after the first routing step; do not bulk-load the whole doc set unless the request is explicitly broad.
7. Answer with file-backed conclusions and cite concrete paths when useful.
8. If docs conflict, cite both files and state which one appears intended as source of truth.

## Routing Rules

- Architecture or stack questions:
  - `coding-doc/coding-architect.md`
  - `coding-doc/coding-plan.md` when timeline or delivery scope is also relevant
- Implementation rules or review baseline:
  - `coding-doc/coding-rules.md`
  - `coding-doc/ui-consistency.md` for UI-sensitive work
- Module-specific implementation or scope:
  - `coding-doc/modules/<module>.md`
  - `coding-doc/coding-architect.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md` when done criteria are asked
- API or payload semantics:
  - `coding-doc/api-spec.md`
  - `coding-doc/data-contract.md`
- Quality readiness:
  - `coding-doc/acceptance-criteria.md`
  - `coding-doc/test-strategy.md`

## Resources

- `references/doc-map.md`
- `scripts/index_coding_docs.py`
