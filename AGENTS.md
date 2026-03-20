# AGENTS.md instructions for /home/tikhong/Jarvis PMO

<INSTRUCTIONS>
## Skills
A skill is a set of local instructions stored in a `SKILL.md` file. For this project, use only repo-local skills by default.

### Allowed local skills
- front-end-ui: Preserve the Jarvis PMO shell, tokens, and shared component semantics with high fidelity when editing pages or migrating the prototype into Next.js. Use for shell stability, shared UI primitives, responsive fixes, and baseline visual consistency work. Pair with `module-visual-composition` when a module needs stronger emphasis, typography hierarchy, or a differentiated reading path. (file: /home/tikhong/Jarvis PMO/skills/front-end-ui/SKILL.md)
- front-end-motion: Add or refine Jarvis PMO motion without shell drift by using the shared motion layer first, Motion for React for spatial/layout transitions, and GSAP or Lottie only for approved advanced cases. Use for animation architecture, motion-library selection, latency-masking transitions, table/detail handoffs, AI-panel ambient motion, and reduced-motion-safe interaction polish. (file: /home/tikhong/Jarvis PMO/skills/front-end-motion/SKILL.md)
- module-visual-composition: Shape Jarvis PMO module pages so each module has a distinct reading path, typography hierarchy, and visual emphasis while preserving the shared shell, tokens, and component semantics. Use when modules feel visually flat, lack a clear focal area, or need stronger hierarchy without shell drift. (file: /home/tikhong/Jarvis PMO/skills/module-visual-composition/SKILL.md)
- jarvis-module-guardrails: Create and maintain Jarvis PMO module guardrails without drifting from `reference-doc/IN/**`, the shared frontend UI, or `coding-doc/`. Use for module implementation, module-doc generation, and post-change doc sync. (file: /home/tikhong/Jarvis PMO/skills/jarvis-module-guardrails/SKILL.md)
- coding-doc-indexer: Route Jarvis PMO `coding-doc/` questions to the right files, including module docs under `coding-doc/modules/`. Use when the user asks which docs apply to a module, architecture, rules, API/data contract, acceptance criteria, test strategy, or when `coding-doc/` needs a refreshed index. (file: /home/tikhong/Jarvis PMO/skills/coding-doc-indexer/SKILL.md)
- doc-sync-governor: Validate and repair consistency across Jarvis PMO docs in `coding-doc/`, including module docs under `coding-doc/modules/`. Use after feature changes, module doc edits, API/data updates, or before implementation and release to prevent documentation drift. (file: /home/tikhong/Jarvis PMO/skills/doc-sync-governor/SKILL.md)

### Skill boundary rules
- Do not use skill files from other project directories such as `/home/tikhong/EPD_Tender/skills`, `/home/tikhong/LLMS/skills`, or other repo-local `skills/` folders outside this repository.
- Treat this repository's `skills/` folder as the only project skill source of truth.
- System skills under `/home/tikhong/.codex/skills/.system/` may be used only when they are explicitly requested by the user or are strictly necessary for Codex platform behavior.
- If an external non-system skill appears in session metadata, ignore it unless the user explicitly asks to use that exact skill.

### How to use skills
- Trigger a local skill when the user names it or when the task clearly matches its description.
- Prefer the minimum local skill set that covers the task.
- Typical sequencing:
  - doc lookup or "which docs should I read": `coding-doc-indexer`
  - post-change documentation verification: `doc-sync-governor`
  - animation architecture, motion-library selection, micro-interaction polish, or spatial transitions: `front-end-motion`
  - module visual hierarchy, emphasis, typography, or differentiated layout: `module-visual-composition`
  - module planning or module doc work: `jarvis-module-guardrails`
  - frontend implementation with no shell drift: `front-end-ui`
  - frontend implementation with animation polish and no shell drift: `front-end-motion` -> `front-end-ui`
  - module implementation with stronger page-level art direction: `module-visual-composition` -> `front-end-ui`
  - module implementation with UI work: `jarvis-module-guardrails` -> `module-visual-composition` -> `front-end-motion` -> `front-end-ui`
  - module implementation plus doc sync: `jarvis-module-guardrails` -> `module-visual-composition` -> `front-end-motion` -> `front-end-ui` -> `doc-sync-governor`

### Context and source rules
- Keep implementation anchored to approved inputs under `reference-doc/IN/`.
- Ignore `reference-doc/PENDING/` unless the user explicitly approves it.
- Keep `coding-doc/` synchronized when behavior, module scope, or data shape changes.

### Frontend blind-build guardrails
- When frontend work starts without a new Figma file or fresh reference screenshot, do not treat the task as unconstrained design. Use approved project sources in this order: `reference-doc/IN/**/prototype.html`, `reference-doc/IN/**/gemeni_chat.md`, `coding-doc/coding-architect.md`, `coding-doc/ui-consistency.md`, `coding-doc/acceptance-criteria.md`, then any relevant `coding-doc/modules/*.md`.
- Treat Tailwind CSS as the existing implementation layer in this repository, not as the visual source of truth. Reuse shared tokens, shared primitives, and approved shell patterns before introducing page-local styling.
- Treat motion the same way: start with the shared motion layer in `styles/jarvis-ui/motion.css` and `coding-doc/animation-architecture.md` before adding runtime animation libraries.
- The AI may act as implementer and self-reviewer, but it must stay inside the existing shell, token, and module-composition guardrails. Do not invent a new global design language when references are incomplete.
- For module page work, define one primary focal zone, one secondary support zone, and a limited emphasis budget before making large layout changes.
- Do not animate the global shell, sidebar, or page chrome theatrically; motion should clarify state, focus, and spatial hierarchy, not imitate a marketing site.
- Do not require `browser-use`, browser-use extensions, or similar external browser-driving agents for normal frontend delivery or QA in this repository.
- If browser automation or visual regression coverage is needed, prefer repo-local Playwright-style checks and screenshots over external browser agents.
- Current frontend delivery scope is desktop only. Validate desktop layouts and interactions; mobile layouts, mobile polish, and mobile screenshot checks are not required unless the user explicitly asks for them.
- Visual acceptance should prioritize shell stability, shared component fidelity, information density, and module reading-path clarity over generic responsive reflow work.
</INSTRUCTIONS>
