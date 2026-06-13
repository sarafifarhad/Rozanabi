# Rozana v55.22 — Afrooz product share and WhatsApp order fix

## Updated
- Added product-specific share pages for all Afrooz products, each with correct Open Graph/Twitter metadata and a product image preview.
- Generated 1200×630 JPG share images for all Afrooz products.
- Updated the modal Share button to share the product-specific URL and, where supported by the device/browser, share the product image file directly.
- Updated the product Order on WhatsApp message to include product link, product image link, product name, size, type, notes and best-for information.
- Added clean routes in `next.config.mjs` for all product share pages.

## Note
WhatsApp `wa.me` links cannot attach an image file automatically like a manual upload. This update uses product-specific link previews and an image URL so WhatsApp can show the correct product image preview and the store receives the image reference with the order details.
