import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#000' }}>P</div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 22, color: 'var(--text-primary)' }}>P. Mishra<span style={{ color: 'var(--accent)' }}>.</span></span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', maxWidth: 320, marginBottom: 30 }}>
              Data Science student passionate about turning complex data into actionable insights that drive real-world impact.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { href: 'https://github.com/Prashantmishra22', icon: <FaGithub />, color: '#f8fafc' },
                { href: 'https://www.linkedin.com/in/prashantmishra33/', icon: <FaLinkedin />, color: '#0077b5' },
                { href: 'mailto:pm9569mishraji@gmail.com', icon: <FaEnvelope />, color: 'var(--accent)' },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  whileHover={{ scale: 1.15, color: s.color }}
                  style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${s.color}15`; e.currentTarget.style.borderColor = `${s.color}50`; e.currentTarget.style.color = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem', fontFamily: 'Space Grotesk' }}>Navigation</h4>
            {['Home', 'About', 'Skills', 'Services', 'Portfolio'].map(page => (
              <a key={page} href={`#${page.toLowerCase()}`}
                onClick={e => { 
                  e.preventDefault(); 
                  const el = document.querySelector(`#${page.toLowerCase()}`);
                  if(el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 70;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 16, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{page}</a>
            ))}
          </div>

          {/* More */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem', fontFamily: 'Space Grotesk' }}>More</h4>
            {['Experience', 'Dashboard', 'Contact', 'Admin'].map((page, i) => (
              <a key={page} href={page === 'Admin' ? '/admin' : `#${page.toLowerCase()}`}
                onClick={page !== 'Admin' ? e => { 
                  e.preventDefault(); 
                  const el = document.querySelector(`#${page.toLowerCase()}`);
                  if(el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 70;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                } : undefined}
                style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 16, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{page}</a>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem', fontFamily: 'Space Grotesk' }}>Tech Stack</h4>
            {['Python', 'Pandas', 'Scikit-learn', 'Power BI', 'MongoDB', 'React.js'].map(tech => (
              <div key={tech} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 32 }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            © {new Date().getFullYear()} P. Mishra. Made with <FaHeart style={{ color: 'var(--danger)', fontSize: '0.9rem' }} /> using React & Tailwind
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <motion.button onClick={scrollTop} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '0 4px 20px rgba(0,212,255,0.4)' }}>
              <FaArrowUp />
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:1024px){ footer .container>div:first-child{grid-template-columns:1fr 1fr!important;} } @media(max-width:600px){ footer .container>div:first-child{grid-template-columns:1fr!important;} }`}</style>
    </footer>
  );
}
