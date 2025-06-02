import React, { useState } from 'react';
import '../styles/home.css'; 


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img src="https://img.freepik.com/free-vector/realistic-elegant-frame-design_23-2149257738.jpg?ga=GA1.1.149383177.1734934021&semt=ais_hybrid&w=740" alt="logo_img" />
          <span><p className="logo-txt">AbsolutZero</p></span>
        </div>
      </div>

      {/* Hamburger Icon - Mobile only */}
      <div className="hamburger" onClick={toggleMenu}>
        <i className="bx bx-menu"></i>
      </div>

      {/* Nav Links */}
      <div className={`nav-right ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a href="/signup">Signup</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;