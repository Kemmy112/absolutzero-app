import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, Snowflake } from 'lucide-react'; // Switched to Lucide for consistency

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Sync theme with document & localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const themeStr = newMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", themeStr);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-300
      bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl 
      border-b border-slate-200 dark:border-slate-800 
      text-slate-900 dark:text-slate-100 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform">
            <Snowflake className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AbsolutZero</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => navigate("/about")}
            className="text-sm font-medium hover:text-cyan-500 transition-colors"
          >
            About
          </button>
          
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:ring-2 ring-cyan-500/20 transition-all text-slate-600 dark:text-slate-400"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <button 
            onClick={() => { navigate("/about"); setMenuOpen(false); }}
            className="text-lg font-medium py-2"
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;