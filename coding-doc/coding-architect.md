# Jarvis PMO Prototype Architecture

## 1. Objective

Build the Jarvis PMO product prototype as a high-fidelity Next.js application that reuses the existing prototype structure instead of redesigning it. The first implementation target is visual and structural parity with the current reference prototype, with only controlled local adjustments.

## 2. Source Priority

Use project sources in this order:

1. `reference-doc/IN/2026-3-20 prototype developement/prototype.html`
   - Primary visual and layout source of truth.
   - Sidebar, header, cards, icons, spacing, page sections, and interaction density must follow this file.
2. `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/index.md` and the matching per-module markdown
   - Primary module PRD working copy derived from `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform.pdf`.
   - Use for detailed module workflow, data capture, agent behavior, and module acceptance semantics.
   - If extraction wording looks ambiguous, verify against the source PDF instead of guessing.
3. `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`
   - Product scope, module naming, module intent, and implementation notes.
4. `reference-doc/OUT/*`
   - Agent-generated reference only. Useful for comparison, not the primary source of truth.
5. `reference-doc/PENDING/*`
   - Ignore by default. Only use after explicit human approval.

If more dated folders appear under `reference-doc/IN/`, the latest dated folder should be treated as the default input set unless the user points to another folder.

## 3. Product Information Architecture

The prototype must preserve one dashboard plus twelve PMO modules:

| Route | UI Label | Notes |
| --- | --- | --- |
| `/` | Strategic Overview | Default executive dashboard |
| `/portfolio` | Portfolio (SSOT) | Portfolio map, health matrix, SSOT logs |
| `/requirements` | Requirements | 9 key project elements |
| `/milestones` | Milestones | Horizon timeline and delay simulation |
| `/approvals` | Gov Approvals | Approval inventory and condition tracker |
| `/procurement` | Procurement | Tender validation |
| `/design` | Design (BIM-Cost) | Design health and BIM-cost sync |
| `/finance` | Finance | 7 core financial elements |
| `/payment` | Jarvis PAY | Progress-to-payment engine |
| `/progress` | Progress (Eagle Eye) | Site perception and vision overlays |
| `/quality` | Quality (DWSS) | Work supervision loop |
| `/safety` | Safety (Smart Site) | 9 smart site modules |
| `/handover` | Handover | Digital twin and final delivery |

Module naming must stay aligned with the reference documents. Do not rename modules for aesthetics.

## 4. Technology Decisions

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS plus shared CSS variables for durable UI tokens
- Motion baseline: shared CSS motion layer in `styles/jarvis-ui/motion.css`
- Spatial transitions: Motion for React (`motion/react`) only when layout or presence animation is needed
- Timeline or SVG-heavy sequences: GSAP only in isolated client components
- Designer-authored branded loops: Lottie JSON assets only for contained surfaces
- Icons: `lucide-react`
- Fonts: `Inter` or equivalent neutral sans for app chrome
- Data source: local typed mock data for prototype phase
- Analytical charts: `ECharts` in isolated client components when a module needs richer trend, comparison, distribution, heatmap, or forecast views than shared CSS/SVG patterns can provide
- Portfolio map: `react-map-gl` backed by Mapbox GL JS, with public token provided through `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- GIS and geographic portfolio views stay on Mapbox-backed components rather than ECharts map surfaces
- Dashboard strategic GIS and portfolio GIS should reuse the same project coordinate dataset and shared map component logic
- State approach: local component state first; avoid a global store until there is real cross-page application state

## 5. Architectural Principles

### 5.1 High-Fidelity Before Expansion

- Treat the current prototype as an implementation baseline, not as inspiration.
- Prefer extracting shared components from the existing prototype markup over inventing new patterns.
- Keep deltas small and intentional.

### 5.2 Shared Shell First

The following elements are shared application chrome and should not drift between pages:

- left sidebar
- top header
- page container width and padding, except for approved full-bleed embedded-workbench routes such as `/payment`
- floating Jarvis intelligence action button
- card/badge/progress-bar language

### 5.3 Mocked Data, Real Component Boundaries

Even though the first phase is a prototype, component and file boundaries should be production-shaped:

- route pages only compose sections
- reusable primitives stay in shared UI folders
- mock datasets live outside page components
- view models are typed

## 6. Proposed Next.js File Structure

```text
app/
  layout.tsx
  globals.css
  (platform)/
    layout.tsx
    page.tsx
    portfolio/page.tsx
    requirements/page.tsx
    milestones/page.tsx
    approvals/page.tsx
    procurement/page.tsx
    design/page.tsx
    finance/page.tsx
    payment/page.tsx
    progress/page.tsx
    quality/page.tsx
    safety/page.tsx
    handover/page.tsx
components/
  shell/
    app-shell.tsx
    sidebar.tsx
    topbar.tsx
    floating-agent-button.tsx
  ui/
    card.tsx
    badge.tsx
    icon-button.tsx
    progress-bar.tsx
    section-header.tsx
    stat-tile.tsx
  modules/
    dashboard/
    portfolio/
    requirements/
    milestones/
    approvals/
    procurement/
    design/
    finance/
    payment/
    progress/
    quality/
    safety/
    handover/
lib/
  navigation.ts
  icons.ts
  mock-data/
    dashboard.ts
    portfolio.ts
    milestones.ts
    approvals.ts
    modules.ts
styles/
  jarvis-ui/
    tokens.css
    base.css
    shell.css
    components.css
    motion.css
    utilities.css
    index.css
components/
  motion/
    ...
lib/
  motion/
    ...
```

## 7. Rendering Model

- `app/(platform)/layout.tsx` should provide the persistent shell.
- Sidebar collapse state is client-side UI state.
- Module pages can stay thin and render typed sections.
- Rich interactive views such as approvals, portfolio map selection, and finance simulations should be isolated into client components.
- Client-only charting integrations should be wrapped in isolated client components so route render stays stable when a chart is absent or data is incomplete.
- External browser-only integrations such as the portfolio map should degrade gracefully when configuration is absent, rather than breaking route render.

## 8. Shared UI System

The current prototype already defines a stable visual language. Preserve these patterns:

### 8.1 Global Shell

- App background: near-white `#FDFDFE`
- Sidebar: white surface, light right border, rounded button states
- Header: semi-transparent white with backdrop blur
- Main content: `max-width` dashboard container with generous padding

### 8.2 Primitive Components

- `Card`
  - white background
  - `rounded-xl`
  - light gray border
  - subtle shadow
  - slightly stronger shadow on hover
- `Badge`
  - compact uppercase label
  - semantic color variants: default, success, warning, danger, info
- `ProgressBar`
  - thin rounded track
  - solid semantic fill
- `IconButton`
  - small hit area
  - pale hover fill

### 8.3 Accent System

- Primary accent: blue
- Success: emerald
- Warning: amber
- Danger: rose
- Dark emphasis panels: charcoal/near-black only for special panels like stress test, live perception, and contract logic

### 8.4 Information Density

- KPI labels are small uppercase captions
- Main values are bold and compact
- Use grid-based dashboards, not large empty hero sections
- Keep interaction language crisp and operational

### 8.5 Motion System

- Shared motion tokens, keyframes, and reduced-motion fallbacks live in `styles/jarvis-ui/motion.css`.
- Default motion uses opacity plus short-distance translation, not large-scale travel.
- The persistent shell should stay steady while module-local surfaces may animate.
- Use Motion for React only for component-local layout or presence transitions.
- Use GSAP and Lottie as approved exceptions for advanced analytical or branded surfaces.
- Motion should help explain state change, focus, and hierarchy, not introduce a new visual language.

## 9. Module Composition Rules

Each route should define a task-led composition, not a fixed page formula. Most routes should still identify these roles:

1. a module entry state such as a page header, summary row, or embedded context header
2. summary signals only when they materially improve scan speed; these may appear as a KPI grid, compact ribbon, inline strip, or be embedded in the primary surface
3. one primary deep-work surface that matches the module's archetype
4. one secondary support zone for insight, log, action, or selected detail; this may appear as a sidecar, lower panel, tabbed same-route view, or contextual drawer

Do not default unrelated modules to the same `top KPI + main workbench + right side panel` rhythm.
Similar compositions are acceptable when the underlying operator task is similar; the test is task fit, not forced novelty.
Choose the module archetype before implementation, for example map-first, queue/casework-first, timeline/dependency-first, comparison/risk-first, live-operations-first, finance/scenario-first, or coordination/canvas-first.

Analytical charts are optional, not mandatory. Use them when the module's primary questions are about trend, spread, forecast, or anomaly concentration; otherwise prefer tables, queues, maps, timelines, detail canvases, or coordination surfaces.

The dashboard and the modules should feel like parts of one system. New pages must inherit the same shell and component semantics.

## 10. Data Ownership

Prototype data should be stored as typed constants in `lib/mock-data/*` and passed into sections. Do not hard-code large datasets inside page components once migration begins.

Recommended ownership:

- navigation and module labels: `lib/navigation.ts`
- dashboard metrics and feed: `lib/mock-data/dashboard.ts`
- portfolio list and map markers: `lib/mock-data/portfolio.ts`
- milestone timeline: `lib/mock-data/milestones.ts`
- approvals master/detail data: `lib/mock-data/approvals.ts`
- chart series, labels, thresholds, and comparison bands: module-specific `lib/mock-data/*` files
- generic module overviews: `lib/mock-data/modules.ts`

## 11. Migration Strategy From Existing Prototype

1. Lift the current shell into shared components with minimal markup changes.
2. Extract `Card`, `Badge`, `ProgressBar`, and section headers.
3. Move data arrays out of page components into typed mock-data files.
4. Convert each module into a route while preserving the same visual structure.
5. Only after parity is achieved, allow module-specific refinements.

## 12. Non-Goals For This Phase

- No backend integration
- No authentication flow
- No redesign of the visual system
- No switch to a different icon family
- No use of `reference-doc/PENDING` as active input without human approval
