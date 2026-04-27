import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';

/* ── Single Page Portfolio Layout ── */
function PortfolioPage() {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <main>
        <div id="home"><Hero /></div>
        
        <div id="about" className="section-padding container">
          <About />
        </div>
        
        <div id="skills" className="section-padding container" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Skills />
        </div>
        
        <div id="services" className="section-padding">
          <Services />
        </div>
        
        <div id="portfolio" className="section-padding container" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Projects />
        </div>
        
        <div id="experience" className="section-padding container">
          <Experience />
        </div>
        
        <div id="dashboard" className="section-padding container" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Dashboard />
        </div>
        
        <div id="contact" className="section-padding container">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes remain separate */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />

          {/* Main portfolio is a single scrolling page */}
          <Route path="/" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
