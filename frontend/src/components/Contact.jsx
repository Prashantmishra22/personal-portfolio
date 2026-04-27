import { useState, useRef } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_zq7hu07';
const EMAILJS_TEMPLATE_ID = 'prashant9569';
const EMAILJS_PUBLIC_KEY  = 'XOzTiKRF3wWnW2ohS';

export default function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle');   // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMsg(
        err?.text || 'Message could not be sent. Please try again or email me directly.'
      );
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <div>
      <h1 className="section-title">Get in <span className="gradient-text">Touch</span></h1>
      <p className="section-subtitle">Interested in collaborating or have a question? Feel free to reach out.</p>

      <div className="grid-2">
        {/* ── Contact Form ── */}
        <div className="glass-card">
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', marginBottom: 24, color: 'var(--text-primary)' }}>
            Send a secure message
          </h2>

          {status === 'success' && (
            <div style={{
              padding: '16px', background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12,
              marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
              color: 'var(--success)', animation: 'fadeIn 0.3s ease'
            }}>
              <FaCheckCircle style={{ fontSize: '1.2rem' }} /> Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div style={{
              padding: '16px', background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12,
              marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
              color: 'var(--danger)', animation: 'fadeIn 0.3s ease'
            }}>
              <FaExclamationCircle style={{ fontSize: '1.2rem' }} /> {errorMsg}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Full Name</label>
              <input
                name="from_name"
                className="dash-input"
                required
                value={form.from_name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Email Address</label>
              <input
                name="from_email"
                type="email"
                className="dash-input"
                required
                value={form.from_email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Message Payload</label>
              <textarea
                name="message"
                className="dash-input"
                required
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your inquiry..."
                style={{ resize: 'vertical' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1, width: '100%', marginTop: 10 }}
            >
              {status === 'loading' ? (
                <>
                  <span style={{
                    width: 18, height: 18, border: '2px solid rgba(0,0,0,0.2)',
                    borderTop: '2px solid #000', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block'
                  }} />
                  Dispatching...
                </>
              ) : (
                <><FaPaperPlane /> Dispatch Message</>
              )}
            </button>
          </form>
        </div>

        {/* ── Connection Details ── */}
        <div className="glass-card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', marginBottom: 24, color: 'var(--text-primary)' }}>Connection Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Direct Email</p>
              <a href="mailto:pm9569mishraji@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>pm9569mishraji@gmail.com</a>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Professional Network</p>
              <a href="https://www.linkedin.com/in/prashantmishra33/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>LinkedIn Profile ↗</a>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Code Repository</p>
              <a href="https://github.com/Prashantmishra22" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>GitHub Profile ↗</a>
            </div>
          </div>

          <div style={{
            marginTop: 32, display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 20px', background: 'rgba(16,185,129,0.1)',
            borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)'
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite', boxShadow: '0 0 10px var(--success)' }}></div>
            <span style={{ fontSize: '0.95rem', color: 'var(--success)', fontWeight: 600 }}>Accepting new opportunities</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
