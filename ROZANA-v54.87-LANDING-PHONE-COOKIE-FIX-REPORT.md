# Rozana v54.87 — Landing CTA, Mobile Phone, and Cookie Button Fixes

## Version
- Updated project version to `54.87.0`.

## Fixes completed

1. Landing Page Design hero CTA spacing
   - Reduced the empty space between the hero description and the `Request Free Review` / `View Demo Layouts` buttons on mobile.
   - Kept the mobile button structure consistent with the page-hero CTA system used across the site.

2. Mobile number update
   - Updated the visible phone link to `+968 77657221`.
   - Updated `tel:` links to `tel:+96877657221`.
   - Updated structured data telephone values to `+96877657221`.
   - Updated the contact page phone display and footer phone display.

3. Cookie Settings button text cleanup
   - Rebuilt the cookie banner action button layout.
   - Prevented button labels such as `Manage Choices`, `Save Choices`, `Reject All`, and `Accept All` from breaking awkwardly.
   - Applied stable button typography, spacing, and alignment for both desktop and mobile.
   - Kept the cookie banner compact while preserving readable button labels.

4. Button typography consistency
   - Re-applied a consistent CTA label style across primary, secondary, form-submit, and price-card CTA buttons.
   - Stabilized `Send Message` so its font and size remain aligned with the site button system.

## Validation
- `npm install --include=dev --prefer-offline --no-audit`: passed
- `npm run build`: passed
- `npx tsc --noEmit`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- Internal asset check: 0 missing local asset references
