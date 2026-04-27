import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaSearch, FaFilter, FaClock, FaCode } from 'react-icons/fa';

const GITHUB_USERNAME = 'Prashantmishra22';

/* Map repo names → enriched metadata for recruiter display */
const repoMeta = {
  'ecommerce-analysis': {
    description: 'End-to-end e-commerce customer behaviour analysis: sales trends, product performance, customer segmentation, and RFM scoring using Python & Pandas.',
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    category: 'Data Analysis',
    highlight: true,
    emoji: '🛒',
  },
  'supermarket-sales-dashboard': {
    description: 'Interactive Power BI dashboard visualizing supermarket KPIs — revenue trends, category breakdown, and branch comparisons across real sales data.',
    techStack: ['Power BI', 'DAX', 'Python', 'Excel'],
    category: 'Visualization',
    highlight: true,
    emoji: '📊',
  },
  'secure-file-system': {
    description: 'Full-stack secure file management system with JWT authentication, role-based access, MongoDB storage, and Multer-based encrypted file uploads.',
    techStack: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT', 'Multer'],
    category: 'Full Stack',
    highlight: true,
    emoji: '🔐',
  },
  'SmartParkINDIA': {
    description: 'Smart parking solution for Indian cities — real-time slot tracking, booking system, and location-based UI deployed on Vercel.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web App',
    highlight: false,
    emoji: '🚗',
  },
  'Dictionary22': {
    description: 'Elegant dictionary web app with real-time word definitions, phonetics, synonyms, and antonyms fetched from the Free Dictionary API.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    category: 'Web App',
    highlight: false,
    emoji: '📖',
  },
  'dictionary': {
    description: 'Dictionary application powered by a public REST API — clean UI for word lookup with definitions, parts of speech, and usage examples.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web App',
    highlight: false,
    emoji: '📚',
  },
  'che-project-2': {
    description: 'Chemistry educational resource project — structured academic content with a clean, accessible web interface.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web App',
    highlight: false,
    emoji: '🧪',
  },
  'Recipe-Box': {
    description: 'Recipe discovery app featuring meal ideas, ingredient lists, and step-by-step cooking instructions with a responsive, card-based layout.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'API'],
    category: 'Web App',
    highlight: false,
    emoji: '🍳',
  },
};

const categoryColors = {
  'Data Analysis':  { bg: 'rgba(37,99,235,0.1)',   border: 'rgba(37,99,235,0.3)',   text: '#60a5fa' },
  'Visualization':  { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.3)',  text: '#c084fc' },
  'Full Stack':     { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.3)',  text: '#f472b6' },
  'Web App':        { bg: 'rgba(0,212,255,0.1)',   border: 'rgba(0,212,255,0.3)',   text: '#00d4ff' },
  'Machine Learning':{ bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)',   text: '#34d399' },
  'NLP':            { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.3)',   text: '#fbbf24' },
  'Other':          { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)', text: '#cbd5e1' },
};

const langColors = {
  Python:     '#3776ab', JavaScript: '#f7df1e', HTML: '#e34f26',
  TypeScript: '#3178c6', CSS: '#264de4', Jupyter: '#f37626',
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

function formatName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const ALL_CATEGORIES = ['All', 'Data Analysis', 'Visualization', 'Full Stack', 'Web App', 'Machine Learning', 'NLP'];

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork));
        } else {
          setError('GitHub API rate limit reached. Showing cached data.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not reach GitHub. Check your connection.');
        setLoading(false);
      });
  }, []);

  const enriched = repos.map(repo => ({
    ...repo,
    ...(repoMeta[repo.name] || {
      description: repo.description || 'A GitHub project by Prashant Mishra.',
      techStack: repo.language ? [repo.language] : ['Code'],
      category: 'Other',
      highlight: false,
      emoji: '📁',
    }),
  }));

  const filtered = enriched.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.techStack || []).some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const highlighted = filtered.filter(r => r.highlight);
  const rest = filtered.filter(r => !r.highlight);

  const catColor = (cat) => categoryColors[cat] || categoryColors['Other'];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 40, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: 10 }}>Featured <span className="gradient-text">Portfolio</span></h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>A selection of my best projects fetched live from GitHub.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', background: 'rgba(0,212,255,0.05)', padding: '10px 20px', borderRadius: 30, border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <FaGithub style={{ fontSize: '1.2rem' }} />
            View GitHub
            <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
          </a>
        </div>
      </div>

      {/* Stats bar */}
      {!loading && repos.length > 0 && (
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {[
            { label: 'Total Repos',   value: repos.length, icon: <FaCodeBranch />, color: '#00d4ff' },
            { label: 'Total Stars',   value: repos.reduce((a, r) => a + r.stargazers_count, 0), icon: <FaStar />, color: '#f59e0b' },
            { label: 'Languages',     value: [...new Set(repos.map(r => r.language).filter(Boolean))].length, icon: <FaCode />, color: '#a855f7' },
            { label: 'Live Projects', value: repos.filter(r => r.homepage).length, icon: <FaExternalLinkAlt />, color: '#10b981' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.5rem', boxShadow: `0 0 15px ${s.color}20` }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontFamily: 'Space Grotesk', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 8 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search + Filter */}
      <div className="glass-card" style={{ marginBottom: 40, padding: '20px' }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 300px', minWidth: 250 }}>
            <FaSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem' }} />
            <input
              className="dash-input"
              style={{ paddingLeft: 46 }}
              placeholder="Search projects, technologies, keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <FaFilter style={{ color: 'var(--text-muted)', alignSelf: 'center', fontSize: '1rem', marginRight: 8 }} />
            {ALL_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const cc = catColor(cat);
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '8px 16px', borderRadius: 20, border: isActive ? `1px solid ${cc.border}` : '1px solid var(--border)',
                  background: isActive ? cc.bg : 'transparent',
                  color: isActive ? cc.text : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s',
                  fontFamily: 'Inter',
                }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20, animation: 'spin 1.5s linear infinite', display: 'inline-block' }}>⚙️</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Fetching repositories from GitHub...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ padding: '16px 24px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, marginBottom: 30, color: 'var(--danger)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Highlighted Projects */}
      {!loading && highlighted.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>⭐ Featured Projects</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
          </div>
          <div className="grid-3" style={{ marginBottom: 40 }}>
            {highlighted.map(repo => <RepoCard key={repo.id} repo={repo} catColor={catColor} isHovered={hoveredId === repo.id} onHover={setHoveredId} />)}
          </div>
        </>
      )}

      {/* All other repos */}
      {!loading && rest.length > 0 && (
        <>
          {highlighted.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 2 }}>Other Repositories</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
          )}
          <div className="grid-3">
            {rest.map(repo => <RepoCard key={repo.id} repo={repo} catColor={catColor} isHovered={hoveredId === repo.id} onHover={setHoveredId} />)}
          </div>
        </>
      )}

      {/* No results */}
      {!loading && filtered.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>🔍</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No projects matched your search.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="btn-secondary" style={{ marginTop: 24 }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Project Card ── */
function RepoCard({ repo, catColor, isHovered, onHover }) {
  const cc = catColor(repo.category);
  const langColor = langColors[repo.language] || '#94a3b8';

  return (
    <a
      href={repo.html_url}
      target="_blank" rel="noreferrer"
      onMouseEnter={() => onHover(repo.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit',
        background: 'var(--bg-card)', border: `1px solid ${isHovered ? cc.border : 'var(--border)'}`,
        borderRadius: 20, padding: '24px', backdropFilter: 'blur(16px)',
        boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${cc.bg}` : '0 4px 20px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-8px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${cc.text}, transparent)`,
        opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>{repo.emoji || '📁'}</span>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {formatName(repo.name)}
          </h3>
        </div>
      </div>

      {/* Category Tag */}
      <div style={{ marginBottom: 16 }}>
        <span style={{
          padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
          background: cc.bg, border: `1px solid ${cc.border}`, color: cc.text,
        }}>
          {repo.category}
        </span>
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7,
        marginBottom: 20, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {repo.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {(repo.techStack || []).slice(0, 5).map((t, i) => (
          <span key={i} className="dash-tag" style={{ fontSize: '0.75rem', padding: '4px 12px', border: '1px solid var(--border)' }}>{t}</span>
        ))}
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 16, borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {/* Language */}
          {repo.language && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: langColor, display: 'inline-block' }} />
              {repo.language}
            </span>
          )}
          {/* Stars */}
          {repo.stargazers_count > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.85rem', color: '#f59e0b' }}>
              <FaStar /> {repo.stargazers_count}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {repo.homepage && (
            <span
              onClick={(e) => { e.preventDefault(); window.open(repo.homepage, '_blank'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                color: '#000', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 15px var(--glow-accent)',
              }}
            >
              <FaExternalLinkAlt /> Live
            </span>
          )}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
            borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600,
          }}>
            <FaGithub /> Code
          </span>
        </div>
      </div>
    </a>
  );
}
