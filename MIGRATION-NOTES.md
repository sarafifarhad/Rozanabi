# Rozana v54.69 Notes

- Uses Zoho SMTP for the contact form.
- Resend is not required in this build.
- Cloudflare Turnstile is controlled by Vercel environment variables:
  - `TURNSTILE_SECRET_KEY`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- No database is included.


## v54.70 Turnstile and Cookie Settings fix
- Turnstile preview is now hidden when a real Site Key is available.
- Cloudflare Turnstile is rendered explicitly after `/api/contact-config` returns the Site Key.
- Cookie Settings buttons now keep working even after a previous consent choice exists in localStorage.
- Save Choices button now becomes visible correctly by removing the `is-hidden-init` class.
