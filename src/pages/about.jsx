import React from "react";
import { motion } from "framer-motion";
import { Snowflake, BellOff, Target, BarChart, Leaf } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] dark:text-[#a0e9ff] transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Hero / Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-sky-700 dark:text-[#a0e9ff] mb-6"
        >
          About AbsolutZero ❄️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto"
        >
          AbsolutZero is a distraction-free productivity app designed to help you
          reclaim your focus and build meaningful daily habits. Inspired by deep
          work and the Pomodoro technique, it turns your device into a focus
          zone where interruptions fade and progress takes center stage.
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
              { icon: Leaf, title: "Build Sustainable Habits", desc: "Form long-term habits that support lasting productivity." }
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

