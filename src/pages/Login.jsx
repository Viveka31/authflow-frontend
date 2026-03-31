import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
        {/* Email */}
        <div>
          <label className="label">Email address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              style={{ paddingLeft: '2.5rem' }}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
            <label className="label" style={{ margin: 0 }}>Password</label>
            <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: '#B500B2', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
              Forgot password?
            </Link>
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button className="btn-brand" type="submit" disabled={loading} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Signing in...</> : 'Sign in'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#B500B2', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
          Create one
        </Link>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthLayout>
  );
}
