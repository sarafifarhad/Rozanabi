# Rozana v54.83 — Mobile Menu, Contact URL, Landing Header, and Home Alignment Fixes

## Fixed

1. Replaced the mobile menu's simple waterfall/slide reveal with a visible colored stepped light effect. Each item receives a sequential glow sweep using gold, purple, blue and green tones.
2. Changed the Contact hero `Start a Conversation` control from an anchor to a button, so clicking it scrolls to the form without changing the address bar to `/contact#contact`.
3. Removed remaining `/contact#contact` links from public HTML and converted them to `/contact`.
4. Matched Landing Page Design mobile hero buttons to the compact full-width rhythm used by other page headers.
5. Returned the Home hero copy to the original left-aligned mobile placement.
6. Updated package version to 54.83.0 and cookie consent key to `rz-cookie-consent-v54-83`.

## Verification targets after deploy

- `/` on mobile: hero copy should be left aligned.
- `/contact` on mobile/desktop: clicking Start a Conversation should not add `#contact` to the URL.
- Mobile menu: open menu should show colored sequential glow effect on menu items.
- `/landing-page-oman` on mobile: Request Free Review and View Demo Layouts should use compact full-width button spacing.
