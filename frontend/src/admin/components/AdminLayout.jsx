import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../auth';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { label: 'CONTENT', type: 'label' },
  { to: '/admin/sliders',      label: 'Sliders',      icon: '🖼️' },
  { to: '/admin/portfolio',    label: 'Portfolio',    icon: '📷' },
  { to: '/admin/blogs',        label: 'Blog Posts',   icon: '📝' },
  { to: '/admin/services',     label: 'Services',     icon: '⚙️' },
  { to: '/admin/about',        label: 'About',        icon: '👤' },
  { label: 'ENGAGEMENT', type: 'label' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { to: '/admin/membership',   label: 'Membership',   icon: '💎' },
  { to: '/admin/instagram',    label: 'Instagram',    icon: '📸' },
  { to: '/admin/contacts',     label: 'Contacts',     icon: '✉️' },
];

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="brand-icon">📷</div>
          <span>Photo CMS</span>
        </div>
        <nav className="admin-nav">
          {navItems.map((item, i) =>
            item.type === 'label' ? (
              <div key={i} className="admin-nav-label">{item.label}</div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <button className="btn btn-sm w-100" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar-title">{title}</span>
          <div className="admin-topbar-right">
            <span style={{ fontSize: '0.8rem', color: '#888' }}>Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
