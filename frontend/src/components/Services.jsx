import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaRobot, FaChartBar, FaTachometerAlt } from 'react-icons/fa';

const services = [
  {
    icon: <FaChartLine />,
    title: 'Data Analysis',
    description: 'Comprehensive exploratory data analysis to uncover hidden patterns, trends, and correlations in your data. From raw data to actionable insights.',
    features: ['Exploratory Data Analysis', 'Statistical Testing', 'Pattern Recognition', 'Data Cleaning & Wrangling'],
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #c084fc)',
  },
  {
    icon: <FaRobot />,
    title: 'Machine Learning Models',
    description: 'End-to-end ML pipelines from feature engineering to model deployment. Classification, regression, clustering, and recommendation systems.',
    features: ['Predictive Modeling', 'Classification & Regression', 'Model Evaluation & Tuning', 'Feature Engineering'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff, #2dd4bf)',
  },
  {
    icon: <FaChartBar />,
    title: 'Data Visualization',
    description: 'Transforming complex data into clear, compelling visual stories using Python, Plotly, Matplotlib and Seaborn that communicate insights instantly.',
    features: ['Interactive Charts', 'Statistical Plots', 'Geospatial Mapping', 'Custom Infographics'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    icon: <FaTachometerAlt />,
    title: 'Dashboard Creation',
    description: 'Building real-time interactive dashboards in Power BI and Streamlit that give stakeholders instant visibility into critical KPIs and metrics.',
    features: ['Power BI Reports', 'Streamlit Apps', 'KPI Monitoring', 'Real-time Analytics'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  },
];

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="container" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p style={{ textAlign: 'center', color: 'var(--accent)', fontWeight: 600, letterSpacing: 3, fontSize: '0.9rem', marginBottom: 16 }}>WHAT I DO</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>My <span className="gradient-text">Services</span></h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>Specialized data science services to help you make data-driven decisions.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
        {services.map((service, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <div className="glass-card" style={{
              padding: 40, height: '100%', display: 'flex', flexDirection: 'column',
              borderTop: `2px solid ${service.color}60`,
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 60px ${service.color}20, 0 0 0 1px ${service.color}40`; e.currentTarget.style.background = `rgba(255,255,255,0.05)`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--bg-card)'; }}
            >
              {/* Icon */}
              <div style={{
                  width: 70, height: 70, borderRadius: 20,
                  background: `${service.color}15`,
                  border: `1px solid ${service.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', color: service.color, marginBottom: 30,
                  boxShadow: `0 10px 25px ${service.color}20`,
                }}>
                {service.icon}
              </div>

              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
                {service.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 30, fontSize: '1rem', flex: 1 }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {service.features.map((feat, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: service.gradient, flexShrink: 0, boxShadow: `0 0 8px ${service.color}` }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
