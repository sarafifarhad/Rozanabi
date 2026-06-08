# Rozana v54.86 — Mobile Header CTA Consistency Fix

## Scope
Adjusted mobile header CTA behavior for FAQ, Privacy Policy, Terms & Conditions, Cookie Policy, and other internal page heroes so they match the Services page mobile CTA structure.

## Changes
- Added `has-right-hero-actions` to legal/FAQ style pages where applicable.
- Added stronger mobile CSS overrides for `.page-hero .hero-bottom`, `.hero-desc`, and `.hero-actions`.
- Standardized mobile hero CTA buttons to full-width stacked layout, 46px minimum height, consistent Inter label typography, fixed spacing, and identical primary/ghost button treatment.
- Kept desktop footer/legal structure untouched.
- Updated project version to `54.86.0`.

## Test targets
- `/services`
- `/faq`
- `/privacy-policy`
- `/terms-conditions`
- `/cookie-policy`

