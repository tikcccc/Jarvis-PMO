# Source Materials

## Active Inputs

Use the following inputs in priority order:

1. `reference-doc/IN/**/prototype.html`
   - primary visual, structural, and interaction source
2. `reference-doc/IN/**/gemeni_chat.md`
   - naming, module scope, and implementation context

## Directory Semantics

- `reference-doc/IN/`
  - agent-readable input approved for active use
- `reference-doc/OUT/`
  - agent-generated reference output
- `reference-doc/PENDING/`
  - ignore until manually approved

## Selection Rule

If multiple `IN` folders exist:

- prefer the latest dated folder
- unless the user explicitly names a different folder

## Working Rule

When an existing screen only needs a small change, preserve:

- shell layout
- icon family and icon meaning
- card and badge style
- spacing rhythm
- page section ordering
