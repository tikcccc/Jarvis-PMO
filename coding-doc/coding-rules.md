# Jarvis PMO Prototype Coding Rules

## 1. Purpose

Keep the Next.js prototype implementation consistent with the approved reference input, shared UI language, and typed mock-data architecture.

## 2. Source Governance

- Treat `reference-doc/IN/` as the active implementation baseline.
- Use the latest dated folder under `reference-doc/IN/` unless a human points to a different input set.
- Treat `reference-doc/OUT/` as comparison material only.
- Do not use `reference-doc/PENDING/` without explicit approval.

## 3. Stack and Tooling

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS plus shared CSS variables
- Motion baseline: shared CSS motion layer in `styles/jarvis-ui/motion.css`
- Spatial transitions: Motion for React (`motion/react`) only when layout or presence animation is required
- Timeline-heavy sequences: GSAP only when CSS or Motion for React is not sufficient
- Branded loop assets: Lottie only for contained approved surfaces
- Analytical charts: `ECharts` only when a module needs richer trend, comparison, distribution, or forecast views than shared CSS/SVG patterns can provide
- Icons: `lucide-react`
- Quality gates:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

## 4. UI and Component Rules

- Preserve the white-theme executive command-center visual language from the reference prototype.
- Reuse shared primitives before creating page-local duplicates.
- Reuse the shared motion layer before adding a runtime animation dependency.
- Keep route files thin; place rich interactivity in module components.
- Keep runtime animation logic isolated in client components instead of spreading transition objects across route files.
- Do not add charts by default; first justify that a chart improves operator scan speed relative to KPI cards, tables, queues, maps, or detail panels.
- Keep charts inside shared card surfaces and style them with Jarvis tokens, semantic colors, and compact metadata language rather than vendor default themes.
- Avoid novelty chart choices such as 3D, decorative gauge, or pie-heavy dashboards unless a human explicitly approves the exception.
- Keep GIS surfaces on the approved Mapbox stack instead of introducing ECharts maps.
- Do not default every module route to the same `top KPI row + main workbench + right side panel` composition.
- Similar layouts across modules are acceptable when the operator workflow is genuinely similar; do not force variation for novelty alone.
- Summary signals may live in a top grid, compact ribbon, inline strip, selected-context header, or primary surface depending on the task.
- Secondary support zones may be sidecars, lower panels, drawers, or same-route alternate views.
- Do not replace dense operational layouts with marketing-style sections.
- Do not animate the global shell theatrically; motion should clarify state and hierarchy inside module-local surfaces.
- Keep icon size, badge tone, border radius, and card shadow behavior consistent across modules.
- Honor `prefers-reduced-motion` when adding CSS or runtime motion.

## 5. Data and Typing Rules

- Store prototype datasets in `lib/mock-data/*`, not inline inside route files.
- Keep display-ready strings when the UI already expects formatted labels such as currency or percentages.
- Store chart series, threshold bands, legends, and comparison labels in typed mock-data files rather than inline chart config blobs inside components.
- Update `coding-doc/data-contract.md` whenever typed mock-data fields change.
- Prefer explicit field names when semantics change, for example geographic `latitude` and `longitude` over layout-only placeholder coordinates.

## 6. Environment and Integration Rules

- Do not hard-code secrets or public access tokens into tracked source files.
- Browser-visible third-party tokens must be supplied through `NEXT_PUBLIC_*` environment variables.
- For the portfolio map, use `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`.
- Browser-only integrations must fail safely and preserve route rendering when configuration is missing.

## 7. Review Baseline

- New routes and modules must preserve documented PMO naming.
- Module-specific behavior and implementation status should be tracked in `coding-doc/modules/<module>.md`.
- Architecture, data contract, acceptance criteria, and test strategy docs must stay aligned with implementation.
- Changes that alter behavior or schema must update both code and `coding-doc/` in the same pass.
