import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import api from '../utils/api.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Reset link sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={sent ? 'Check your email' : 'Forgot password?'}
      subtitle={sent ? `We sent a reset link to ${email}` : 'Enter your email and we\'ll send you a reset link'}
    >
      {sent ? (
        <div style={{ textAlign: 'center' }}>
          {/* Success icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(123,0,255,0.15), rgba(181,0,178,0.15))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(181,0,178,0.3)',
            }}>
              <CheckCircle size={28} color="#B500B2" />
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            The link expires in <strong style={{ color: '#B500B2' }}>1 hour</strong>. Check your spam folder if you don't see it.
          </p>

          <button
            className="btn-brand"
            onClick={() => { setSent(false); setEmail(''); }}
            style={{ marginBottom: '1rem' }}
          >
            Send another link
          </button>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowLeft size={14} /> Back to login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <div>
            <label className="label">Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
              <input
                className="input-field"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="email"
              />
            </div>
          </div>

          <button className="btn-brand" type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending...</> : 'Send reset link'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowLeft size={14} /> Back to login
            </Link>
          </div>
        </form>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthLayout>
  );
}
