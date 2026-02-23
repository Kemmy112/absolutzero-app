import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Award, PlayCircle, ArrowRight, Shield, Timer, BarChart3, X } from 'lucide-react';

function Homepage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen transition-colors duration-500 bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-200">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/20 dark:bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 dark:text-white mb-6"
          >
            Zero Distractions. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
              Absolut Productivity.
            </span>
          </motion.h1>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
             onClick={() => navigate('/signup')}
            className="group px-8 py-4 bg-slate-950 text-white dark:bg-white dark:text-black font-semibold rounded-xl hover:scale-[1.02] transition-all flex items-center gap-2 shadow-xl">
              Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
    onClick={() => navigate('/signin')}
    className="flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
  >
    <PlayCircle className="w-5 h-5" /> 
    Sign In
  </button>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aims.map((aim, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                {aim.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{aim.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{aim.description}</p>
            </div>
          ))}

          {/* Premium Trigger Card (Fills the 4th spot) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <Award className="w-8 h-8 mb-4 text-indigo-200" />
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-indigo-100 text-sm mt-2">See what's coming next.</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-8">
              Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Ambient glow in card */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 3. The Premium Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-2 dark:text-white">AbsolutZero Premium</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">Coming Soon</p>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Get exclusive access to advanced focus analytics, custom ambient soundscapes, and cross-device syncing.
                </p>
                
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 ring-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                  />
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25">
                    Notify Me
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

const aims = [
  {
    title: 'Zero Distractions',
    description: 'Soft-blocking tools that keep you in the zone without feeling restricted.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Focus Intentionally',
    description: 'Customizable Pomodoro rhythms tailored to your specific mental stamina.',
    icon: <Timer className="w-6 h-6" />,
  },
  {
    title: 'Deep Analytics',
    description: 'Visualize your flow state patterns and identify your peak productivity hours.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

export default Homepage;