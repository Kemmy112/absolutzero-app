import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Snowflake, BellOff, Target, BarChart3, Leaf, 
  ArrowLeft, Zap, ShieldCheck, Sparkles, ChevronRight 
} from "lucide-react";
import Footer from "../components/footer";
import Navbar from "../components/navbar"; // Using your updated Navbar

const About = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full min-h-screen transition-colors duration-500 bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-200">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" /> Our Philosophy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 dark:text-white mb-6"
          >
            Simplicity is the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
              Ultimate Sophistication.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            AbsolutZero was born from a simple realization: our tools should help us think, not compete for our attention. We build digital environments where deep work happens naturally.
          </motion.p>
        </div>
      </section>

      {/* 2. The Process (Step-by-Step) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 dark:text-white">How it works</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Clear the Noise", desc: "Launch into a dashboard designed to vanish, leaving only your goal in sight." },
                { step: "02", title: "Set the Freeze", desc: "Define your focus block. Whether it's 25 or 90 minutes, the environment adapts to you." },
                { step: "03", title: "Deep Flow", desc: "Enter 'Freezer Mode'. Notifications are silenced, and digital distractions are held at bay." },
                { step: "04", title: "Reflect", desc: "Analyze your patterns. Growth happens when you understand your peaks and valleys." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <span className="text-xl font-black text-cyan-500/30 dark:text-cyan-500/20 tabular-nums">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 p-1 bg-gradient-to-br from-slate-200 to-transparent dark:from-slate-800 dark:to-transparent rounded-[2.5rem]"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-12 text-center shadow-2xl">
                <div className="w-20 h-20 bg-cyan-500/10 text-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Snowflake className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Freezer Mode</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">"The world can wait."</p>
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <Zap className="w-5 h-5 text-amber-500" />
                    <BellOff className="w-5 h-5 text-rose-500" />
                </div>
              </div>
            </motion.div>
            {/* Background Glow for the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full -z-0" />
          </div>
        </div>
      </section>

      {/* 3. Core Aims (Bento Grid Style) */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold dark:text-white">Our Core Aims</h2>
          <p className="text-slate-500 mt-2">The four pillars of the AbsolutZero experience.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: BellOff, title: "Zero Distractions", color: "text-rose-500", desc: "Silence the digital noise and reclaim your mental bandwidth." },
            { icon: Target, title: "Intentionality", color: "text-cyan-500", desc: "Shift from busy-work to high-impact, meaningful progress." },
            { icon: BarChart3, title: "Deep Insights", color: "text-amber-500", desc: "Visualize your flow state to optimize your peak performance hours." },
            { icon: Leaf, title: "Sustainability", color: "text-emerald-500", desc: "Build a work rhythm that avoids burnout and promotes longevity." },
          ].map((aim, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
            >
              <aim.icon className={`w-8 h-8 ${aim.color} mb-6`} />
              <h3 className="font-bold text-lg mb-2 dark:text-white">{aim.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{aim.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-slate-950 dark:bg-white p-12 md:p-20 rounded-[3rem] text-white dark:text-slate-950 shadow-2xl overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to enter the Freezer?
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of professionals who have stopped managing time and started managing focus.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-5 bg-white dark:bg-slate-950 text-slate-950 dark:text-white font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              Get Started for Free <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {/* Subtle decorative circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
