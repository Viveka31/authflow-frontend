import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Landing() {
  const { user, loading } = useAuth();

  // If logged in, skip landing and go straight to dashboard
  if (!loading && user) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #1a003a 0%, #2d0060 25%, #500090 50%, #B500B2 80%, #FF6B7A 100%)',
      overflowX: 'hidden', position: 'relative',
    }}>
      {/* Vivid orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,0,255,0.65) 0%, transparent 58%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', top: '25%', right: '-8%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,0,178,0.6) 0%, transparent 58%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '0%', left: '30%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,122,0.5) 0%, transparent 58%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', top: '60%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,176,133,0.4) 0%, transparent 58%)', filter: 'blur(60px)' }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 20, padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <span className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
          AuthFlow
        </span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost" style={{ fontSize: '0.9rem' }}>Log in</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="btn-brand" style={{ width: 'auto', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Get started</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '6rem 1.5rem 8rem', maxWidth: 820, margin: '0 auto', animation: 'var(--animate-fade-in)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', padding: '0.45rem 1.1rem', marginBottom: '2.25rem', backdropFilter: 'blur(12px)', boxShadow: '0 0 30px rgba(255,107,122,0.3)' }}>
          <Sparkles size={13} color="#FFB085" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: '#FFB085', fontWeight: 700, letterSpacing: '0.09em' }}>
            FULL-STACK MERN AUTH
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(3rem, 7.5vw, 5.5rem)', lineHeight: 1.06, letterSpacing: '-0.035em', color: 'white', margin: '0 0 1.75rem', textShadow: '0 2px 40px rgba(123,0,255,0.4)' }}>
          Authentication,<br />
          <span className="text-gradient">done right.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 3rem' }}>
          Secure register, login &amp; email-verified password reset — built with React, Node.js, Express and MongoDB.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="btn-brand" style={{ width: 'auto', padding: '1rem 2.5rem', fontSize: '1.0625rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 0 40px rgba(123,0,255,0.55)' }}>
              Create account <ArrowRight size={17} />
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1.0625rem' }}>Sign in</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
