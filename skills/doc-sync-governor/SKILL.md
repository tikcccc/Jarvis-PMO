---
name: doc-sync-governor
description: Validate and repair consistency across Jarvis PMO docs in `coding-doc/`, including module docs under `coding-doc/modules/`. Use after feature changes, module doc edits, API/data updates, or before implementation and release to prevent documentation drift.
---

# Doc Sync Governor

Use this skill to detect and fix drift across the Jarvis PMO documentation set.

## Workflow

1. Confirm `coding-doc/` exists.
2. Run the sync checker:
   - `python3 skills/doc-sync-governor/scripts/check_doc_sync.py coding-doc --json coding-doc/.doc-sync-report.json`
3. Review issues by severity:
   - `error`: fix in the same pass
   - `warn`: fix now or explicitly leave as known backlog
4. If module behavior changed, verify the corresponding module doc under `coding-doc/modules/` was updated in the same pass.
5. Apply patches to the affected docs.
6. Re-run the checker until no `error` remains.
7. Summarize:
   - what drift was found
   - what was fixed
   - what remains as warning-level backlog

## What To Check First

- Core architecture and rules:
  - `coding-doc/coding-architect.md`
  - `coding-doc/coding-rules.md`
  - `coding-doc/coding-plan.md`
  - `coding-doc/ui-consistency.md`
- API and schema:
  - `coding-doc/api-spec.md`
  - `coding-doc/data-contract.md`
- Delivery and QA:
  - `coding-doc/acceptance-criteria.md`
  - `coding-doc/test-strategy.md`
- Module docs:
  - `coding-doc/modules/*.md`

## Fix Policy

- Keep one source of truth per concern:
  - architecture and route scope in `coding-architect.md`
  - implementation rules in `coding-rules.md`
  - API seams in `api-spec.md`
  - shared types in `data-contract.md`
  - done criteria in `acceptance-criteria.md`
  - QA approach in `test-strategy.md`
  - module-specific current state and implementation guardrails in `coding-doc/modules/<module>.md`
- If code changes a module's behavior, update both code and the module doc in the same pass.
- If two docs conflict, update both or explicitly document precedence in both.

## Resources

- `references/sync-rules.md`
- `scripts/check_doc_sync.py`
