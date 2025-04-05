import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState("maram");

  useEffect(() => {
    // Vérifier le thème enregistré
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.classList.toggle('active-dark-mode', savedTheme === 'dark');
    document.body.classList.toggle('active-light-mode', savedTheme === 'light');

    // Vérifier l'authentification via le token
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://127.0.0.1:8000/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.email) {
            setUser(data);
          } else {
            localStorage.removeItem('token'); // Supprimer le token expiré
            setUser(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('active-dark-mode', newTheme === 'dark');
    document.body.classList.toggle('active-light-mode', newTheme === 'light');
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    fetch('http://127.0.0.1:8000/me', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <main className="page-wrapper">
      <ThemeSwitcher currentTheme={theme} toggleTheme={toggleTheme} />
      <Header user={user} onLogout={handleLogout} />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Home showContact={true} />} />

        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/try-model/:id" element={<TryModel />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/profile" element={user ? <ProfileDetails user={user} /> : <Navigate to="/signin" />} />
      </Routes>
      <Footer />
      <BackToTop />
    </main>
  );
}

export default App;
