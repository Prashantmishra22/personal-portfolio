import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const commitData = [
    { name: 'Mon', commits: 5 }, { name: 'Tue', commits: 9 }, { name: 'Wed', commits: 4 },
    { name: 'Thu', commits: 12 }, { name: 'Fri', commits: 8 }, { name: 'Sat', commits: 3 }, { name: 'Sun', commits: 14 }
  ];

  const skillData = [
    { name: 'Python', value: 45 }, { name: 'SQL', value: 25 }, { name: 'React', value: 20 }, { name: 'PowerBI', value: 10 }
  ];

  const projectTypes = [
    { name: 'Machine Learning', count: 6 }, { name: 'Data Analysis', count: 4 },
    { name: 'Visualization', count: 3 }, { name: 'NLP', count: 2 }
  ];

  const COLORS = ['#00d4ff', '#a855f7', '#f472b6', '#10b981']; // Updated to dark theme colors

  return (
    <div>
      <h1 className="section-title">Analytics <span className="gradient-text">Dashboard</span></h1>
      <p className="section-subtitle">Real-time metrics and activity logs representing my development workflow.</p>
      
      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>GitHub Contributions (Weekly)</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(16, 24, 39, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc' }} 
                  itemStyle={{ color: '#00d4ff' }}
                />
                <Line type="monotone" dataKey="commits" stroke="#00d4ff" strokeWidth={3} dot={{ r: 4, fill: '#00d4ff', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>Project Distribution by Domain</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ background: 'rgba(16, 24, 39, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc' }} 
                />
                <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 16, width: '100%', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>Codebase Skill Composition</h3>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={skillData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                  {skillData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(16, 24, 39, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {skillData.map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[i % COLORS.length], boxShadow: `0 0 10px ${COLORS[i % COLORS.length]}` }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: 24, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>System Logs</h3>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: 20, 
            borderRadius: 12, 
            height: 280, 
            overflowY: 'auto', 
            fontFamily: 'monospace', 
            fontSize: '0.9rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ color: '#10b981', marginBottom: 12 }}>[INFO] System initialized successfully.</div>
            <div style={{ color: '#94a3b8', marginBottom: 12 }}>[INFO] Fetching model metrics...</div>
            <div style={{ color: '#94a3b8', marginBottom: 12 }}>[INFO] Training epoch 24/50 completed. Loss: 0.043</div>
            <div style={{ color: '#f59e0b', marginBottom: 12 }}>[WARN] GPU memory utilization at 92%.</div>
            <div style={{ color: '#94a3b8', marginBottom: 12 }}>[INFO] Data pipeline synced successfully. 4,023 rows imported.</div>
            <div style={{ color: '#00d4ff', marginBottom: 12 }}>[INFO] Awaiting new connections...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
