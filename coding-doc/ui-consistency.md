# Jarvis PMO UI Consistency Spec

## 1. Visual Intent

The product is a white-theme executive command center for PMO leaders in real estate development. The UI should feel precise, operational, premium, and readable under dense information loads.

Consistency is required, but sameness is not. The app should feel like one system while still letting each module express its own working style, focal area, and reading path.

## 2. Reference Baseline

Primary visual reference:

- `reference-doc/IN/2026-3-20 prototype developement/prototype.html`

Module-functional PRD reference:

- `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/index.md`
- matching module markdown under `reference-doc/IN/2026-3-20 prototype developement/2026.03.JPM.Platform/`

Scope and naming cross-check reference:

- `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`

## 3. Governance Model

The UI is governed in two layers:

### 3.1 Layer One: Shell and System Invariants

These stay stable across the whole product:

- sidebar
- top header
- content container width and padding
- white-theme direction
- color semantics
- icon family
- card, badge, button, progress bar, and table baseline language

This layer exists to keep the platform coherent.

### 3.2 Layer Two: Module-Level Composition

These may change per module when the module intent calls for it:

- reading path
- layout rhythm
- typography hierarchy
- emphasis placement
- dark-panel usage
- density distribution between panels
- relative priority of KPI, workspace, detail, and log zones

This layer exists to keep modules legible and distinctive.

## 4. Layer One: Shell and System Invariants

### 4.1 Shell Formula

The shell should keep these proportions and behaviors:

- page background: `#FDFDFE`
- sidebar:
  - white surface
  - light right border
  - expanded width around `16rem`
  - collapsed width around `5rem`
- top header:
  - height `4rem`
  - white with translucency and backdrop blur
  - search box and compact icon actions on the right
- content area:
  - scrollable
  - generous page padding
  - centered max-width container

### 4.2 Token Direction

#### Colors

- base background: near-white
- surface: white
- border: light gray
- primary accent: blue
- success: emerald
- warning: amber
- danger: rose
- emphasis surface: near-black only for analytical, risk, simulation, or live-intelligence panels

#### Radius and Elevation

- standard cards use `rounded-xl`
- controls use soft rounded corners, never sharp rectangles
- shadows are subtle and should not become glossy or heavy

#### Typography Baseline

- app chrome uses a neutral sans
- small metadata labels are uppercase and compact
- metric values are bold and high-contrast
- avoid oversized hero typography for the application shell

### 4.3 Shared Component Semantics

#### Cards

- white background
- light border
- soft shadow
- hover state can slightly increase shadow or border emphasis
- the shared `Card` primitive must not hard-lock white surfaces when a module uses an approved dark emphasis panel

#### Badges

- compact uppercase style
- semantic variants only
- decorative badge styles are not allowed unless they still map to status or risk meaning

#### Progress Indicators

- thin, rounded tracks
- solid fills
- compact labels above the bar when detail is needed

#### Tables and Lists

- headers use tiny uppercase gray labels
- rows use hover fill, not heavy separators
- action icons align to the far right and remain compact

#### Dark Panels

Used sparingly for:

- scenario simulation
- contract logic
- live site perception
- analytical pressure zones

These panels should feel intentional and data-heavy, not like a global dark mode toggle.
- approved dark panels should be implemented through a supported shared-card surface, not through conflicting one-off overrides

### 4.4 Icon Rules

- Use `lucide-react`.
- Keep the same icon meanings when porting the existing prototype.
- Do not mix icon families on the same page.
- Keep icons small and aligned with compact UI density.

### 4.5 Motion and Transition Rules

- Motion exists to clarify focus, latency, and spatial hierarchy, not to add spectacle.
- Keep shell motion subtle and fast; the sidebar and topbar should feel steady rather than theatrical.
- Prefer opacity plus short-distance translation over large travel or bounce.
- Shared motion tokens and keyframes should come from the supported motion layer, not from one-off page-local values by default.
- Dark analytical panels may use subtle ambient motion, but the effect should stay low amplitude and never read like a global dark-mode animation.
- Respect `prefers-reduced-motion` and remove non-essential ambient loops when it is enabled.

## 5. Layer Two: Module-Level Composition

### 5.1 Consistency Is Not Sameness

All modules should feel related, but they should not all read the same way.

Allowed variation includes:

- different dominant panel sizes
- different typography emphasis
- different placement of KPI ribbons
- different ratios between workspace and detail
- different use of dark analytical panels
- different information density between sections
- different placement of support zones such as sidecars, lower panels, drawers, or tabbed same-route views

Modules with similar operator tasks may legitimately share the same broad archetype.
Difference is not a goal by itself; the goal is a composition that matches the module task without collapsing unrelated modules into one repeated formula.

Not allowed:

- changing the shell structure per module
- inventing a new design language unrelated to the approved prototype
- turning operational modules into marketing-style pages
- copying one module's exact `top KPI + main workbench + right side panel` rhythm into unrelated modules without task justification

### 5.2 Attention Hierarchy and Heatmap Rules

Each module should define:

1. one primary focal zone
2. one secondary support zone
3. tertiary supporting context

Apply these rules:

- The first 2 seconds of scanning should make the main task obvious.
- If everything has the same weight, the page has no focus.
- If every module uses the same focus pattern, the product loses module identity.
- Prefer one clearly dominant block over many equally weighted cards.
- Use contrast, scale, density, and spacing intentionally instead of making every section equally prominent.

### 5.3 Typography Hierarchy

Typography should vary by role, not only by size.

Use distinct treatments for:

- lead metric or decision number
- module workbench title
- section lead
- evidence or metadata copy
- alert copy
- dense table labels

Guidance:

- lead numbers should carry stronger contrast than surrounding copy
- evidence text should be tighter and calmer than decision text
- supporting descriptions should not compete with active work surfaces
- a module may shift weight, spacing, or line length to fit its task, without changing the global app chrome font family

### 5.4 Layout Rhythm

Do not default every route to the same formula.

Module pages may emphasize different rhythms such as:

- compact KPI ribbon plus dominant analytical surface
- workflow queue plus selected detail canvas
- map plus selected asset context
- timeline plus downstream impact panel
- comparison matrix plus risk interpretation sidecar
- live alert wall plus remediation log

Guidance:

- a KPI band is optional when summary signals are clearer inside the primary surface or selected context header
- a secondary support zone does not have to live on the right; it may live below the main surface, inside tabs, in a same-route alternate view, or in a drawer
- choose the simplest rhythm that matches the module task; do not add variation only to appear different

### 5.5 Emphasis Budget

Every page has a limited emphasis budget.

Use no more than 2 to 4 strong emphasis levers on one page:

- large scale
- dark surface
- concentrated accent color
- unusually dense data surface
- oversized number
- urgent status color

If too many panels use strong emphasis, nothing stands out.

### 5.6 Responsive Reprioritization

Responsive behavior should re-order importance, not only stack blocks mechanically.

On smaller widths:

- keep the primary focal zone near the top
- move tertiary logs or low-priority support panels downward
- allow table regions to scroll horizontally when needed
- preserve clarity of the active selection state

### 5.7 Motion Hierarchy

- The primary focal zone may receive the strongest entry or change-state motion.
- Secondary support zones may animate more softly or only on explicit user interaction.
- Tertiary context should usually stay still.
- If more than one major surface is looping at the same time, the page is overspending its emphasis budget.

### 5.8 Analytical Visualization Rules

- Analytical charts are optional. They should appear only when they compress trend, comparison, distribution, forecast, or anomaly-density questions better than KPI cards, tables, queues, or detail panels.
- Geography-first views should keep map surfaces as the dominant visualization instead of replacing them with generic charts.
- Preferred operational chart types are line, bar, stacked bar, scatter, heatmap, bullet, and limited waterfall-style comparisons.
- Avoid pie-heavy layouts, decorative gauges, 3D charts, and other novelty visuals unless a human explicitly approves the exception.
- A page should usually have no more than one dominant chart surface. Additional charts should stay secondary and must not erase the module's main workbench or detail-reading path.
- Charts must inherit the shared card shell, Jarvis semantic colors, compact uppercase metadata language, and restrained density; vendor default themes are not an acceptable final presentation.
- Legends, thresholds, and annotations should read like PMO controls, not like marketing dashboard decoration.
- Charts should degrade to stable placeholders or empty states when data is incomplete, and non-essential chart animation must respect reduced-motion settings.

## 6. Module Archetype Guidance

These are directional defaults, not rigid templates.

### Finance

- lead with numbers, trend contrast, and scenario testing
- compact KPI ribbon is acceptable because the metrics are themselves the story

### Approvals

- lead with workflow queue and selected case detail
- timeline, conditions, and evidence should read as casework, not as dashboard cards

### Procurement

- lead with comparison, spread interpretation, and contract risk
- supplier profile and risk scoring should support the main bid-evaluation surface

### Milestones

- lead with sequence, dependency, and impact propagation
- the timeline should feel like the backbone of the page

### Portfolio

- lead with geography and selected project context
- supporting metrics should frame the selected asset, not compete with the map

### Progress, Quality, Safety

- lead with live signals, anomalies, and operator response
- emphasis can be sharper and more alert-driven than in planning modules

## 7. Skill Usage Guidance

- Use `skills/front-end-ui/SKILL.md` when the task is to protect shell fidelity, shared primitives, and baseline visual consistency.
- Use `skills/module-visual-composition/SKILL.md` when the task is to improve focus, hierarchy, typography, or module distinction.
- Use both when a module must become more visually legible without drifting from the shared Jarvis shell.

## 8. Allowed Changes

Allowed:

- extracting shared components
- moving inline data to typed files
- minor spacing fixes needed for responsive stability
- typography hierarchy adjustments inside module content
- module-specific layout changes that preserve shell invariants
- differentiated panel emphasis that remains inside the approved visual language

Not allowed without explicit approval:

- redesigning the shell
- changing the icon family
- changing the white-theme direction
- replacing dense operational cards with large minimalist sections
- introducing arbitrary visual variation with no module rationale
- using `reference-doc/PENDING` as live design input
