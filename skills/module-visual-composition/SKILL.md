---
name: module-visual-composition
description: Shape Jarvis PMO module pages so each module has a distinct reading path, typography hierarchy, and visual emphasis while preserving the shared shell, tokens, and component semantics. Use when a module feels visually flat, lacks a clear focal area, needs stronger attention hierarchy, or should differ from other modules without drifting from the approved white-theme command-center language.
---

# Module Visual Composition

Use this skill when the work is not a shell redesign, but the module still needs stronger page composition than the default shared layout patterns provide.

## Workflow

1. Load these files first:
   - `coding-doc/ui-consistency.md`
   - `coding-doc/acceptance-criteria.md`
   - `coding-doc/modules/<module>.md` when working on a specific module
   - `reference-doc/IN/**/prototype.html` for the approved shell and component language
2. Decide the module archetype before editing:
   - comparison and risk
   - queue and casework
   - timeline and dependency
   - map and asset context
   - live operations and alerts
   - finance and scenario analysis
3. Define the reading path:
   - one primary focal zone
   - one secondary support zone
   - all remaining sections as tertiary context
4. Choose no more than 2 to 4 emphasis levers for the page:
   - scale
   - contrast
   - density
   - spacing
   - dark emphasis surface
   - accent color concentration
5. Adjust typography by role, not just by size:
   - lead metric
   - section lead
   - evidence/detail copy
   - alert copy
   - dense table labels
6. Re-check the module against the shared shell and mobile stacking behavior before finishing.

## Core Rules

- Consistency is required at the shell and primitive level, not at the module layout level.
- Do not redesign the sidebar, topbar, global spacing container, or shared status semantics unless explicitly asked.
- Do not make every module use the same `KPI row + large card + side card + log` rhythm by default.
- Each module should make its main task obvious within the first 2 seconds of scanning.
- If everything looks equally loud, the page has no focal hierarchy.
- If every module shares the same focal hierarchy, the product loses module identity.

## Module Composition Guidance

- `Finance`
  - lead with numbers, trend contrast, and scenario surfaces
- `Approvals`
  - lead with workflow queue and selected case detail
- `Procurement`
  - lead with bidder comparison and risk interpretation
- `Milestones`
  - lead with sequence, milestones, and downstream impact
- `Portfolio`
  - lead with geography and selected asset context
- `Progress`, `Quality`, `Safety`
  - lead with live signals, anomalies, and operator response

## Attention Rules

- Prefer one visually dominant block over many equally weighted cards.
- Reserve dark panels for analytical pressure, simulation, risk, or live intelligence.
- Use compact support cards when the main interaction already carries the story.
- KPI cards should not all have equal emphasis if one metric is operationally decisive.
- Tables should read as a working surface, not as a passive appendix.

## Typography Rules

- Keep app chrome neutral and stable.
- Module titles can vary in emphasis, spacing, and supporting copy density without changing the app-wide font family.
- Use stronger contrast for lead numbers and decision labels.
- Use calmer, tighter typography for evidence, table metadata, and logs.
- Avoid introducing new font families unless the repository explicitly approves that change.

## Coordination

- Use this skill together with `skills/front-end-ui/SKILL.md` when code changes must preserve the shell and shared UI primitives.
- Use this skill before `front-end-ui` when the main problem is weak module hierarchy rather than missing shell parity.

## Resources

- `coding-doc/ui-consistency.md`
- `coding-doc/acceptance-criteria.md`
- `coding-doc/modules/*.md`
- `skills/front-end-ui/SKILL.md`
