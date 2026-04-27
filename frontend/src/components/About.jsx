import { FaDownload } from 'react-icons/fa';

export default function About() {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'Machine Learning (Scikit-Learn, TensorFlow)', level: 85 },
    { name: 'Data Visualization (Power BI, Matplotlib)', level: 80 },
    { name: 'SQL & Database Management', level: 85 },
    { name: 'Full-Stack Web Development (React, Node)', level: 75 },
    { name: 'Exploratory Data Analysis (EDA)', level: 90 },
  ];

  return (
    <div>
      <h1 className="section-title">About <span className="gradient-text">Me</span></h1>
      <p className="section-subtitle">Discover my background, skills, and the tools I use to bring ideas to life.</p>
      
      <div className="grid-2">
        {/* Left Column: Biography */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', marginBottom: 20, color: 'var(--text-primary)' }}>Professional Background</h2>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              I am Prashant Mishra, a <strong style={{ color: 'var(--accent)' }}>Computer Science Engineering student</strong> at Lovely Professional University, pursuing a minor in Data Science. I am deeply interested in understanding data, extracting valuable insights, and building intelligent systems that can solve real-world challenges.
            </p>
            <p>
              With a strong foundation in programming and problem-solving, I have developed skills in <strong style={{ color: 'var(--accent)' }}>Python, SQL, and modern web technologies</strong>. I enjoy working on data-driven projects where I perform data cleaning, exploratory data analysis (EDA), and apply machine learning techniques to build predictive models.
            </p>
            <p>
              Apart from data science, I also have experience in <strong style={{ color: 'var(--accent)' }}>full-stack web development</strong>, which allows me to present data insights through interactive and user-friendly applications. I believe in continuous learning and regularly work on projects to improve my technical and analytical skills.
            </p>
            <p>
              My goal is to become a Data Scientist or Machine Learning Engineer and contribute to impactful solutions using data and technology.
            </p>
          </div>

          <div style={{ marginTop: 30, paddingTop: 30, borderTop: '1px solid var(--border)' }}>
            <a href="/cv.pdf" download className="btn-secondary">
              Download Resume <FaDownload style={{ marginLeft: 8 }} />
            </a>
          </div>
        </div>

        {/* Right Column: Skills */}
        <div className="glass-card">
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', marginBottom: 30, color: 'var(--text-primary)' }}>Technical Proficiency</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {skills.map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600 }}>{skill.level}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 20, color: 'var(--text-primary)' }}>Tools & Frameworks</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'Power BI', 'MongoDB', 'Express', 'React', 'Node.js', 'Git'].map(tool => (
                <span key={tool} className="dash-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
