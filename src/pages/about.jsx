import React, { useState } from "react";
import { motion } from "framer-motion";
import { Snowflake, BellOff, Target, BarChart, Leaf } from "lucide-react";
import Footer from "../components/footer";

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] dark:text-[#a0e9ff] transition-colors duration-500">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#0f2027]/70 backdrop-blur-md border-b border-sky-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 text-sky-700 dark:text-[#a0e9ff] font-bold text-xl"
          >
            <Snowflake className="w-6 h-6 animate-spin-slow text-sky-500" />
            <span>AbsolutZero</span>
          </a>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="p-2 rounded-full bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600 transition"
            >
              <svg
                className="w-5 h-5 text-sky-700 dark:text-[#a0e9ff]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-7.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707M17.657 17.657l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            </button>

            {/* CTA Button (Glowing Icy Effect) */}
            <a
              href="/signup"
              className="relative overflow-hidden px-5 py-2.5 text-white font-semibold rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.7)]"
            >
              <span className="relative z-10">Create Account Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-700 dark:text-[#a0e9ff]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col space-y-3 bg-white/90 dark:bg-[#0f2027]/90 backdrop-blur-md border-t border-sky-100 dark:border-gray-700 animate-fadeIn">
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="w-full text-left py-2 text-gray-700 dark:text-gray-200"
            >
              Toggle Dark Mode
            </button>
            <a
              href="/signup"
              className="block text-center py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium"
            >
              Create Account Now
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-sky-700 dark:text-[#a0e9ff] mb-6"
        >
          About AbsolutZero
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto"
        >
          AbsolutZero is a distraction-free productivity app designed to help
          you reclaim your focus and build meaningful daily habits. Inspired by
          deep work and the Pomodoro technique, it turns your device into a
          focus zone where interruptions fade and progress takes center stage.
        </motion.p>
      </section>

      {/* How It Works */}
      <section className="bg-sky-50 dark:bg-transparent py-16 transition-colors">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-sky-700 dark:text-[#a0e9ff] text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.ul
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-gray-700 dark:text-gray-200"
            >
              <li>➊ Open the app – clean dashboard, no clutter.</li>
              <li>➋ Set your task – define the goal for this session.</li>
              <li>➌ Choose your timer – default Pomodoro or custom.</li>
              <li>
                ➍ Activate the{" "}
                <span className="font-semibold">Freezer Mode</span>: notifications silenced, only urgent calls/messages allowed.
              </li>
              <li>➎ Track your progress – every session is logged.</li>
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 flex items-center justify-center bg-white dark:bg-[#203a43] shadow-lg rounded-2xl border border-sky-100 dark:border-gray-600">
                <Snowflake className="w-24 h-24 text-sky-500 animate-pulse" />
                <span className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-300">
                  Focus Freeze Mode
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Aims */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-sky-700 dark:text-[#a0e9ff] text-center mb-12">
            Our Aims
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BellOff, title: "Eliminate Distractions", desc: "Block noise and interruptions to keep your attention sharp." },
              { icon: Target, title: "Focus Intentionally", desc: "Work with purpose using structured Pomodoro sessions." },
              { icon: BarChart, title: "Track Your Progress", desc: "See your sessions add up and build consistent momentum." },
              { icon: Leaf, title: "Build Sustainable Habits", desc: "Form long-term habits that support lasting productivity." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-[#203a43] p-6 rounded-2xl shadow-md text-center transition-colors"
              >
                <Icon className="w-10 h-10 text-sky-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-sky-700 dark:bg-[#0f2027] text-white py-16 transition-colors">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Enter the Freezer. Reclaim Your Time.
          </h2>
          <p className="text-lg text-sky-100 dark:text-gray-300 max-w-2xl mx-auto">
            AbsolutZero isn’t just a timer — it’s a commitment to deep focus and
            meaningful progress.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
