import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../adminApi';

const stats = [
  { key: 'sliders',      label: 'Sliders',      icon: '🖼️', color: 'purple' },
  { key: 'portfolios',   label: 'Portfolio',    icon: '📷', color: 'blue'   },
  { key: 'blogs',        label: 'Blog Posts',   icon: '📝', color: 'green'  },
  { key: 'services',     label: 'Services',     icon: '⚙️', color: 'orange' },
  { key: 'testimonials', label: 'Testimonials', icon: '💬', color: 'teal'   },
  { key: 'membership',   label: 'Memberships',  icon: '💎', color: 'pink'   },
  { key: 'instagram',    label: 'Instagram',    icon: '📸', color: 'cyan'   },
  { key: 'contacts',     label: 'Messages',     icon: '✉️', color: 'red'    },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    stats.forEach(({ key }) => {
      adminApi.get(`/${key}`).then(res => {
        setCounts(prev => ({ ...prev, [key]: res.data.length }));
      }).catch(() => {});
    });
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="row g-3 mb-4">
        {stats.map(({ key, label, icon, color }) => (
          <div className="col-sm-6 col-xl-3" key={key}>
            <div className="stat-card">
              <div className={`stat-icon ${color}`}>{icon}</div>
              <div className="stat-info">
                <h3>{counts[key] ?? '—'}</h3>
                <p>{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card card">
        <div className="card-header">
          <h5>Welcome to Photo CMS Admin</h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">
            Use the sidebar to manage your photography portfolio content.
            All changes are reflected instantly on the public frontend at{' '}
            <a href="http://localhost:5173" target="_blank" rel="noreferrer">localhost:5173</a>.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
