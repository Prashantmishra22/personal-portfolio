import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      overflow: 'hidden',
      background: 'url("/mountain-bg.png") center/cover no-repeat',
    }}>
      {/* Dark overlay to make text readable */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.7) 50%, rgba(5,5,8,0.8) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 80 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 500px', maxWidth: 700 }}
          >
            <h1 style={{ 
              fontFamily: 'Space Grotesk', 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              fontWeight: 800, 
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '-1px'
            }}>
              Prashant Mishra
            </h1>
            
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap'
            }}>
              And I'm a <span style={{ color: 'var(--accent)' }}>
                <TypeAnimation
                  sequence={[
                    'Data Science Student', 1000,
                    'Machine Learning Engineer', 1000,
                    'Full Stack Developer', 1000,
                    'Data Analyst', 1000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h2>

            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: 1.8, 
              marginBottom: 32,
              maxWidth: 600
            }}>
              I'm a professional developer and data enthusiast with strong skills in Python, Machine Learning, Data Visualization, and Full-Stack Web Development. I enjoy turning complex data into meaningful insights and building intelligent systems that solve real-world problems.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
              {[
                { icon: <FaGithub />, link: 'https://github.com/Prashantmishra22' },
                { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/prashantmishra33/' },
                { icon: <FaEnvelope />, link: 'mailto:pm9569mishraji@gmail.com' }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '2px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', fontSize: '1.2rem',
                    transition: 'all 0.3s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.boxShadow = '0 0 15px var(--glow-accent)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <a href="/cv.pdf" download className="btn-primary" style={{ padding: '14px 32px' }}>
                Download CV <FaDownload style={{ marginLeft: 8 }} />
              </a>
              <a href="#portfolio" className="btn-secondary" style={{ padding: '14px 32px' }}>
                Portfolio
              </a>
            </div>
          </motion.div>

          {/* Right Content - Hexagon Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <div style={{ position: 'relative', width: 450, height: 450, maxWidth: '100%' }}>
              {/* Glowing aura behind hexagon */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '100%', height: '100%',
                background: 'var(--accent)',
                filter: 'blur(60px)', opacity: 0.3,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                animation: 'pulseGlow 4s infinite alternate'
              }} />
              
              {/* Profile Image with Hexagon Clip Path */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '95%', height: '95%',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'var(--accent)',
                padding: 4, // creates a border effect
              }}>
                <img 
                  src="/profile.jpg" 
                  alt="Prashant Mishra"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: 'var(--bg-secondary)', // Fallback while loading
                    display: 'block' // Ensures no extra space below image
                  }}
                />
                
                {/* Fallback styling if image doesn't exist */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'var(--accent)', opacity: 0.1, zIndex: 1, pointerEvents: 'none',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 150,
        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        zIndex: 1, pointerEvents: 'none'
      }} />

      <style>{`
        @keyframes pulseGlow {
          0% { filter: blur(40px); opacity: 0.2; transform: translate(-50%, -50%) scale(0.95); }
          100% { filter: blur(60px); opacity: 0.4; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
