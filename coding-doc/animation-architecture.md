# Jarvis PMO Frontend Motion Architecture

## 1. Objective

Jarvis PMO uses animation for three enterprise-grade jobs only:

- mask data-loading latency without hiding system state
- guide visual focus to anomalies, selections, and operationally decisive changes
- explain spatial hierarchy between workbench, detail panel, and supporting context

Motion is not decorative chrome. The product should feel controlled, analytical, and calm under dense information load.

## 2. Source Alignment

- Visual shell baseline:
  - `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
- Scope and module intent:
  - `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
- Shared frontend rules:
  - `coding-doc/coding-architect.md`
  - `coding-doc/ui-consistency.md`
  - `coding-doc/acceptance-criteria.md`

The current prototype already uses lightweight entry motion such as `animate-in fade-in`. Extend that baseline instead of replacing it with a new animation language.

## 3. Motion Principles

- Shell stability comes first. Sidebar, topbar, and page container should remain visually steady.
- Use motion to confirm cause and effect, not to add spectacle.
- Favor opacity and short-distance translation over large travel.
- Keep analytical dark panels calmer than marketing hero sections.
- Let motion reinforce the module reading path defined by `module-visual-composition`.
- When motion is continuous, it must be low amplitude and limited to one focal surface per view.

## 4. Layered Motion Stack

### 4.1 Foundation Layer: Shared CSS Motion

Use the shared motion layer first:

- `styles/jarvis-ui/motion.css`
- existing Tailwind transition utilities
- optional route-local CSS only when a shared token is insufficient

This layer owns:

- page or panel entry fades
- hover and pressed states
- dropdown, tooltip, and toast entry/exit
- loading sheens and low-cost skeleton transitions
- subtle analytical ambient effects such as AI-panel glow

This is the default Jarvis PMO motion layer because it preserves bundle efficiency and keeps motion semantics repo-owned.

### 4.2 Spatial Layer: Motion for React

When a component needs layout-aware or presence-aware transitions, use Motion for React (`motion/react`, formerly known in the ecosystem as Framer Motion).

Use it for:

- module body handoff inside the persistent shell
- card-to-detail or list-to-detail transitions
- package selector, bidder detail, and side-panel swaps
- sortable or filterable comparison surfaces that need spatial continuity
- dialogs, drawers, and overlays that need controlled enter/exit presence

Do not use it for:

- routine hover states already solved by CSS
- entire-shell page theatrics
- ambient loops that can be expressed in CSS

### 4.3 Timeline Layer: GSAP

Use GSAP only when the work is genuinely timeline-heavy or SVG-heavy:

- multi-step AI scan narratives
- synchronized number, progress, and highlight sequences
- path drawing for schedule, finance, or dependency diagrams
- large multi-node orchestration where per-element timing matters

GSAP is an escalation path, not the default animation runtime.

### 4.4 Asset Layer: Lottie

Use Lottie when motion is delivered as an approved JSON asset rather than coded procedurally.

Use it for:

- the floating Jarvis agent button when the team wants a branded breathing or scan loop
- compact AI status loops in a contained surface
- illustration-grade micro animations supplied by design

Do not use it for:

- stateful layout transitions
- sortable data surfaces
- effects that need to react deeply to live component state

## 5. Library Selection Matrix

| Need | Primary choice | Escalate when | Jarvis examples |
| --- | --- | --- | --- |
| Hover, focus, menu, tooltip, toast, entry fade | Shared CSS motion layer | never or very rarely | sidebar controls, filter buttons, audit log rows |
| Panel swap, detail handoff, layout transition, enter/exit presence | Motion for React | if sequencing becomes timeline-heavy | package change, bidder detail swap, module crossfade |
| Complex multi-step story, SVG/path drawing, tightly orchestrated sequence | GSAP | when CSS or Motion becomes awkward | AI risk scan, milestone path reveal, finance simulation playback |
| Designer-authored JSON loop | Lottie | only if animation asset is approved | floating agent pulse, compact AI idle loop |
| Tailwind class ergonomics for simple enter/exit states | optional `tailwindcss-animate` style plugin layer | only if repeated patterns become noisy | utility-style fade/slide classes across many primitives |

For this repository, the foundational choice stays CSS-first even if a Tailwind animation plugin is later added. The plugin is optional ergonomics, not the system backbone.

## 6. Jarvis PMO Module Mapping

### 6.1 Shared Shell

- keep sidebar expand/collapse subtle and fast
- keep header controls to hover, focus, and light state feedback
- avoid full-screen route wipes, long page slides, or parallax

### 6.2 Procurement

- package switching:
  - CSS for chip/button emphasis
  - Motion for React for detail-panel presence and card/list handoff
- bidder anomaly emphasis:
  - CSS tone change and brief emphasis pulse
  - no looping danger animation on every row
- contractual risk panel:
  - CSS ambient glow by default
  - GSAP only if the panel becomes a staged AI scan narrative

### 6.3 Finance

- KPI updates and chart emphasis:
  - CSS or Motion for React
- scenario playback or synchronized stress-test sequence:
  - GSAP when the sequence must be author-controlled

### 6.4 Portfolio and Progress

- map marker and detail-card handoff:
  - CSS or Motion for React
- SVG or path-heavy overlays:
  - GSAP only when path timing matters

### 6.5 Floating Jarvis Agent

- default:
  - CSS pulse or ambient glow
- premium branded state:
  - Lottie with a single contained loop

## 7. Current Adoption Decision for Jarvis PMO

The recommended stack for this repository is:

1. shared CSS motion layer as the baseline
2. Motion for React when the first true spatial/layout transition is needed
3. GSAP only for advanced analytical sequences
4. Lottie only for approved branded micro loops

This preserves the current lightweight prototype while leaving a clean upgrade path for richer procurement, finance, and AI surfaces.

## 8. Motion Budget and Timing

- hover and pressed states:
  - `120ms` to `180ms`
- panel or page-body entry:
  - `180ms` to `240ms`
- layout handoff or module-content crossfade:
  - `220ms` to `320ms`
- ambient analytical loops:
  - `4s` to `8s`

Preferred motion language:

- opacity changes
- `6px` to `16px` translation
- restrained scale only on compact interactive elements
- spring motion only when it feels weighted, not playful

Avoid:

- bouncing KPI cards
- repeated attention-seeking loops across multiple panels
- long route transitions that delay reading

## 9. Implementation Rules

- Put shared motion tokens, keyframes, and reduced-motion fallbacks in `styles/jarvis-ui/motion.css`.
- Keep route files thin; isolate runtime animation logic in client components.
- If Motion for React is adopted, centralize presets under `lib/motion/*` or `components/motion/*` instead of duplicating transition objects.
- Do not animate the persistent `(platform)` shell as a whole.
- Prefer animating module-local surfaces, not the entire viewport.
- Respect semantic HTML. If smooth row reordering becomes important, do not assume native `<table>` rows are the long-term animation surface.
- For reorderable procurement comparisons, prefer a motion-enabled list or ARIA grid surface over forcing complex layout animation into native table flow.

## 10. Accessibility and Performance

- Honor `prefers-reduced-motion` in both CSS and runtime animation libraries.
- When reduced motion is enabled, replace large translation with opacity-only or instant state changes.
- Continuous motion must not obstruct dense reading surfaces.
- Keep idle animation count low, especially on dark analytical panels.
- Validate that motion does not hide loading or error states.

## 11. QA Expectations

Before shipping motion work:

- verify the shell does not drift
- verify reduced-motion behavior
- verify the primary focal zone becomes clearer, not noisier
- verify table density and readability remain intact
- verify animation does not block user input or data refresh
