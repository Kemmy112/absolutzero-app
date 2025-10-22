import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Users, Zap, Award } from 'lucide-react';

function Homepage() {
  const navigate = useNavigate();

  // Variants for image animation
  const imageVariants = {
    initial: { scale: 0.9, opacity: 0, y: 50 },
    animate: { scale: 1, opacity: 1, y: 0 },
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white text-gray-800 dark:from-[#0f2027] dark:via-[#1e343d] dark:to-[#2b5160] dark:text-white transition-colors">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>

      {/* 1. Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-4 pt-32 pb-16 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg dark:text-[#a0e9ff] text-[#0f2027]">
            Zero Distractions. <br className="sm:hidden" /> Absolut Productivity.
          </h1>
          <p className="max-w-md mx-auto text-base md:text-lg dark:text-gray-300 text-gray-600">
            A productivity timer with chill vibes to help you work in focused bursts and cool down in breaks.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 md:px-8 md:py-3 font-bold bg-[#a0e9ff] text-[#0f2027] rounded-full shadow-xl hover:bg-[#89d8ff] transition duration-300 transform"
          >
            Start Your Free Trial
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 font-semibold rounded-full border-2 border-[#a0e9ff] dark:text-[#a0e9ff] text-[#0f2027] hover:bg-white/10 transition duration-300"
          >
            <PlayCircle className="w-5 h-5" /> See How It Works
          </motion.button>
        </div>

        {/* AbsolutZero Premium Coming Soon Mockup */}
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 w-full max-w-4xl px-4"
        >
          <div className="relative h-80 w-full rounded-2xl shadow-xl overflow-hidden
              bg-gradient-to-br from-[#1b3d4a] to-[#0f2027] border-2 border-[#a0e9ff]/30
              flex flex-col items-center justify-center p-4 md:p-6 text-white text-center">
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#a0e9ff]/5 to-transparent z-0"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative z-10"
            >
              <Award className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-4 drop-shadow-lg" strokeWidth={1.5} />
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#a0e9ff] mb-1 drop-shadow-md">
                AbsolutZero Premium
              </h3>
              
              <p className="text-lg font-bold text-yellow-400 uppercase tracking-widest mb-3">
                — Coming Soon —
              </p>

              <p className="text-base md:text-lg text-gray-200 max-w-md mx-auto mb-5">
                Elevate your focus with advanced analytics, custom themes, and exclusive integrations.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 font-bold bg-yellow-400 text-[#0f2027] rounded-full shadow-lg hover:bg-yellow-300 transition-all mx-auto"
              >
                <Zap className="w-5 h-5" /> Get Notified
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. Trust Section */}
      <section className="px-6 py-10 bg-white dark:bg-[#1e343d] border-t border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
            <Users className="w-4 h-4" /> Trusted by over 1,500 focused professionals
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 opacity-60">
            <span className="text-2xl font-light dark:text-white/70">ACME.inc</span>
            <span className="text-2xl font-light dark:text-white/70">TechCorp</span>
            <span className="text-2xl font-light dark:text-white/70">FusionLabs</span>
            <span className="text-2xl font-light dark:text-white/70">DataStream</span>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="px-6 py-20 bg-transparent">
        <h2 className="text-3xl font-bold text-center mb-14 dark:text-[#a0e9ff]">
          What Makes AbsolutZero Different?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
          {aims.map((aim, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col h-full p-4 md:p-5 rounded-2xl bg-white dark:bg-white/5 dark:hover:bg-white/10 shadow-xl dark:shadow-2xl border-t-4 border-[#a0e9ff] transition-all"
            >
              <div className="text-3xl md:text-4xl text-[#a0e9ff] mb-3">
                <i className={`bx ${aim.icon}`}></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 dark:text-white text-[#0f2027]">{aim.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{aim.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-20 bg-[#a0e9ff] dark:bg-[#0f2027] text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0f2027] dark:text-[#a0e9ff]">
          Ready to achieve Absolut Focus?
        </h2>
        <p className="text-lg mb-8 text-[#203a43] dark:text-gray-400">
          It only takes a minute to start your journey to distraction-free work.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/signup')}
          className="px-8 py-3 md:px-10 md:py-4 text-lg md:text-xl font-bold bg-[#0f2027] text-[#a0e9ff] rounded-full shadow-2xl hover:bg-[#203a43] transition duration-300 transform"
        >
          Create My Free Account
        </motion.button>
      </section>

      <Footer />
    </div>
  );
}

const aims = [
  {
    title: 'Eliminate Distractions',
    description:
      'Create a zero-interruption environment through soft blocking tools that help you stay in control — not cut off.',
    icon: 'bxs-shield-x',
  },
  {
    title: 'Focus Intentionally',
    description:
      'Whether you use a Pomodoro rhythm or a fully custom timer, AbsolutZero helps you dive into deep work with purpose.',
    icon: 'bxs-timer',
  },
  {
    title: 'Track Your Progress',
    description:
      'Monitor your focus sessions, see your improvement, and understand your patterns with clean, simple analytics.',
    icon: 'bxs-bar-chart-alt-2',
  },
  {
    title: 'Build Sustainable Habits',
    description:
      'More than productivity, AbsolutZero is about consistency. Small steps, well-tracked, done beautifully.',
    icon: 'bxs-calendar-check',
  },
];

export default Homepage;
