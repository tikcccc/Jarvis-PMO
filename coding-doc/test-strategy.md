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

### 2.3 Visual Regression Focus

The highest-risk failures are visual consistency failures, not data logic bugs. Prioritize:

- sidebar width, spacing, and active state drift
- header height and control density drift
- card radius, border, shadow, and padding drift
- icon replacement or inconsistent icon sizing
- table row density and progress bar style drift

## 3. Manual QA Checklist

- Compare migrated dashboard against `reference-doc/IN/**/prototype.html`.
- Compare at least one deep module page from each major category:
  - Portfolio
  - Approvals
  - Finance
  - Progress or Payment
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
