# Rozana v54.84 — Mobile Button, Footer and CTA Consistency Fixes

## Completed fixes

1. Centered the sentence `At Rozana, you're not a project, you're a partner.` on mobile only.
2. Standardized FAQ page hero buttons on mobile to match the same full-width mobile CTA pattern used across the main pages.
3. Applied the same mobile CTA system to all page-hero actions so Contact, FAQ, Landing Page and other inner pages remain consistent.
4. Removed underline/bottom-border styling from `Cookie Settings` and footer cookie links on both desktop and mobile.
5. Reduced and standardized the `Start a Conversation` button typography in Contact so it matches the rest of the site CTA labels.
6. Restored desktop footer rhythm while keeping a cleaner mobile footer legal placement.
7. Updated project version to `54.84.0`.
8. Updated cookie consent key to `rz-cookie-consent-v54-84`.

## Validation targets

After deploy, check these URLs in mobile view:

- `/`
- `/contact`
- `/faq`
- `/landing-page-oman`
- footer on any page
- Cookie Settings modal trigger in footer

## Build validation

This package was tested with:

- `npm install --include=dev --prefer-offline --no-audit`
- `npm run build`
- `npx tsc --noEmit`
- `npm audit --omit=dev`
