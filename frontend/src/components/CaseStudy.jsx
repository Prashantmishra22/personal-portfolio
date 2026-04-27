import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

export default function CaseStudy() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    { step: '01', title: 'Problem Definition', desc: 'Defined the business problem: predicting telecom customer churn to reduce revenue loss. Identified key metrics: accuracy, precision, recall, and AUC-ROC.', color: '#7c3aed' },
    { step: '02', title: 'Data Collection & EDA', desc: 'Analyzed IBM Telco dataset with 7,043 customers and 21 features. Identified class imbalance (26% churn) and key correlations with tenure, contract type, and monthly charges.', color: '#ec4899' },
    { step: '03', title: 'Feature Engineering', desc: 'Created 8 new features including CLV (Customer Lifetime Value), service bundle score, and payment consistency ratio. Applied SMOTE for class balance.', color: '#06b6d4' },
    { step: '04', title: 'Model Development', desc: 'Compared Logistic Regression, Random Forest, XGBoost, and LightGBM using 5-fold CV. Final ensemble: weighted voting of top 3 models.', color: '#f97316' },
    { step: '05', title: 'Results & Deployment', desc: 'Achieved 95.2% accuracy, 0.94 AUC-ROC, 91% precision. Deployed as REST API with Flask. Built Power BI dashboard for business stakeholders.', color: '#10b981' },
  ];

  const metrics = [
    { label: 'Accuracy', value: '95.2%', color: '#7c3aed' },
    { label: 'AUC-ROC', value: '0.94', color: '#ec4899' },
    { label: 'Precision', value: '91%', color: '#06b6d4' },
    { label: 'Recall', value: '89%', color: '#f97316' },
  ];

  return (
    <section id="casestudy" ref={ref} style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), #050508' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: '#a855f7', fontWeight: 600, letterSpacing: 3, fontSize: '0.85rem', marginBottom: 12 }}>DEEP DIVE</p>
          <h2 className="section-title">Case <span className="gradient-text">Study</span></h2>
          <p className="section-subtitle">An in-depth look at my most impactful data science project</p>
        </motion.div>

        {/* Hero image + intro */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="glass-card" style={{ overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
              alt="Case Study"
              style={{ width: '100%', height: 320, objectFit: 'cover' }}
            />
            <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="tag" style={{ marginBottom: 16, display: 'inline-block' }}>🏆 Featured Project</span>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>
                Customer Churn <span className="gradient-text">Prediction</span>
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, fontSize: '0.95rem' }}>
                End-to-end ML pipeline that predicts telecom customer churn with 95.2% accuracy, helping businesses proactively retain high-risk customers and save millions in revenue.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                {['Python', 'XGBoost', 'SHAP', 'Flask', 'Power BI', 'Pandas'].map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                  <FaGithub /> View Code
                </a>
                <a href="#" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                  Live Demo <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card" style={{ padding: '24px', textAlign: 'center', borderTop: `2px solid ${m.color}60` }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: m.color }}>{m.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 6 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Methodology steps */}
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700, textAlign: 'center', marginBottom: 32, color: '#f8fafc' }}>
          Project Methodology
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860, margin: '0 auto 48px' }}>
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ x: 6 }} className="glass-card"
              style={{ padding: '24px 28px', display: 'flex', gap: 24, alignItems: 'flex-start', transition: 'all 0.3s', borderLeft: `3px solid ${step.color}` }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Space Grotesk', color: `${step.color}40`, flexShrink: 0, lineHeight: 1, marginTop: 4 }}>{step.step}</div>
              <div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: step.color, marginBottom: 8 }}>{step.title}</h4>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', padding: '48px', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))', borderRadius: 24, border: '1px solid rgba(124,58,237,0.2)' }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>
            Interested in Working Together?
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: '1.05rem' }}>
            I'm open to data science internships, freelance projects, and collaboration opportunities.
          </p>
          <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary" style={{ fontSize: '1rem' }}>
            Let's Connect <FaArrowRight />
          </a>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){
        #casestudy .container>div:nth-child(3)>div:first-child{grid-template-columns:1fr!important;}
        #casestudy .container>div:nth-child(3)>div:first-child>img{height:220px!important;}
        #casestudy .container>div:nth-child(4){grid-template-columns:repeat(2,1fr)!important;}
      }`}</style>
    </section>
  );
}
