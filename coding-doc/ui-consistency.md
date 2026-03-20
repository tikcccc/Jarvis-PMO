# Jarvis PMO UI Consistency Spec

## 1. Visual Intent

The product is a white-theme executive command center for PMO leaders in real estate development. The UI should feel precise, operational, and premium, with dense but readable information.

This is not a greenfield design system. The existing prototype is the baseline and future edits should preserve its visual language.

## 2. Reference Baseline

Primary visual reference:

- `reference-doc/IN/2026-3-20 prototype developement/prototype.html`

Scope and naming reference:

- `reference-doc/IN/2026-3-20 prototype developement/gemeni_chat.md`

## 3. Shell Formula

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

## 4. Token Direction

### Colors

- base background: near-white
- surface: white
- border: light gray
- primary accent: blue
- success: emerald
- warning: amber
- danger: rose
- emphasis surface: near-black only for special analytical panels

### Radius and Elevation

- standard cards use `rounded-xl`
- controls use soft rounded corners, never sharp rectangles
- shadows are subtle and should not become glossy or heavy

### Typography

- app chrome uses a neutral sans
- small metadata labels are uppercase and compact
- metric values are bold and high-contrast
- avoid oversized hero typography

## 5. Shared Component Semantics

### Cards

- white background
- light border
- soft shadow
- hover state can slightly increase shadow or border emphasis

### Badges

- compact uppercase style
- semantic variants only
- do not introduce decorative badge styles that do not map to status

### Progress Indicators

- thin, rounded tracks
- solid fills
- compact labels above the bar when detail is needed

### Tables and Lists

- headers use tiny uppercase gray labels
- rows use hover fill, not heavy separators
- action icons align to the far right and remain compact

### Dark Panels

Used sparingly for:

- scenario simulation
- contract logic
- live site perception

These panels should feel intentional and data-heavy, not like a dark mode toggle.

## 6. Icon Rules

- Use `lucide-react`.
- Keep the same icon meanings when porting the existing prototype.
- Do not mix icon families on the same page.
- Keep icons small and aligned with compact UI density.

## 7. Page Anatomy

Most routes follow this pattern:

1. compact title row or KPI header
2. summary metric grid
3. primary working panel
4. secondary insight, analytics, or log panel

Avoid replacing these operational layouts with generic marketing blocks.

## 8. Allowed Changes

Allowed:

- extracting shared components
- moving inline data to typed files
- minor spacing fixes needed for responsive stability
- limited content edits required by new product scope

Not allowed without explicit approval:

- redesigning the shell
- changing the icon family
- changing the white-theme direction
- replacing dense operational cards with large minimalist sections
- using `reference-doc/PENDING` as live design input
