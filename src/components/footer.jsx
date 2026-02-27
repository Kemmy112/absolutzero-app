import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Snowflake, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full transition-colors duration-500 bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer group w-fit"
              onClick={() => navigate("/")}
            >
              <Snowflake className="w-6 h-6 text-cyan-500 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AbsolutZero</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
              Building the world's most focused work environment, one session at a time.
            </p>
            <div className="flex gap-4 text-slate-400">
              <Twitter className="w-5 h-5 hover:text-cyan-500 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3 text-slate-500 dark:text-slate-400">
              <li><button onClick={() => navigate('/about')} className="hover:text-cyan-500 transition-colors text-sm">Features</button></li>
              <li><button onClick={() => navigate('/signin')} className="hover:text-cyan-500 transition-colors text-sm">Sign In</button></li>
              <li><button onClick={() => navigate('/signup')} className="hover:text-cyan-500 transition-colors text-sm">Get Started</button></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-3 text-slate-500 dark:text-slate-400">
            <li>
  <button type="button" className="hover:text-cyan-500 transition-colors text-sm bg-transparent border-none p-0 cursor-pointer">
    Privacy Policy
  </button>
</li>
<li>
  <button type="button" className="hover:text-cyan-500 transition-colors text-sm bg-transparent border-none p-0 cursor-pointer">
    Terms of Service
  </button>
</li>
              <li><a href="mailto:hello@absolutzero.com" className="hover:text-cyan-500 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} AbsolutZero. Designed for deep work.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;