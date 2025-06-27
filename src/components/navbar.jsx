import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSun, BsMoon, BsList } from 'react-icons/bs';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);
 const toggleTheme = () => {
  setDarkMode(!darkMode);
  document.documentElement.classList.toggle('dark'); 
};

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-transparent text-[#a0e9ff] font-display z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => navigate('/')}>
        <img
          src="https://img.freepik.com/free-vector/realistic-elegant-frame-design_23-2149257738.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg font-bold tracking-wide">AbsolutZero</span>
      </div>

      {/* Right side: theme + hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-xl transition hover:scale-110"
          title="Toggle Theme"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>

        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          <BsList />
        </div>
      </div>

      {/* Links */}
      <div
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-[#0f2027]/80 md:bg-transparent px-6 py-4 md:p-0 text-center md:text-left transition-all`}
      >
        <ul className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full md:w-auto">
          <li>
            <a
              onClick={() => navigate('/about')}
              className="cursor-pointer text-base font-medium hover:underline"
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/signup')}
              className="cursor-pointer text-base font-medium hover:underline"
            >
              Signup
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

