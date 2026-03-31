import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      toast.error('Please fill in all fields');
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
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const FieldIcon = ({ icon: Icon }) => (
    <Icon size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
  );

  return (
    <AuthLayout title="Create account" subtitle="Join AuthFlow — it's completely free">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Name */}
        <div>
          <label className="label">Full name</label>
          <div style={{ position: 'relative' }}>
            <FieldIcon icon={User} />
            <input className="input-field" type="text" name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} autoComplete="name" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label">Email address</label>
          <div style={{ position: 'relative' }}>
            <FieldIcon icon={Mail} />
            <input className="input-field" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} autoComplete="email" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div style={{ position: 'relative' }}>
            <FieldIcon icon={Lock} />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label">Confirm password</label>
          <div style={{ position: 'relative' }}>
            <FieldIcon icon={Lock} />
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              name="confirm"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
              style={{ paddingLeft: '2.5rem' }}
              autoComplete="new-password"
            />
          </div>
          {/* Inline match indicator */}
          {form.confirm && (
            <p style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: form.password === form.confirm ? '#22c55e' : '#FF6B7A' }}>
              {form.password === form.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}
            </p>
          )}
        </div>

        <button className="btn-brand" type="submit" disabled={loading} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Creating account...</> : 'Create account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#B500B2', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
          Sign in
        </Link>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthLayout>
  );
}
