// App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ThemeSwitcher from './components/common/ThemeSwitcher';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import TryModel from './pages/TryModel';
import HowToUse from './pages/HowToUse';
import ProfileDetails from './pages/ProfileDetails';
import BackToTop from './components/common/BackToTop';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminDashboard from './pages/AdminDashboard';

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState("maram");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminDashboard = location.pathname === '/admin';

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.classList.toggle('active-dark-mode', savedTheme === 'dark');
    document.body.classList.toggle('active-light-mode', savedTheme === 'light');

    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const userData = await response.json();

        setUser({
          id: userData._id,
          name: userData.full_name,
          email: userData.email,
          isVerified: userData.is_verified,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('active-dark-mode', newTheme === 'dark');
    document.body.classList.toggle('active-light-mode', newTheme === 'light');
  };

  const handleLogin = async (token, userData) => {
    localStorage.setItem('token', token);

    setUser({
      id: userData._id,
      name: userData.full_name,
      email: userData.email,
      isVerified: userData.is_verified,
    });

    navigate('/');
  };

  // In App.jsx, ensure the handleLogout function is properly implemented:
  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <main className="page-wrapper">
      <ThemeSwitcher currentTheme={theme} toggleTheme={toggleTheme} />
      {!isAdminDashboard && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Home showContact={true} />} />
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/try-model/:id" element={<TryModel />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/profile" element={user ? <ProfileDetails user={user} /> : <Navigate to="/signin" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminDashboard && <Footer />}
      <BackToTop />
    </main>
  );
}

export default App;