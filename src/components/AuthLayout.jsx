import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #1a003a 0%, #2d0060 30%, #4a0080 55%, #2a0050 80%, #1a003a 100%)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,0,255,0.7) 0%, transparent 62%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,0,178,0.65) 0%, transparent 62%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '45%', right: '18%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,122,0.45) 0%, transparent 62%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '25%', left: '12%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,176,133,0.35) 0%, transparent 62%)', filter: 'blur(50px)' }} />
      </div>

      {/* Nav */}
      <nav style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
            AuthFlow
          </span>
        </Link>
      </nav>

      {/* Card — full width on mobile, capped on desktop */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem 1rem 2.5rem', position: 'relative', zIndex: 10,
      }}>
        <div style={{ width: '100%', maxWidth: 480, minWidth: 0, animation: 'var(--animate-slide-up)' }}>
          <div className="auth-card gradient-border" style={{ width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(1.4rem, 5vw, 1.85rem)',
                color: 'white', margin: '0 0 0.4rem', letterSpacing: '-0.025em',
              }}>
                {title}
              </h1>
              {subtitle && (
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                  {subtitle}
                </p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
