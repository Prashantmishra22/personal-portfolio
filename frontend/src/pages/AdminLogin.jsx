import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginAdmin } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setError('');
    try {
      const res = await loginAdmin(form);
      login(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px 14px 48px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, color: '#f8fafc', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'Inter', transition: 'all 0.3s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -200, right: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20, boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
            🔐
          </motion.div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Admin Portal</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Sign in to manage your portfolio</p>
        </div>

        <div className="glass-card" style={{ padding: '40px 36px', border: '1px solid rgba(124,58,237,0.2)' }}>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, marginBottom: 24, color: '#ef4444', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              ⚠️ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 14 }} />
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required placeholder="admin@portfolio.com"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 14 }} />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required placeholder="••••••••"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 14 }}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? (
                <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Signing in...</>
              ) : '🚀 Sign In'}
            </motion.button>
          </form>

          <div style={{ marginTop: 24, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: '#475569', fontSize: '0.8rem', textAlign: 'center', marginBottom: 4 }}>Setup admin (run once):</p>
            <code style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', textAlign: 'center' }}>POST /api/auth/setup</code>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Portfolio</a>
        </p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
