# Rozana v55.06 — Exact Card Screenshot Preview Report

## What changed
- Applied the same preview treatment used for Afrooz across every card in the Landing Page Website section.
- Normalized all preview files to an exact 1000×700 canvas so they match the card frame ratio of 10:7.
- Eventona preview was normalized from its source screenshot so it no longer gets cropped or distorted inside the card.
- CSS now displays previews with `object-fit: contain` and removes hover zoom, filters, and artificial browser bars.
- All preview image URLs now include `?v=55.06` cache busting.

## Result
Every card now reads its own preview file as the source of truth and displays that screenshot consistently, following the same logic as Afrooz.
