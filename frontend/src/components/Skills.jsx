import { useState } from 'react';

const skillCategories = [
  {
    name: 'Programming',
    icon: '💻',
    color: '#00d4ff', // Cyan
    skills: [
      { name: 'Python', level: 90, icon: '🐍' },
      { name: 'SQL', level: 80, icon: '🗄️' },
      { name: 'Java', level: 75, icon: '☕' },
      { name: 'C++', level: 70, icon: '⚙️' },
      { name: 'C', level: 70, icon: '🖥️' },
      { name: 'R', level: 60, icon: '📐' },
    ]
  },
  {
    name: 'Libraries & Frameworks',
    icon: '📚',
    color: '#a855f7', // Purple
    skills: [
      { name: 'Pandas', level: 88, icon: '🐼' },
      { name: 'NumPy', level: 85, icon: '🔢' },
      { name: 'Matplotlib / Seaborn', level: 82, icon: '📈' },
    ]
  },
  {
    name: 'Machine Learning',
    icon: '🤖',
    color: '#2dd4bf', // Teal
    skills: [
      { name: 'Scikit-learn', level: 85, icon: '🔬' },
      { name: 'TensorFlow / Keras', level: 70, icon: '🧠' },
      { name: 'XGBoost', level: 75, icon: '🚀' },
    ]
  },
  {
    name: 'Tools & Platforms',
    icon: '⚙️',
    color: '#f59e0b', // Amber
    skills: [
      { name: 'Power BI', level: 80, icon: '📊' },
      { name: 'Excel / Sheets', level: 85, icon: '📋' },
      { name: 'Jupyter Notebook', level: 90, icon: '📓' },
    ]
  },
  {
    name: 'Web Technologies',
    icon: '🌐',
    color: '#10b981', // Emerald
    skills: [
      { name: 'HTML / CSS', level: 75, icon: '🎨' },
      { name: 'JavaScript', level: 65, icon: '⚡' },
      { name: 'React.js', level: 60, icon: '⚛️' },
    ]
  },
  {
    name: 'Databases',
    icon: '🗃️',
    color: '#ec4899', // Pink
    skills: [
      { name: 'MongoDB', level: 70, icon: '🍃' },
      { name: 'MySQL', level: 78, icon: '🐬' },
      { name: 'PostgreSQL', level: 65, icon: '🐘' },
    ]
  },
];

const extraTools = ['Git', 'GitHub', 'Tableau', 'Google Colab', 'VS Code', 'Docker', 'AWS', 'Streamlit', 'Flask', 'NLTK', 'OpenCV', 'Plotly'];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(null);

  const displayed = activeTab !== null
    ? [skillCategories[activeTab]]
    : skillCategories;

  return (
    <div>
      <h1 className="section-title">Skills <span className="gradient-text">Matrix</span></h1>
      <p className="section-subtitle">A detailed breakdown of my technical capabilities and familiarities across different domains.</p>

      {/* Category filter tabs */}
      <div className="glass-card" style={{ marginBottom: 40, padding: '20px 24px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTab(null)}
            style={{
              padding: '10px 24px', borderRadius: 30, border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s',
              background: activeTab === null ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              color: activeTab === null ? '#000' : 'var(--text-secondary)',
              boxShadow: activeTab === null ? '0 4px 15px var(--glow-accent)' : 'none',
            }}>
            All
          </button>
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(activeTab === i ? null : i)}
              style={{
                padding: '10px 24px', borderRadius: 30, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s',
                background: activeTab === i ? `${cat.color}20` : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? cat.color : 'var(--text-secondary)',
                border: activeTab === i ? `1px solid ${cat.color}50` : '1px solid transparent',
              }}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {displayed.map((cat, i) => (
          <div key={i} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Color accent top border */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}55)` }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30, paddingTop: 10 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: `${cat.color}15`, border: `1px solid ${cat.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                boxShadow: `0 0 15px ${cat.color}20`
              }}>
                {cat.icon}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                {cat.name}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cat.skills.map((skill, j) => (
                <div key={j}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ marginRight: 8, fontSize: '1.1rem' }}>{skill.icon}</span> {skill.name}
                    </span>
                    <span style={{
                      fontSize: '0.85rem', fontWeight: 700, padding: '4px 10px', borderRadius: 8,
                      background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30`
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="progress-container">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
                        boxShadow: `0 0 10px ${cat.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Also familiar with */}
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>
          Also Familiar With
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {extraTools.map((tech, i) => (
            <span key={i} className="dash-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
