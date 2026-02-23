import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Snowflake, Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // This detects the current URL

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  // Logic to determine which links to show
  const navLinks = [
    { name: 'Features', path: '/#features', showOnAbout: true },
    { name: 'About', path: '/about', hideWhenActive: true },
    { name: 'Pricing', path: '/#pricing', showOnAbout: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo - Always leads home */}
        <Link to="/" className="flex items-center gap-2 group">
          <Snowflake className="w-8 h-8 text-cyan-500 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xl font-bold tracking-tighter text-slate-950 dark:text-white">
            AbsolutZero
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            // Only render the link if it's not the current page
            (link.hideWhenActive && location.pathname === link.path) ? null : (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          
          <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="w-5 h-5 hidden dark:block" />
          </button>

          <button 
            onClick={() => navigate('/signup')}
            className="px-5 py-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-sm font-bold rounded-xl hover:scale-105 transition-all"
          >
            Join Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 text-slate-500">
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="w-5 h-5 hidden dark:block" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-900 px-6 py-8 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {/* If on About page, show 'Back to Home' instead of 'About' */}
              {location.pathname === '/about' ? (
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-between"
                >
                  Home <ChevronRight className="text-cyan-500" />
                </Link>
              ) : (
                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-between"
                >
                  About <ChevronRight className="text-cyan-500" />
                </Link>
              )}

              <Link to="/#features" onClick={() => setIsOpen(false)} className="text-lg text-slate-600 dark:text-slate-400">Features</Link>
              <Link to="/#pricing" onClick={() => setIsOpen(false)} className="text-lg text-slate-600 dark:text-slate-400">Pricing</Link>
              
              <button 
                onClick={() => navigate('/signup')}
                className="w-full py-4 bg-cyan-600 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;