# Front End Motion Checklist

Use this checklist before shipping motion work in Jarvis PMO.

## 1. Confirm Inputs

- approved reference comes from `reference-doc/IN/**`
- module intent comes from `coding-doc/modules/<module>.md` when relevant
- motion rules come from `coding-doc/animation-architecture.md`

## 2. Define the Motion Job

Pick one primary purpose:

- mask latency
- guide focus
- explain spatial hierarchy

If the motion has no operational purpose, cut it.

## 3. Choose the Correct Layer

- shared CSS motion layer:
  - hover, focus, fade, slide, dropdown, toast, skeleton, subtle ambient glow
- Motion for React:
  - presence, layout, reorder, detail swap, module handoff
- GSAP:
  - staged AI scan, SVG drawing, timeline-heavy orchestration
- Lottie:
  - approved JSON micro loop

## 4. Respect Jarvis Guardrails

- do not animate the whole shell
- keep the page readable under dense data
- keep dark-panel motion subtle
- avoid multiple competing loops in one viewport

## 5. Table Warning

- if the request needs true row reordering, do not force the solution into native table layout animation
- prefer an ARIA grid or motion-enabled list surface when spatial continuity matters

## 6. Accessibility

- verify `prefers-reduced-motion`
- replace large travel with opacity-only or instant change when reduced motion is enabled
- make sure motion never hides loading, warning, or error state

## 7. QA

- check shell stability
- check focal hierarchy improvement
- check animation does not block selection or scroll
- check runtime cost on dense module views
