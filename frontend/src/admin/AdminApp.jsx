import { Routes, Route, Navigate } from 'react-router-dom';
import '../admin/admin.css';
import PrivateRoute from './components/PrivateRoute';
import Login      from './pages/Login';
import Dashboard  from './pages/Dashboard';
import Sliders    from './pages/Sliders';
import Portfolio  from './pages/Portfolio';
import Blogs      from './pages/Blogs';
import Services   from './pages/Services';
import About      from './pages/About';
import Testimonials from './pages/Testimonials';
import Membership from './pages/Membership';
import Instagram  from './pages/Instagram';
import Contacts   from './pages/Contacts';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="sliders"      element={<PrivateRoute><Sliders /></PrivateRoute>} />
      <Route path="portfolio"    element={<PrivateRoute><Portfolio /></PrivateRoute>} />
      <Route path="blogs"        element={<PrivateRoute><Blogs /></PrivateRoute>} />
      <Route path="services"     element={<PrivateRoute><Services /></PrivateRoute>} />
      <Route path="about"        element={<PrivateRoute><About /></PrivateRoute>} />
      <Route path="testimonials" element={<PrivateRoute><Testimonials /></PrivateRoute>} />
      <Route path="membership"   element={<PrivateRoute><Membership /></PrivateRoute>} />
      <Route path="instagram"    element={<PrivateRoute><Instagram /></PrivateRoute>} />
      <Route path="contacts"     element={<PrivateRoute><Contacts /></PrivateRoute>} />
      <Route path="*"            element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
