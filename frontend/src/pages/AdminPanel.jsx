import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEnvelope, FaEye, FaCheck, FaTimes, FaSeedling } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getProjects, createProject, updateProject, deleteProject, getMessages, deleteMessage, markRead, seedProjects } from '../api';

const emptyProject = {
  title: '', description: '', problem: '', dataset: '',
  approach: '', results: '', techStack: '', githubLink: '',
  liveLink: '', image: '', category: 'Machine Learning', featured: false
};

const categories = ['Machine Learning', 'Data Analysis', 'Visualization', 'NLP', 'Computer Vision', 'Other'];

export default function AdminPanel() {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => { if (!loading && !isAuthenticated) navigate('/admin'); }, [isAuthenticated, loading]);

  const loadProjects = () => getProjects().then(r => setProjects(r.data.data)).catch(() => {});
  const loadMessages = () => getMessages().then(r => setMessages(r.data.data)).catch(() => {});

  useEffect(() => { if (isAuthenticated) { loadProjects(); loadMessages(); } }, [isAuthenticated]);

  const handleLogout = () => { logout(); navigate('/admin'); };

  const openAdd = () => { setEditProject(null); setForm(emptyProject); setShowForm(true); };
  const openEdit = (p) => { setEditProject(p); setForm({ ...p, techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) };
      if (editProject) await updateProject(editProject._id, data);
      else await createProject(data);
      setShowForm(false); loadProjects();
      setFeedback(editProject ? 'Project updated!' : 'Project added!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (e) { setFeedback('Error: ' + (e.response?.data?.error || e.message)); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteProject(id); loadProjects();
    setFeedback('Project deleted!'); setTimeout(() => setFeedback(''), 3000);
  };

  const handleSeed = async () => {
    if (!window.confirm('Seed sample projects? This will replace all existing projects.')) return;
    await seedProjects(); loadProjects();
    setFeedback('Sample projects seeded!'); setTimeout(() => setFeedback(''), 3000);
  };

  const handleDeleteMsg = async (id) => {
    await deleteMessage(id); loadMessages();
  };
  const handleMarkRead = async (id) => { await markRead(id); loadMessages(); };

  if (loading) return <div style={{ minHeight: '100vh', background: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>Loading...</div>;

  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter', marginTop: 4 };

  return (
    <div style={{ minHeight: '100vh', background: '#050508', color: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: 'rgba(10,10,20,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>DS</div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700 }}>Admin Panel</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/" style={{ padding: '7px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>View Site</a>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Inter' }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          {[
            { label: 'Total Projects', value: projects.length, icon: '🚀', color: '#7c3aed' },
            { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: '📬', color: '#ec4899' },
            { label: 'Total Messages', value: messages.length, icon: '✉️', color: '#06b6d4' },
            { label: 'Featured Projects', value: projects.filter(p => p.featured).length, icon: '⭐', color: '#f97316' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: s.color }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ padding: '12px 20px', background: feedback.startsWith('Error') ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', border: `1px solid ${feedback.startsWith('Error') ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, borderRadius: 10, marginBottom: 24, color: feedback.startsWith('Error') ? '#ef4444' : '#10b981', fontWeight: 600 }}>
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {[{ key: 'projects', label: '🚀 Projects' }, { key: 'messages', label: '📬 Messages' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', background: tab === t.key ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'transparent', color: tab === t.key ? 'white' : '#94a3b8', transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700 }}>Manage Projects</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleSeed} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Inter', fontWeight: 600 }}>
                  <FaSeedling /> Seed Sample Data
                </button>
                <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'Inter', fontWeight: 600 }}>
                  <FaPlus /> Add Project
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {projects.map(proj => (
                <motion.div key={proj._id} whileHover={{ y: -3 }} className="glass-card" style={{ overflow: 'hidden' }}>
                  {proj.image && <img src={proj.image} alt={proj.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="tag" style={{ fontSize: '0.7rem' }}>{proj.category}</span>
                      {proj.featured && <span style={{ fontSize: '0.7rem', color: '#f97316' }}>⭐ Featured</span>}
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, color: '#f8fafc' }}>{proj.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(proj)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.1)', color: '#a855f7', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Inter', fontWeight: 600 }}>
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(proj._id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Inter', fontWeight: 600 }}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {projects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>📂</div>
                <p>No projects yet. Add one or seed sample data.</p>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700, marginBottom: 24 }}>Inbox Messages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.map(msg => (
                <motion.div key={msg._id} whileHover={{ x: 4 }} className="glass-card" style={{ padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start', borderLeft: msg.read ? '3px solid rgba(255,255,255,0.1)' : '3px solid #a855f7' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>
                    {msg.name[0]?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#f8fafc', marginRight: 10 }}>{msg.name}</span>
                        <a href={`mailto:${msg.email}`} style={{ color: '#a855f7', fontSize: '0.85rem', textDecoration: 'none' }}>{msg.email}</a>
                        {!msg.read && <span style={{ marginLeft: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#a855f7', fontSize: '0.7rem', fontWeight: 700 }}>NEW</span>}
                      </div>
                      <span style={{ color: '#475569', fontSize: '0.775rem' }}>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.9rem' }}>{msg.message}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                    <a href={`mailto:${msg.email}`} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.1)', color: '#a855f7', textDecoration: 'none', fontSize: '0.775rem', fontWeight: 600 }}>
                      <FaEnvelope /> Reply
                    </a>
                    {!msg.read && (
                      <button onClick={() => handleMarkRead(msg._id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontSize: '0.775rem', fontFamily: 'Inter', fontWeight: 600 }}>
                        <FaCheck /> Read
                      </button>
                    )}
                    <button onClick={() => handleDeleteMsg(msg._id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.775rem', fontFamily: 'Inter', fontWeight: 600 }}>
                      <FaTimes /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>📭</div>
                  <p>No messages yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#0a0a14', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20, width: '100%', maxWidth: 680, maxHeight: '90vh', overflow: 'auto', padding: '36px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem' }}>{editProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={() => setShowForm(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { key: 'title', label: 'Title *', placeholder: 'Project Title' },
                  { key: 'category', label: 'Category', type: 'select' },
                  { key: 'image', label: 'Image URL', placeholder: 'https://...', full: true },
                  { key: 'description', label: 'Description *', placeholder: 'Short description', full: true, rows: 2 },
                  { key: 'problem', label: 'Problem Statement', placeholder: 'Business problem...', rows: 2 },
                  { key: 'dataset', label: 'Dataset Used', placeholder: 'Dataset info...' },
                  { key: 'approach', label: 'Approach / Methodology', placeholder: 'EDA → ML → Deploy', rows: 2 },
                  { key: 'results', label: 'Results & Metrics', placeholder: 'Accuracy, insights...', rows: 2 },
                  { key: 'techStack', label: 'Tech Stack (comma-separated)', placeholder: 'Python, Pandas, Scikit-learn', full: true },
                  { key: 'githubLink', label: 'GitHub Link', placeholder: 'https://github.com/...' },
                  { key: 'liveLink', label: 'Live Demo Link', placeholder: 'https://...' },
                ].map(field => (
                  <div key={field.key} style={field.full ? { gridColumn: '1 / -1' } : {}}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>{field.label}</label>
                    {field.type === 'select' ? (
                      <select value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        style={{ ...inputStyle, cursor: 'pointer' }}>
                        {categories.map(c => <option key={c} value={c} style={{ background: '#0a0a14' }}>{c}</option>)}
                      </select>
                    ) : field.rows ? (
                      <textarea value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        rows={field.rows} placeholder={field.placeholder} style={{ ...inputStyle, resize: 'vertical' }} />
                    ) : (
                      <input value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder} style={inputStyle} />
                    )}
                  </div>
                ))}

                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    style={{ width: 16, height: 16, accentColor: '#7c3aed' }} />
                  <label htmlFor="featured" style={{ color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer' }}>Mark as Featured Project</label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => setShowForm(false)}
                  style={{ padding: '11px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600 }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{ flex: 1, padding: '11px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter', fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : editProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
