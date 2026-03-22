# Module Doc Template Guide

Mirror this structure in `coding-doc/modules/<module>.md`.

## Required Sections

1. `Module Identity`
   - route
   - module id
   - UI label
   - current implementation status
2. `Approved Source Inputs`
   - visual source
   - scope and naming source
   - supporting coding docs
   - current implementation references
3. `Business Intent`
   - purpose
   - operator questions the page should answer
   - agent or automation role
4. `Current State and Gap`
   - what exists today
   - what is still missing
5. `Required UI Composition`
   - page archetype and why it fits the module task
   - header or summary row
   - KPI or overview strategy
   - primary focal zone
   - secondary support zone
   - same-route alternate view when justified
   - chart surfaces when justified
6. `Data and Code Ownership`
   - route file
   - page component
   - mock-data file
   - types
   - shared UI dependencies
7. `Interaction Notes`
   - primary user actions
   - selection or drill-down behavior
   - empty and fallback behavior
8. `Do Not Drift`
   - shell and styling rules
   - naming rules
   - approved expansion boundaries
9. `Implementation Tasks`
   - next execution steps for the module
10. `Acceptance Checks`
   - route-level done criteria
11. `Documentation Sync`
   - what other docs must be updated when this module changes

## Writing Rules

- Be concrete and file-backed.
- Record current implementation status explicitly.
- Separate current state from target state.
- Prefer route names and module labels that exactly match approved sources.
- Do not force uniqueness for its own sake; justify layout similarity by task similarity and justify layout differences by operator need.
- Keep the module doc short enough to guide implementation quickly.
