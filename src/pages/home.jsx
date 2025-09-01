import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] dark:text-[#a0e9ff] transition-colors">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Zero Distraction. Absolut Productivity.
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg">
            A productivity timer with chill vibes to help you work in focused bursts and cool down in breaks.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 text-primary font-semibold bg-[#a0e9ff] text-[#0f2027] rounded-full shadow-lg hover:bg-[#d0faff] transition"
          >
            Get Started
          </button>
         
        </div>
      </section>

      {/* Aims Section */}
      <section className="px-6 py-16 bg-transparent">
        <h2 className="text-3xl font-bold text-center mb-12">Our Aims</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {aims.map((aim, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between p-6 rounded-xl bg-[#a0e9ff] text-[#0f2027] shadow-md"
            >
              <div className="text-4xl text-accent mb-4">
                <i className={`bx ${aim.icon}`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{aim.title}</h3>
              <p className="text-sm">{aim.description}</p>
            </motion.div>
          ))}
        </div>
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
