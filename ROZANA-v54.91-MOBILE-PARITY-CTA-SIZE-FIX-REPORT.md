# Rozana v54.91 — Mobile Parity and CTA Size Fix Report

## Source
- Started from: `rozana_next_app_v54_90_version_logo_landing_cta_fix.zip`
- New version: `54.91.0`

## Corrections completed
1. **Landing Page Design mobile header spacing**
   - Added a high-specificity mobile override for `body.landing-page-oman-body .landing-oman-hero`.
   - Reset mobile `min-height` and `height` behavior on the landing hero and `hero-content`.
   - Locked the description and CTA area into normal stacked document flow.
   - Set the CTA stack gap to match the compact Services-page mobile rhythm.
   - Removed the large mobile blank area between the paragraph and `Request Free Review` / `View Demo Layouts`.

2. **Home `Get in Touch` CTA sizing**
   - Standardized desktop header CTA sizing with a fixed 36px button height.
   - Standardized CTA-panel `Get in Touch` buttons to the same primary-button rhythm.
   - Added mobile full-width behavior for CTA-panel buttons for consistency.

3. **Version and cache-busting alignment**
   - Updated `package.json` to `54.91.0`.
   - Updated `package-lock.json` to `54.91.0`.
   - Updated README heading to `v54.91.0`.
   - Updated cookie consent internal version to `v54.91`.
   - Added `?v=54.91` to public CSS links so browsers do not keep serving the old mobile CSS.

## Files changed
- `package.json`
- `package-lock.json`
- `README.md`
- `public/assets/css/mobile-polish.css`
- `public/assets/js/cookie-consent-global.js`
- Public HTML files referencing CSS/JS assets

## Validation notes
- Confirmed the landing page uses `body.landing-page-oman-body` and `header.hero.page-hero.landing-oman-hero`, so the v54.91 mobile override is scoped only to the Landing Page Design header.
- Confirmed the shared Services-page structure is not changed by the landing-specific override.
- Confirmed public HTML files now reference the v54.91 CSS query string.
