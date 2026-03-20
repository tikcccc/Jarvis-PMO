---
name: front-end-ui
description: Preserve the Jarvis PMO shell, tokens, and shared component semantics with high fidelity when editing pages or migrating the prototype into Next.js. Use for shell stability, shared UI primitives, responsive fixes, and baseline visual consistency work. Pair with `module-visual-composition` when a module needs stronger emphasis, typography hierarchy, or a differentiated reading path.
---

# Front End UI

Use this skill when the task is to extend or refine the Jarvis PMO frontend without drifting from the approved shell and component language.

## Workflow

1. Identify the active reference set under `reference-doc/IN/`.
   - Prefer the latest dated folder unless the user points to another folder.
2. Load these project docs first:
   - `coding-doc/coding-architect.md`
   - `coding-doc/ui-consistency.md`
   - `coding-doc/acceptance-criteria.md`
3. Treat `reference-doc/IN/**/prototype.html` as the strict shell and shared-component visual source.
   - The default behavior is minimal-diff editing for app chrome and shared primitives, not forced sameness across all modules.
4. Use `reference-doc/IN/**/gemeni_chat.md` for module naming, scope, and page intent.
5. Ignore `reference-doc/PENDING/**` unless the user explicitly says those files are approved.
6. Use `reference-doc/OUT/**` only as generated reference material, never as the sole design source.
7. For Next.js work:
   - keep the shared shell stable
   - extract shared UI primitives before adding page-specific changes
   - preserve route/module naming from the reference docs
   - use `skills/module-visual-composition/SKILL.md` when module-level hierarchy or typography direction is part of the task
8. Validate desktop and mobile before finishing.

## Implementation Rules

- Keep the white-theme executive command-center look.
- Preserve shell layout, base spacing, card structure, status colors, and interaction density.
- Use `lucide-react` for icon consistency.
- If there is already a `prototype.html` or migrated page, modify the smallest possible surface area unless the user explicitly asks for a stronger module-level redesign.
- Reuse shared tokens and components instead of duplicating styles across pages.
- Protect shell consistency, but do not force every module into the same visual hierarchy.
- Do not pull design ideas from `PENDING` files by default.

## Recommended Stack

If the frontend stack is being created or extended from scratch, prefer:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shared CSS token files for shell and component stability

## Resources

- `coding-doc/coding-architect.md`
- `coding-doc/ui-consistency.md`
- `coding-doc/acceptance-criteria.md`
- `skills/module-visual-composition/SKILL.md`
- `references/source-materials.md`
- `references/consistency-checklist.md`
