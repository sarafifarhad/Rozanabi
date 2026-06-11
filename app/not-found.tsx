export const metadata = {
  title: 'Page Not Found | Rozana Business Intelligence',
  description: 'The page you are looking for could not be found. Return to Rozana Business Intelligence or contact the team for help.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '32px',
        background: 'radial-gradient(circle at 20% 10%, rgba(207,179,91,.18), transparent 34%), linear-gradient(135deg, #140d24 0%, #24133f 54%, #090713 100%)',
        color: '#f8f6ff',
        fontFamily: 'Inter, DM Sans, system-ui, -apple-system, Segoe UI, sans-serif',
      }}
    >
      <section
        style={{
          width: 'min(760px, 100%)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: '28px',
          padding: 'clamp(28px, 6vw, 56px)',
          background: 'rgba(255,255,255,.06)',
          boxShadow: '0 28px 90px rgba(0,0,0,.35)',
          textAlign: 'center',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 22px',
            transform: 'rotate(45deg)',
            border: '2px solid #cfb35b',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid rgba(248,246,255,.85)',
              display: 'block',
            }}
          />
        </div>
        <p style={{ margin: '0 0 10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#cfb35b', fontWeight: 700, fontSize: '12px' }}>
          404 / Page Not Found
        </p>
        <h1 style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 64px)', lineHeight: 1.02, letterSpacing: '-.04em' }}>
          This page is not available.
        </h1>
        <p style={{ margin: '18px auto 0', maxWidth: '560px', color: 'rgba(248,246,255,.74)', fontSize: '17px', lineHeight: 1.7 }}>
          The link may have changed, or the page may no longer exist. Return to the Rozana homepage or contact us for support.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '30px' }}>
          <a
            href="/"
            style={{
              borderRadius: '999px',
              padding: '13px 20px',
              background: '#cfb35b',
              color: '#171326',
              textDecoration: 'none',
              fontWeight: 800,
            }}
          >
            Back to Home
          </a>
          <a
            href="/contact"
            style={{
              borderRadius: '999px',
              padding: '13px 20px',
              border: '1px solid rgba(255,255,255,.2)',
              color: '#f8f6ff',
              textDecoration: 'none',
              fontWeight: 800,
            }}
          >
            Contact Rozana
          </a>
        </div>
      </section>
    </main>
  );
}
