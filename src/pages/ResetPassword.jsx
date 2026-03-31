import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Eye, EyeOff, Loader2, XCircle, CheckCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import api from '../utils/api.js';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('verifying'); // verifying | valid | invalid | success
  const [userEmail, setUserEmail] = useState('');
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // On mount — verify the token against the DB
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await api.get(`/auth/verify-reset-token/${token}`);
        setUserEmail(data.email);
        setStatus('valid');
      } catch (err) {
        // Token is invalid or expired
        setStatus('invalid');
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.confirm) {
      toast.error('Please fill in both fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Submit new password; server clears the token from DB on success
      await api.post(`/auth/reset-password/${token}`, { password: form.password });
      setStatus('success');
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // ── Verifying ──
  if (status === 'verifying') {
    return (
      <AuthLayout title="Verifying link..." subtitle="Please wait while we check your reset link">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(123,0,255,0.2)', borderTop: '3px solid #7B00FF', animation: 'spin 0.8s linear infinite' }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AuthLayout>
    );
  }

  // ── Invalid / expired token ──
  if (status === 'invalid') {
    return (
      <AuthLayout title="Link expired" subtitle="This password reset link is invalid or has expired">
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,107,122,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,107,122,0.3)' }}>
              <XCircle size={28} color="#FF6B7A" />
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Reset links expire after <strong style={{ color: '#FF6B7A' }}>1 hour</strong> for security. Request a new one below.
          </p>
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <button className="btn-brand">Request new link</button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Success ──
  if (status === 'success') {
    return (
      <AuthLayout title="Password reset!" subtitle="Your password has been updated successfully">
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(34,197,94,0.3)' }}>
              <CheckCircle size={28} color="#22c55e" />
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Redirecting you to login...
          </p>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-brand">Go to login</button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Valid token — show reset form ──
  return (
    <AuthLayout title="Reset password" subtitle={`Setting new password for ${userEmail}`}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
        <div>
          <label className="label">New password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="label">Confirm new password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              value={form.confirm}
              onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
              style={{ paddingLeft: '2.5rem' }}
              autoComplete="new-password"
            />
          </div>
          {form.confirm && (
            <p style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: form.password === form.confirm ? '#22c55e' : '#FF6B7A' }}>
              {form.password === form.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}
            </p>
          )}
        </div>

        <button className="btn-brand" type="submit" disabled={loading} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Resetting...</> : 'Reset password'}
        </button>
      </form>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthLayout>
  );
}
