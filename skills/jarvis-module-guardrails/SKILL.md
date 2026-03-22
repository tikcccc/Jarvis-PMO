---
name: jarvis-module-guardrails
description: Create and maintain Jarvis PMO module guardrails without drifting from `reference-doc/IN/**/prototype.html`, `reference-doc/IN/**/gemeni_chat.md`, the shared frontend UI, or `coding-doc/`. Use when implementing a PMO module, generating `coding-doc/modules/*.md`, or syncing module docs after code changes.
---

# Jarvis Module Guardrails

Use this skill when work touches one or more PMO modules and the agent needs module-specific instructions rooted in approved project sources.

## Workflow

1. Identify the active module and the active input set under `reference-doc/IN/`.
   - Prefer the latest dated folder unless the user points to another one.
2. Load these project docs first:
   - `coding-doc/coding-architect.md`
   - `coding-doc/coding-plan.md`
   - `coding-doc/coding-rules.md`
   - `coding-doc/ui-consistency.md`
   - `coding-doc/acceptance-criteria.md`
3. Treat `reference-doc/IN/**/prototype.html` as the primary visual and structural source.
4. Treat `reference-doc/IN/**/gemeni_chat.md` as the primary scope and module-intent source.
5. Ignore `reference-doc/PENDING/**` unless the user explicitly confirms approval.
6. Load the module doc at `coding-doc/modules/<module>.md`.
   - If it does not exist yet, start from `coding-doc/modules/_template.md`.
7. Decide the module archetype and reading path before editing code.
   - For example: queue/casework, comparison/risk, timeline/dependency, map/context, live operations, finance/scenario, or coordination/canvas.
   - Record whether summary signals should be a top KPI band, compact ribbon, inline strip, or embedded inside the main surface.
8. Load the module's current route, component, mock-data, and shared UI dependencies before editing code.
9. If the reference prototype only provides a generic page for that module, expand from the documented module intent and existing shared patterns instead of redesigning the shell.
10. When code changes affect module behavior, layout blocks, mock-data fields, or acceptance expectations, update in the same pass:
   - `coding-doc/modules/<module>.md`
   - any relevant `coding-doc/*.md`
   - module code and `lib/mock-data/*`
11. Validate the module against the module checklist before finishing.

## Implementation Rules

- Keep route files thin and place rich interactions in `components/modules/<module>/`.
- Reuse the existing shell, tokens, cards, badges, tables, and progress semantics before adding new primitives.
- Prefer typed mock data files over large inline arrays in page components.
- Record concrete source references inside module docs so later edits stay anchored.
- If current code is only a generic placeholder, document that as current state before describing the target module UI.
- Do not turn every module into the same `top KPI + main workbench + right side panel` composition.
- Similar layouts are acceptable only when the module task genuinely matches an existing workflow pattern.
- Use this skill together with `skills/front-end-ui/SKILL.md` when making frontend changes.

## Resources

- `references/source-materials.md`
- `references/module-doc-template.md`
- `references/module-checklist.md`
- `coding-doc/modules/_template.md`
- `skills/front-end-ui/SKILL.md`
