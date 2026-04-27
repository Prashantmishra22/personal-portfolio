const timeline = [
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    org: 'Lovely Professional University (LPU)',
    period: 'Present',
    description: 'Minor Specialization: Data Science. Building strong foundations in algorithms, databases, and applied machine learning.',
    highlights: ['Data Structures & Algorithms', 'Database Management Systems', 'Machine Learning Basics'],
    icon: '🎓',
    color: '#00d4ff', // Cyan
  },
  {
    type: 'internship',
    title: 'Data Science Intern',
    org: 'TechCorp Analytics Pvt. Ltd.',
    period: 'May 2024 – Aug 2024',
    description: 'Worked on customer segmentation using K-Means clustering and built predictive models for sales forecasting. Reduced data processing time by 40%.',
    highlights: ['Customer Segmentation', 'Sales Forecasting', 'Python', 'Power BI', 'SQL'],
    icon: '💼',
    color: '#a855f7', // Purple
  },
  {
    type: 'certification',
    title: 'Python Programming with Libraries',
    org: 'Skillera',
    period: 'Completed',
    description: 'Comprehensive certification focusing on Python methodologies and implementing various data science and programming libraries.',
    highlights: ['Python', 'Libraries', 'Data Analysis'],
    icon: '🐍',
    color: '#10b981', // Emerald
  },
  {
    type: 'certification',
    title: 'Cyber Security Fundamentals',
    org: 'Tech Veda',
    period: 'Completed',
    description: 'Foundational certification covering essential cyber security principles, threat mitigation, and networking practices.',
    highlights: ['Cyber Security', 'Network Security', 'Risk Management'],
    icon: '🛡️',
    color: '#f59e0b', // Amber
  },
  {
    type: 'certification',
    title: 'Interview Skills and Resume Building',
    org: 'Coding Tantra',
    period: 'Completed',
    description: 'Professional development program focusing on resume creation, modern interview techniques, and soft skills.',
    highlights: ['Resume Building', 'Interview Prep', 'Communication'],
    icon: '📜',
    color: '#ec4899', // Pink
  },
];

const typeConfig = {
  education:    { label: 'Education',      color: '#00d4ff' },
  internship:   { label: 'Experience',     color: '#a855f7' },
  certification:{ label: 'Certification',  color: '#10b981' },
  project:      { label: 'Achievement',    color: '#f59e0b' },
};

export default function Experience() {
  return (
    <div>
      <h1 className="section-title" style={{ textAlign: 'center' }}>My <span className="gradient-text">Journey</span></h1>
      <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>A timeline of my education, experience, and professional certifications.</p>

      {/* Type legend */}
      <div className="glass-card" style={{ marginBottom: 40, padding: '16px 24px', maxWidth: 800, margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>CATEGORIES:</span>
          {Object.entries(typeConfig).map(([key, val]) => (
            <span key={key} style={{
              padding: '6px 16px', borderRadius: 20,
              background: `${val.color}15`, border: `1px solid ${val.color}40`,
              color: val.color, fontSize: '0.85rem', fontWeight: 700, letterSpacing: 0.5
            }}>
              {val.label}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
        {/* Vertical center line */}
        <div className="exp-timeline-line" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(180deg, var(--accent), #a855f7, #10b981)',
          transform: 'translateX(-50%)',
          opacity: 0.5
        }} />

        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0;
          const type = typeConfig[item.type] || typeConfig.project;

          return (
            <div key={i} className="timeline-item" style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              marginBottom: 40,
              position: 'relative',
            }}>
              {/* Center icon dot */}
              <div className="timeline-icon" style={{
                position: 'absolute', left: '50%', top: 24,
                transform: 'translateX(-50%)',
                width: 56, height: 56, borderRadius: '50%',
                background: `${item.color}20`,
                border: `2px solid ${item.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', zIndex: 2,
                boxShadow: `0 0 20px ${item.color}40`,
                backdropFilter: 'blur(8px)',
              }}>
                {item.icon}
              </div>

              {/* Card */}
              <div className="glass-card timeline-content" style={{
                width: 'calc(50% - 60px)',
                borderTop: `4px solid ${item.color}`,
                transition: 'all 0.3s ease',
              }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 12,
                    background: `${item.color}15`, border: `1px solid ${item.color}40`,
                    color: item.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: 1
                  }}>
                    {type.label}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {item.period}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ color: item.color, fontSize: '0.95rem', fontWeight: 600, marginBottom: 16 }}>
                  {item.org}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 20 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {item.highlights.map((h, j) => (
                    <span key={j} className="dash-tag" style={{ border: '1px solid var(--border)' }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stack all left */}
      <style>{`
        @media (max-width: 768px) {
          .exp-timeline-line { left: 30px !important; }
          .timeline-item { justifyContent: flex-end !important; }
          .timeline-icon { left: 30px !important; width: 40px !important; height: 40px !important; font-size: 1.2rem !important; }
          .timeline-content { width: calc(100% - 70px) !important; }
        }
      `}</style>
    </div>
  );
}
