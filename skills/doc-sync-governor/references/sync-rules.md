# Doc Sync Rules

Use these rules to keep `coding-doc/` aligned after requirement, UI, route, or schema changes.

## Required Core Files

- `coding-doc/coding-architect.md`
- `coding-doc/coding-rules.md`
- `coding-doc/coding-plan.md`
- `coding-doc/ui-consistency.md`
- `coding-doc/api-spec.md`
- `coding-doc/data-contract.md`
- `coding-doc/acceptance-criteria.md`
- `coding-doc/test-strategy.md`
- `coding-doc/modules/_template.md`

## Cross-Document Consistency Rules

1. Architecture, plan, and acceptance consistency:
   - `coding-doc/coding-architect.md` defines the dashboard plus twelve PMO modules.
   - `coding-doc/coding-plan.md` must remain executable against that module scope.
   - `coding-doc/acceptance-criteria.md` and `coding-doc/test-strategy.md` must still cover the same product structure.

2. Rules and implementation consistency:
   - `coding-doc/coding-rules.md` must continue to enforce source governance, typed mock-data usage, and documentation sync when behavior changes.
   - `coding-doc/ui-consistency.md` must remain aligned with the approved prototype-driven visual language.

3. API and data-contract consistency:
   - repository-style functions in `coding-doc/api-spec.md` should map to shared types in `coding-doc/data-contract.md`
   - when a new shared field or record is introduced, both files must be updated if it changes the stable seam

4. Module doc consistency:
   - module-specific behavior should be captured in `coding-doc/modules/<module>.md`
   - if a module is still only generic or placeholder, the module doc should say so explicitly
   - module docs should separate current state from target state

## Update Policy

- Run sync check after feature or schema changes.
- Fix all `error` issues in the same change.
- Treat `warn` issues as either immediate follow-up or explicit backlog.
- Prefer narrow updates: change only the docs whose truth actually changed.
