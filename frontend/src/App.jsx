import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import Home      from './pages/Home';
import About     from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog      from './pages/Blog';
import Pricing   from './pages/Pricing';
import Contact   from './pages/Contact';
import AdminApp  from './admin/AdminApp';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.toString() };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="alert alert-danger">{this.state.message}</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Admin panel — no Navbar/Footer */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public site — with Navbar/Footer */}
        <Route path="/*" element={
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-fill">
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/about"    element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog"     element={<Blog />} />
                <Route path="/pricing"  element={<Pricing />} />
                <Route path="/contact"  element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
