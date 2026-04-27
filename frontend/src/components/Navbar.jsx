import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      let currentActive = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = section;
            break;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      // Adjust offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 24px',
        background: scrolled ? 'rgba(5, 5, 8, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNav(e, '#home')} style={{ textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#000',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
            }}>P</div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20, color: 'var(--text-primary)' }}>
              P. Mishra<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </motion.div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => {
            const isActive = active === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                  padding: '8px 16px', borderRadius: 8, transition: 'all 0.3s',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute', bottom: 0, left: '15%', right: '15%',
                      height: 2, background: 'var(--accent)', borderRadius: 2
                    }}
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href="/admin"
            whileHover={{ scale: 1.05 }}
            style={{
              marginLeft: 16, padding: '8px 24px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid var(--accent)',
              color: 'var(--accent)', borderRadius: 30, fontSize: '0.9rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s',
            }}
          >
            Admin
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          className="mobile-menu-btn"
        >
          <div style={{ width: 24, height: 2, background: 'var(--accent)', marginBottom: 6, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: 'var(--accent)', marginBottom: 6, opacity: mobileOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: 'var(--accent)', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(5, 5, 8, 0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px 24px' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  color: active === link.href.substring(1) ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer',
                  padding: '16px 0', textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a href="/admin" style={{
               display: 'block', width: '100%', textAlign: 'center', marginTop: 24,
               padding: '12px 0', background: 'var(--accent)', color: '#000',
               borderRadius: 8, fontWeight: 700, textDecoration: 'none'
            }}>Admin Panel</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
