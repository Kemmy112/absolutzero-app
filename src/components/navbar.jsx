import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import { BsSun, BsMoon, BsList } from 'react-icons/bs'; // for icons

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://img.freepik.com/free-vector/realistic-elegant-frame-design_23-2149257738.jpg"
          alt="logo"
        />
        <span className="logo-txt">AbsolutZero</span>
      </div>

      <div className="right-section">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          <BsList />
        </div>
      </div>

      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li>
            <a onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
              About
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
              Signup
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
