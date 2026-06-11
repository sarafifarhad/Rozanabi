# Rozana v55.09 — Landing Page Website Card Screenshot Parity Report

## Goal
Apply the same screenshot-style treatment used for the Afrooz Perfumes card to the rest of the Landing Page Website cards.

## What was done
- Reviewed every card in the `Landing Page Website` section.
- Removed the legacy `lpo-demo-frame` class from all demo preview images in `public/landing-page-oman.html` so the old iframe-style scaling/transform rules no longer affect the card screenshots.
- Added a final CSS override so every card preview behaves like a direct screenshot preview:
  - no fake browser dots/bar
  - no transform scaling
  - no hover zoom
  - fixed `10:7` frame
  - full-card screenshot display using `object-fit: cover` and `object-position: top center`
- Refreshed all preview image URLs with `?v=55.09` to reduce stale caching.
- Preserved the latest build-safe setup and Eventona back-button parity.

## Result
All cards in the Landing Page Website section now use the same clean screenshot-display logic as Afrooz Perfumes, from both size and visual presentation standpoints.
