# Consistency Checklist

Use this checklist before closing any UI task.

## 1. Shell

- sidebar width and active item styling match the baseline
- top header height, search field, and icon controls stay compact
- floating Jarvis action button is still present when expected

## 2. Components

- cards use the same white surface, border, radius, and shadow language
- badges use semantic variants only
- progress bars and tables keep the same density and alignment

## 3. Content Structure

- module naming matches the PMO docs
- page layout still follows summary plus deep-work panels
- new sections do not break the operational dashboard style

## 4. Icons

- all icons come from `lucide-react`
- icon sizes and meanings stay consistent with the existing prototype

## 5. Source Hygiene

- changes trace back to `reference-doc/IN/`
- `reference-doc/PENDING/` was not used unless explicitly approved

## 6. Responsive Review

- desktop layout remains stable
- mobile layout remains readable
- scroll behavior is predictable for sidebar, body, and detail panels
