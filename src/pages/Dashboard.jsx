import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogOut, User, Shield, Mail, Calendar, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Stat = ({ icon: Icon, label, value }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '1rem',
    padding: '1.1rem 1.25rem',
    display: 'flex', alignItems: 'center', gap: '0.875rem',
    backdropFilter: 'blur(12px)',
    minWidth: 0, /* prevent overflow */
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: '0.75rem', flexShrink: 0,
      background: 'linear-gradient(135deg, rgba(123,0,255,0.5), rgba(181,0,178,0.5))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 0 16px rgba(181,0,178,0.4)',
    }}>
      <Icon size={17} color="white" />
    </div>
    <div style={{ minWidth: 0 }}>
      <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{label}</p>
      <p style={{ margin: '0.1rem 0 0', fontSize: '0.9rem', color: 'white', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  const joined = user?.id
    ? new Date(parseInt(user.id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #1a003a 0%, #2d0060 30%, #4a0080 60%, #2a0050 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,0,255,0.55) 0%, transparent 60%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '0%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,0,178,0.5) 0%, transparent 60%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '40%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,122,0.35) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      {/* Nav */}
      <nav style={{
        position: 'relative', zIndex: 20,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.04)',
        gap: '1rem',
      }}>
        <span className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', flexShrink: 0 }}>
          AuthFlow
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #7B00FF, #FF6B7A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.875rem', fontWeight: 800, color: 'white',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</span>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.45rem 0.875rem', flexShrink: 0 }}>
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: 860, margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3rem) 1.25rem', animation: 'var(--animate-slide-up)' }}>

        {/* Welcome banner */}
        <div style={{
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '1.5rem', padding: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: '1.5rem', backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 48px rgba(123,0,255,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '1rem', flexShrink: 0,
              background: 'linear-gradient(135deg, #7B00FF, #B500B2, #FF6B7A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-display)',
              boxShadow: '0 0 32px rgba(181,0,178,0.6)',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: 'white', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
                Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}!</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', margin: 0 }}>
                You're securely authenticated.
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid — 2 cols on mobile, 4 on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.875rem',
          marginBottom: '1.5rem',
        }}>
          <Stat icon={User}     label="Full name"    value={user?.name} />
          <Stat icon={Mail}     label="Email"        value={user?.email} />
          <Stat icon={Calendar} label="Member since" value={joined} />
          <Stat icon={Shield}   label="Auth status"  value="Verified ✓" />
        </div>

        {/* Info card */}
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '1.25rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', backdropFilter: 'blur(16px)' }}>
          <Zap size={17} color="#FFB085" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'white', margin: '0 0 0.3rem', fontSize: '0.9375rem' }}>Password reset flow is active</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Sign out and click "Forgot password?" on the login page to test the full email reset flow.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
