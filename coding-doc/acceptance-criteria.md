# Jarvis PMO Prototype Acceptance Criteria

## 1. Source Governance

- Only approved `reference-doc/IN/` files are treated as active agent input.
- When split module PRD markdown exists under `reference-doc/IN/**/2026.03.JPM.Platform/`, the matching file must be used for module-level workflow and feature intent.
- `reference-doc/OUT/` is reference output, not the primary implementation baseline.
- `reference-doc/PENDING/` is ignored unless explicitly approved by a human.

## 2. Product Structure

- The frontend includes the strategic dashboard plus the twelve documented modules.
- Module labels match the PMO documentation and existing prototype naming.
- Sidebar grouping and navigation hierarchy remain consistent with the current prototype.

## 3. Visual Fidelity

- The interface preserves the white executive command-center style from the current prototype.
- Sidebar, top header, card structure, badge language, and floating action button stay visually consistent across all pages.
- Accent colors remain blue, emerald, amber, and rose for their current semantic roles.
- `lucide-react` remains the icon family unless the user explicitly changes that decision.
- Analytical charts, when used, inherit the same shell, card language, and semantic color system instead of introducing a vendor-default dashboard style.

## 4. Layout Consistency

- Expanded and collapsed sidebar states both render correctly.
- Main header stays stable across all module routes.
- Main content area preserves the same padding and information density as the source prototype, except for approved full-bleed embedded-workbench routes such as `/payment`.
- Tables, KPI grids, and dark emphasis panels use the same spacing and card language.
- Analytical charts do not displace approved map-first or workbench-first compositions when those are the module's primary task surface.
- Module-level compositions remain task-led: unrelated modules do not all collapse into the same `top KPI + main workbench + right side panel` formula, while similar task types may still share an archetype when justified.

## 5. Behavioral Consistency

- Sidebar navigation switches modules without breaking shell layout.
- Hover, focus, and active states follow the same interaction tone as the prototype.
- Motion remains supportive and does not turn route changes or shell chrome into theatrical full-page transitions.
- Scroll regions behave predictably for sidebar, page body, and detail panels.
- Module pages keep existing local interactions such as selected approval detail and selected portfolio project.
- The requirements route keeps the `Global Drift Radar`, the `Digital Gene Bank (9 Key Elements)` overview, and in-place dossier drill-down on the same route.
- Each requirements dossier exposes captured fields, governance metadata, agent automation routines, validation checks, evidence, impact linkages, and audit history for the selected element.
- The procurement route keeps tender package and bidder selection in-page, updating supplier and risk detail panels without route navigation.
- The procurement sidebar entry opens the main procurement page directly without an intermediate child-view chooser.
- The dashboard `Portfolio Strategic Map (GIS)` renders the same geographic project dataset as the portfolio route instead of a placeholder panel.
- The portfolio route supports `MAP` and `SATELLITE` mode switching without breaking project selection behavior.
- If `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing, the portfolio route falls back to a safe preview state instead of a runtime failure.
- The payment route replaces the generic placeholder with a dedicated Jarvis PAY workbench, keeps queue, overview, ledger, valuation, and CE / VO views on the same route, and may render full-bleed inside the shared shell for embedded-system use.
- The payment valuation view uses the approved Mapbox GIS stack with a safe fallback preview when `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing.
- The payment valuation view supports in-place zone inspection and back navigation to the overview without leaving `/payment`, and the inspection detail uses the approved Eagle Eye panorama asset.
- The progress route keeps GIS-led zone overview and in-place zone drill-down on the same route instead of reverting to a generic placeholder module page, and the GIS legend / markers distinguish normal, watch, and critical delay states.
- The progress detail view uses timestamped discrete Eagle Eye capture events with stage context, not a continuous video-player scrubber, surfaces timestamp / GPS / weather metadata for the selected snapshot, and reserves the only dark emphasis panel on the route for delay impact analysis.
- The handover route keeps GIS-led asset overview and in-place panorama detail on the same route instead of reverting to a generic placeholder module page.
- The handover detail view preserves the prototype's AI snag detection, reality-vs-model verification, and digital asset manual surfaces while keeping the Eagle Eye evidence view inside the same route.
- Reduced-motion settings disable non-essential ambient motion and replace large travel with lighter or instant transitions.

## 6. Technical Acceptance

- Frontend architecture is based on Next.js App Router.
- Shared UI primitives are reused instead of duplicated.
- Shared motion tokens and CSS classes are reused before heavier runtime animation layers are introduced.
- If analytical charts are introduced, they use the approved charting approach, keep GIS on the Mapbox stack, and fail safely when data is absent.
- Mock data is typed and stored outside page components.
- Requirements page-specific data lives in `lib/mock-data/requirements.ts`, and the detail view contract includes governance, automation, and validation structures rather than inline JSX-only content.
- Procurement page-specific data lives in `lib/mock-data/procurement.ts` and the route file remains a thin composition layer.
- Progress page-specific data lives in `lib/mock-data/progress.ts`, including timestamp, GPS, weather, and stage context for capture events, and the route composes dedicated progress components rather than inline generic-module placeholder content.
- Handover page-specific data lives in `lib/mock-data/handover.ts`, and the route composes dedicated handover components rather than inline generic-module placeholder content.
- The handover GIS overview uses the approved Mapbox GIS stack with a safe fallback preview when `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is missing, and the detail view uses the approved Eagle Eye panorama asset.
- Module docs record their matching split PRD source files when those working copies exist in the active input set.
- The architecture, data contract, API seam, acceptance criteria, and test strategy docs stay mutually consistent.

## 7. Delivery Constraint

- Changes should be incremental relative to the existing prototype.
- The first implementation pass is not a redesign exercise.
