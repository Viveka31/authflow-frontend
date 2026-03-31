import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a003a' }}>
    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(123,0,255,0.25)', borderTop: '3px solid #7B00FF', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Only redirect to /dashboard if user IS logged in and tries to access auth pages
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

// Only allow access if logged in, else redirect to /login
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(30, 5, 60, 0.97)',
              border: '1px solid rgba(123,0,255,0.35)',
              color: '#f0e8ff',
              fontFamily: 'DM Sans, sans-serif',
              borderRadius: '12px',
              backdropFilter: 'blur(16px)',
            },
            success: { iconTheme: { primary: '#B500B2', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#FF6B7A', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public landing — anyone can view */}
          <Route path="/" element={<Landing />} />

          {/* Auth pages — redirect to /dashboard if already logged in */}
          <Route path="/login"           element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register"        element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

          {/* Reset password — no auth guard, token in URL handles security */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected — must be logged in */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          {/* Fallback — unknown routes go to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
