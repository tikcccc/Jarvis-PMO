# Jarvis PMO Prototype Test Strategy

## 1. Objective

Catch visual drift and structural regressions while migrating the prototype into Next.js.

## 2. Validation Layers

### 2.1 Static Checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`

### 2.2 Component and Route Smoke Checks

- dashboard route renders
- all twelve module routes render
- shared shell loads on every route
- sidebar toggle works
- expanded sidebar items with child views still navigate correctly

### 2.3 Visual Regression Focus

The highest-risk failures are visual consistency failures, not data logic bugs. Prioritize:

- sidebar width, spacing, and active state drift
- header height and control density drift
- card radius, border, shadow, and padding drift
- icon replacement or inconsistent icon sizing
- table row density and progress bar style drift
- chart card drift, unreadable legends, or default vendor theming that breaks Jarvis visual language
- motion drift that makes shell navigation feel theatrical or unstable
- reduced-motion regressions on animated module surfaces

## 3. Manual QA Checklist

- Compare migrated dashboard against `reference-doc/IN/**/prototype.html`.
- Compare at least one deep module page from each major category:
  - Portfolio
  - Approvals
  - Procurement
  - Finance
  - Progress or Payment
- On `/procurement`, verify switching the active tender package refreshes the bidder table and resets the supplier/risk detail panels in place.
- On `/procurement`, verify bidder selection updates the `Service Provider Profiling` and `Contractual Risk AI` panels without breaking table selection styling.
- On `/procurement`, verify the `Workbench | Logs` view switch preserves procurement context and updates the dominant panel hierarchy without leaving the module route family.
- On `/procurement`, verify the expanded sidebar `Procurement` entry can reach both `Workbench` and `Logs` states.
- On `/procurement`, verify the bidder comparison table scrolls horizontally on smaller widths while KPI cards and side panels stack cleanly.
- On animated module surfaces, verify motion clarifies the primary focal zone and does not block selection, scrolling, or reading.
- On routes with analytical charts, verify legends, thresholds, empty states, and semantic colors remain readable inside the shared Jarvis card shell.
- On routes with analytical charts, verify the chart supports the module's primary operator question and does not displace an approved map-first or workbench-first composition.
- Compare at least one queue/casework module, one comparison/risk module, and one map, timeline, or canvas-led module; verify layout differences are task-led and no unrelated route is using a copied formula without need.
- With reduced motion enabled at OS level, verify non-essential ambient motion stops and major state changes remain understandable.
- On `/`, verify `Portfolio Strategic Map (GIS)` renders real GIS tiles or the configured fallback preview, not a placeholder skeleton.
- On `/portfolio`, verify both `MAP` and `SATELLITE` modes render and keep marker selection synchronized with the detail panel.
- On `/portfolio`, verify the route still renders a safe fallback when `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is absent.
- Test responsive layouts at common widths:
  - 1440px
  - 1280px
  - 768px
  - 390px
- Verify the shell remains usable when content becomes scrollable.

## 4. Recommended Automated UI Coverage

If Playwright is added, capture screenshot checks for:

- `/`
- `/portfolio`
- `/milestones`
- `/approvals`
- `/procurement`
- `/finance`
- `/payment`

These routes cover the majority of shared layout and component patterns.

## 5. Content Integrity Checks

- Module count is exactly twelve plus dashboard.
- Module labels match the documented PMO naming.
- Sidebar groups remain stable.
- Mock data files and route components use the same ids and labels.

## 6. Exit Criteria

The prototype passes when:

- static checks succeed
- core routes render
- no obvious shell drift exists versus the reference prototype
- module naming and route structure match the documented baseline
