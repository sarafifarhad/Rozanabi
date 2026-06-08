# Rozana v54.79 — Mobile, Footer, FAQ and Demo Card Polish

## Source
Based on `rozana_next_app_v54_78_mobile_demo_polish.zip`.

## Fixes applied

1. **Our Mission card**
   - Reworked the mobile presentation of the home `Our Mission` image/card.
   - The image and copy are now separated on small screens instead of being cramped into one overlay.
   - Copy, partner note, image height, and spacing are controlled for mobile.

2. **Practical Case Study overflow**
   - Added mobile text wrapping protections for long headings and labels.
   - Removed forced no-wrap behavior on highlighted heading spans in mobile view.
   - This prevents `Practical Case Study` and similar headings from pushing outside the viewport.

3. **Home hero alignment**
   - Center-aligned the home hero headline, description, eyebrow, and buttons on mobile.
   - This keeps the header copy away from the left edge and improves visual balance.

4. **Footer spacing/cards**
   - Added mobile card-style padding to footer blocks.
   - Improved spacing so footer text does not sit too close to the left edge.
   - Footer bottom now centers copyright, Cookie Policy, and Cookie Settings.

5. **CogniGum logo removed**
   - Removed CogniGum from the trusted-logo carousel for now.

6. **Cookie Policy / Cookie Settings footer alignment**
   - Centered footer legal links and cookie settings in the bottom footer area.

7. **Landing page hero button spacing**
   - Reduced spacing between landing page hero text and CTA buttons.
   - Mobile hero CTA spacing is now tighter and more consistent.

8. **Landing page FAQ answers**
   - Fixed FAQ accordion answer visibility.
   - Open FAQ items now show answer text correctly using `max-height` and opacity states.

9. **Demo card preview images**
   - Replaced generic demo card previews with custom, page-specific preview images.
   - Each card image now visually reflects the actual demo page type and content:
     - Dental clinic
     - Beauty clinic
     - Café & restaurant
     - Service company
     - Training institute
     - Real estate advisor
   - Updated preview image CSS so images fill the card browser area properly.

10. **Versioning**
   - Updated package version to `54.79.0`.

## Files changed

- `public/index.html`
- `public/assets/css/mobile-polish.css`
- `public/assets/images/demo-previews/demo-dental-clinic-preview.png`
- `public/assets/images/demo-previews/demo-beauty-clinic-preview.png`
- `public/assets/images/demo-previews/demo-cafe-preview.png`
- `public/assets/images/demo-previews/demo-service-company-preview.png`
- `public/assets/images/demo-previews/demo-training-institute-preview.png`
- `public/assets/images/demo-previews/demo-real-estate-preview.png`
- `package.json`
- `package-lock.json`

## Validation

- `npm install --prefer-offline --no-audit`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- `npx tsc --noEmit`: passed
- Internal asset references: 0 missing
- JSON-LD parse check: passed
- Demo preview image count: 6/6
- CogniGum HTML references: removed
- Placeholder checks: passed

## Recommended pages to check after deploy

- `https://rozanabi.com/`
- `https://rozanabi.com/about`
- `https://rozanabi.com/use-cases`
- `https://rozanabi.com/landing-page-oman`
- `https://rozanabi.com/landing-page-oman#demo-pages`
- `https://rozanabi.com/landing-page-oman#faq`
