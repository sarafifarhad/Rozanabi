# Rozana v55.08 — Eventona Back Button Parity Report

## What changed
- Replaced the custom Eventona bottom-right back button with the shared demo return button used by the other demo pages.
- Eventona now uses the same `demo-return-link` class and `assets/css/demo-return.css` styling.
- Button text is now: `← Back to Landing Page Website`.
- Version and cache references updated to `55.08`.

## Result
The Eventona demo page now has the same Back to Landing Page Website control style and position as the rest of the Landing Page Website demos.


## Build Safety Update
- Removed IndexNow network submission from the automatic `postbuild` step.
- `npm run build` now only builds the Next.js app and regenerates `sitemap.xml`.
- Manual IndexNow submission is still available via `npm run sitemap:submit` or `npm run seo:refresh`.
