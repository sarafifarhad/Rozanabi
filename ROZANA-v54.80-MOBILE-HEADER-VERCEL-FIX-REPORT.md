# Rozana v54.80 — Mobile Header, Menu, Footer and Vercel Warning Fixes

## Changes completed

1. Logo wordmark typography
   - Increased the inline SVG `ROZANA` text weight from `400` to `700` across all static HTML pages.
   - Added CSS fallback so the wordmark remains bold even where class-based logo text is used.

2. Mobile menu interaction
   - Removed the default blue focus outline that appeared when the mobile menu opened.
   - Added a stepped/cascade glow reveal so menu items illuminate one by one from Home down to Get in Touch.
   - Focus now moves to the menu container instead of the first visible link to avoid the browser blue box.

3. Contact page hero CTA
   - `Start a Conversation` now scrolls to the contact form without changing the address bar to `/contact#contact`.
   - Added `data-scroll-target="contact"` and a JS handler that scrolls smoothly while keeping the URL clean.

4. Vercel warnings
   - Converted `next.config.ts` to `next.config.mjs` to avoid the Vercel warning about installing TypeScript only to load the config.
   - Updated `package.json` engines to `>=20.0.0 <25.0.0` so the Vercel Project Settings Node 24.x value is not overridden by a `<23` range.

5. Home mobile hero
   - Re-centered the Home hero text block.
   - Reduced layout jumping on mobile by disabling the entrance transforms on the home hero text in mobile view.
   - Kept the three-line hero structure readable and centered.

6. Partner sentence readability
   - Fixed the `At Rozana, you're not a project, you're a partner.` note so it no longer breaks word-by-word.

7. Landing Page Design hero actions
   - Restored hero button spacing to match the Services and other internal page hero rhythm.

8. Footer bottom alignment
   - Desktop footer returned to copyright on the left and Cookie Policy / Cookie Settings on the right.
   - Mobile footer keeps copyright fully left and places cookie links in a cleaner compact row below.

9. Cookie settings modal
   - Fixed the hover state for `Save Choices` and `Accept All` so the text remains visible.

10. Demo preview cards
   - Local demo preview images are retained and continue to represent the actual demo layouts shown on the demo pages.

## Validation

- `npm install --prefer-offline --no-audit`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- `next.config.ts`: removed
- `next.config.mjs`: active
- Inline ROZANA wordmark `font-weight="400"`: 0 remaining
- Cookie consent storage key fallback aligned to `rz-cookie-consent-v54-80`

## Deploy note

After deploying v54.80, redeploy from Vercel and confirm:

- Mobile menu opens without the blue focus box.
- Menu items illuminate in sequence.
- `/contact` remains `/contact` after pressing Start a Conversation.
- Home hero is centered on mobile.
- Footer copyright is left-aligned and cookie links are better positioned on mobile.
- Vercel no longer shows the `next.config.ts` TypeScript-loading warning.
