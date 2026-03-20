---
name: front-end-motion
description: Add or refine Jarvis PMO motion without shell drift by using the shared motion layer first, Motion for React for spatial/layout transitions, and GSAP or Lottie only for approved advanced cases. Use for animation architecture, motion-library selection, latency-masking transitions, table/detail handoffs, AI-panel ambient motion, and reduced-motion-safe interaction polish.
---

# Front End Motion

Use this skill when the task is to introduce or refine motion in Jarvis PMO without turning the product into a marketing-style experience.

## Workflow

1. Load these sources first:
   - `coding-doc/animation-architecture.md`
   - `coding-doc/coding-architect.md`
   - `coding-doc/ui-consistency.md`
   - `coding-doc/acceptance-criteria.md`
   - `coding-doc/modules/<module>.md` when the work is module-specific
   - `reference-doc/IN/**/prototype.html`
   - `reference-doc/IN/**/gemeni_chat.md`
2. Classify the motion request before editing:
   - micro interaction
   - spatial or layout transition
   - analytical timeline or SVG sequence
   - designer-authored loop asset
3. Choose the smallest fitting layer:
   - shared CSS motion layer in `styles/jarvis-ui/motion.css`
   - Motion for React when layout or presence animation is required
   - GSAP only for timeline-heavy orchestration
   - Lottie only for approved JSON assets
4. Define the motion job in plain language:
   - mask loading latency
   - guide visual focus
   - explain spatial hierarchy
5. Keep the motion budget small:
   - one primary moving focal surface
   - one optional secondary support animation
   - no decorative shell theatrics
6. Validate reduced-motion behavior and desktop readability before finishing.

## Core Rules

- The persistent shell is stable, not theatrical.
- CSS-first is the default. Add runtime animation libraries only when the interaction truly needs them.
- Prefer Motion for React (`motion/react`) for new React layout animation work rather than treating legacy `framer-motion` naming as the architecture baseline.
- Use GSAP only when precise timeline control or SVG sequencing is the actual requirement.
- Use Lottie only for contained branded or AI loops that are supplied as assets.
- Do not animate every anomaly at once. Highlight the most decisive issue only.
- If a module already has a defined primary focal zone, motion must reinforce that reading path instead of competing with it.

## Implementation Rules

- Keep shared motion tokens and keyframes in `styles/jarvis-ui/motion.css`.
- Keep route files thin; isolate runtime animation into client components.
- Reuse shared timing and easing presets instead of inlining unrelated values across components.
- Treat tables carefully. If the interaction needs smooth row reordering, do not assume native `<table>` layout animation is the long-term implementation surface.
- For Procurement, default to:
  - CSS for button, chip, and row emphasis
  - Motion for React for detail-panel handoffs
  - GSAP only for staged AI-risk sequences
- For the floating Jarvis agent or dark AI panels, prefer a subtle ambient loop over flashy pulsing.

## Coordination

- Use this skill before `skills/front-end-ui/SKILL.md` when motion behavior is the main problem.
- Use this skill after `skills/module-visual-composition/SKILL.md` when a module needs motion that reinforces a stronger reading path.
- Use `skills/doc-sync-governor/SKILL.md` after changing motion guidance in `coding-doc/`.

## Resources

- `coding-doc/animation-architecture.md`
- `coding-doc/coding-architect.md`
- `coding-doc/ui-consistency.md`
- `coding-doc/acceptance-criteria.md`
- `skills/module-visual-composition/SKILL.md`
- `skills/front-end-ui/SKILL.md`
- `references/motion-checklist.md`
