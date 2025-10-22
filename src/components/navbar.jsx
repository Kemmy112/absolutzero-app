import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoon, BsList } from "react-icons/bs";
import {Snowflake} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 
  bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] 
  bg-opacity-90 backdrop-blur-md text-[#a0e9ff] font-display z-50 shadow-lg">

      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <Snowflake className="w-6 h-6 animate-spin-slow" />
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
          menuOpen ? "flex" : "hidden"
        } md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-[#0f2027]/80 md:bg-transparent px-6 py-4 md:p-0 text-center md:text-left transition-all`}
      >
        <ul className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full md:w-auto">
          <li>
            <a
              onClick={() => navigate("/about")}
              className="cursor-pointer text-base font-medium hover:underline"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
