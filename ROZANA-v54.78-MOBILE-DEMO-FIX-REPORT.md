# Rozana v54.78 — Mobile UX + Demo Pages Fix Report

## Base version
- Started from: `rozana_next_app_v54_77_npm_install_fix.zip`
- New version: `54.78.0`

## Fixes completed

### 1. Demo page card previews
- Replaced iframe-based demo previews on `landing-page-oman.html` with local static PNG preview images.
- Reason: the production security headers use `X-Frame-Options: DENY` and `frame-ancestors 'none'`, so iframe previews can be blocked in production.
- Added local preview images under:
  - `public/assets/images/demo-previews/demo-dental-clinic-preview.png`
  - `public/assets/images/demo-previews/demo-beauty-clinic-preview.png`
  - `public/assets/images/demo-previews/demo-cafe-preview.png`
  - `public/assets/images/demo-previews/demo-service-company-preview.png`
  - `public/assets/images/demo-previews/demo-training-institute-preview.png`
  - `public/assets/images/demo-previews/demo-real-estate-preview.png`
- Added CSS override in `public/assets/css/page/landing-page-oman-2.css` to display the preview images cleanly inside the demo browser frame.

### 2. Back button inside demo pages
- Added a visible fixed return button to every demo page:
  - `demo-dental-clinic-landing.html`
  - `demo-beauty-clinic-landing.html`
  - `demo-cafe-landing.html`
  - `demo-service-company-landing.html`
  - `demo-training-institute-landing.html`
  - `demo-real-estate-landing.html`
- Button target:
  - `/landing-page-oman#demo-pages`
- Added shared CSS:
  - `public/assets/css/demo-return.css`

### 3. Mobile UX polish
Added a new global mobile override file:
- `public/assets/css/mobile-polish.css`

Applied to all main website pages, excluding the standalone demo pages.

Mobile adjustments include:
- Larger hamburger tap target: 44px minimum.
- Better mobile header spacing and logo sizing.
- Scrollable mobile menu with improved spacing and tap targets.
- More controlled H1 / H2 / H3 sizes on mobile.
- Reduced mobile hero height.
- Hidden mobile scroll indicator.
- Cleaner mobile breadcrumb and eyebrow text spacing.
- Full-width mobile CTA behavior.
- Improved mobile contact form spacing and submit button layout.
- Demo cards optimized for mobile preview image display.

### 4. Mobile menu accessibility
Updated `public/assets/js/main.js`:
- Adds `body.menu-open` when mobile menu is open.
- Moves focus into the mobile menu after opening.
- Returns focus to the menu button after closing.
- Keeps existing Escape key close behavior.

## Validation completed
- `npm install --prefer-offline`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- `npx tsc --noEmit`: passed
- Internal link check: 0 missing internal links/assets
- Demo preview image count: 6/6
- Demo return button count: 6/6
- Landing page demo iframe previews: removed

## Notes
- Demo preview cards no longer depend on iframe rendering, so they are compatible with the current production security headers.
- Google platform connection can proceed after this version is deployed and mobile view is visually checked on real devices.
