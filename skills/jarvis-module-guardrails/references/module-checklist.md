# Module Checklist

Use this checklist before finishing a module implementation or module-doc update.

## Source Grounding

- Active source folder under `reference-doc/IN/` is identified.
- `prototype.html` was used for shell and panel language.
- `gemeni_chat.md` was used for module naming and intent.
- `reference-doc/PENDING/**` was not used unless explicitly approved.

## UI Structure

- Route has a module-specific purpose, not only generic section cards.
- Page keeps the shared shell, spacing, badge language, and card semantics.
- Page follows the documented anatomy:
  - summary/header
  - KPI grid or overview
  - primary working panel
  - secondary insight/log/action panel

## Data and Code

- Route file stays thin.
- Rich behavior lives in `components/modules/<module>/`.
- Large page data lives in `lib/mock-data/*`.
- New fields or types are reflected in shared typing docs when needed.

## Documentation

- `coding-doc/modules/<module>.md` reflects the new current state.
- Cross-cutting `coding-doc/*.md` files were updated if behavior or schema changed.
- Current gaps are recorded if the module is still partial.

## QA

- Naming matches approved PMO module labels.
- Desktop and mobile layout were considered.
- Empty or fallback states do not break route rendering.
