# Rozana v54.90 — Version, Logo, Landing CTA, and Brand Element Fix Report

## Base version
- Started from: `rozana_next_app_v54_89_landing_desktop_scope_fix.zip`
- New version: `54.90.0`

## Completed fixes
1. Updated active project version references:
   - `package.json`: `54.90.0`
   - `package-lock.json`: `54.90.0`
   - `README.md`: `v54.90.0`
   - Cookie consent internal payload version: `v54.90`

2. Landing Page Design mobile header spacing:
   - Tightened the mobile gap between the hero text and the header CTA buttons.
   - Kept the correction scoped to `.landing-oman-hero` so the desktop layout and other pages are not affected.

3. Home/header Get in Touch button consistency:
   - Re-standardized the desktop `.nav__cta` height, padding, font size, and alignment.
   - Applied the rule globally so the Home header button matches the same header button system used on internal pages.

4. Rozana logo lockup spacing:
   - Reduced the vertical gap between `ROZANA` and `BUSINESS INTELLIGENCE` in all inline static HTML logo SVG lockups.
   - Updated the subtitle baseline from `y="46"` to `y="43"` across the generated public HTML pages.

5. Brand Element card wordmark:
   - Updated the `ROZANA` wordmark inside the `The Brand Element` card to use the same Inter-heavy uppercase treatment as the main logo.
   - Aligned the subtitle typography and color closer to the main logo lockup.

## Validation
- Confirmed `package.json` and `package-lock.json` are both on `54.90.0`.
- Confirmed no remaining static HTML logo subtitle instances use `y="46"` for `BUSINESS INTELLIGENCE`.
- Confirmed CSS brace balance for `style.min.css` and `mobile-polish.css` remains valid.

## Notes
- Historical reports from previous versions are kept in the package as version history.
- No structural page changes, routing changes, form behavior changes, or SEO URL changes were made in this update.
