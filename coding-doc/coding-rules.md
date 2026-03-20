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
- Icons: `lucide-react`
- Quality gates:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

## 4. UI and Component Rules

- Preserve the white-theme executive command-center visual language from the reference prototype.
- Reuse shared primitives before creating page-local duplicates.
- Keep route files thin; place rich interactivity in module components.
- Do not replace dense operational layouts with marketing-style sections.
- Keep icon size, badge tone, border radius, and card shadow behavior consistent across modules.

## 5. Data and Typing Rules

- Store prototype datasets in `lib/mock-data/*`, not inline inside route files.
- Keep display-ready strings when the UI already expects formatted labels such as currency or percentages.
- Update `coding-doc/data-contract.md` whenever typed mock-data fields change.
- Prefer explicit field names when semantics change, for example geographic `latitude` and `longitude` over layout-only placeholder coordinates.

## 6. Environment and Integration Rules

- Do not hard-code secrets or public access tokens into tracked source files.
- Browser-visible third-party tokens must be supplied through `NEXT_PUBLIC_*` environment variables.
- For the portfolio map, use `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`.
- Browser-only integrations must fail safely and preserve route rendering when configuration is missing.

## 7. Review Baseline

- New routes and modules must preserve documented PMO naming.
- Architecture, data contract, acceptance criteria, and test strategy docs must stay aligned with implementation.
- Changes that alter behavior or schema must update both code and `coding-doc/` in the same pass.
