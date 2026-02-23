import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/dashboardlayout";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import {
  User, Zap, Trophy, Hourglass, Shield,
  History, Target, Lock, ChevronRight, Activity, Calendar
} from "lucide-react";

/* ---------- Modern Progress Ring ---------- */
const ProgressRing = ({ percent, label, subtext }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="flex items-center gap-5 p-2">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-800"
          />
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="text-cyan-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold tracking-tighter dark:text-white">{percent}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{label}</p>
        <p className="text-xs text-slate-500">{subtext}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  const dailyGoalHours = 4;
  const hoursFocusedToday = 3.5;
  const goalProgressPercent = Math.min(Math.round((hoursFocusedToday / dailyGoalHours) * 100), 100);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) { navigate("/signin"); return; }
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, profile_image_url")
        .eq("id", data.user.id)
        .single();

      if (profile?.username) setUsername(profile.username);
      if (profile?.profile_image_url) setProfileImageUrl(profile.profile_image_url);
    };
    fetchProfile();
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <DashboardLayout onLogout={() => supabase.auth.signOut().then(() => navigate("/signin"))}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-20">
        
        {/* Header Section */}
        <header className="px-6 pt-10 pb-8 max-w-7xl mx-auto flex justify-between items-end">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Live</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {greeting}, <span className="text-cyan-500">{username || "User"}</span>.
            </h1>
          </motion.div>

          {profileImageUrl ? (
            <img src={profileImageUrl} className="w-14 h-14 rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 border border-cyan-500/20 shadow-lg">
              <User size={28} />
            </div>
          )}
        </header>

        <motion.main 
          variants={containerVariants} initial="hidden" animate="visible"
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Top Row: Focus Goal & Quick Stats */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-8">
            <ProgressRing percent={goalProgressPercent} label="Daily Goal" subtext={`${hoursFocusedToday}h of ${dailyGoalHours}h completed`} />
            <div className="h-px sm:h-12 w-full sm:w-px bg-slate-100 dark:bg-slate-800" />
            <div className="flex gap-12">
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Streak</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">4</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Blocked</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">27</p>
                </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4 bg-cyan-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-cyan-500/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
                <Lock className="mb-4 opacity-80" size={32} />
                <h3 className="text-2xl font-bold leading-tight">Ready for deep work?</h3>
            </div>
            <button className="relative z-10 mt-6 w-full py-3 bg-white text-cyan-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-50 transition-all active:scale-95">
              Lock In Now <ChevronRight size={18} />
            </button>
            <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
          </motion.div>

          {/* Activity & Priorities Row */}
          <motion.div variants={itemVariants} className="md:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                    <Activity size={20} className="text-cyan-500" /> Focus History
                </h3>
                <button className="text-xs font-bold text-cyan-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "Design System Refactor", time: "55m", type: "Product" },
                { title: "Client Meeting Prep", time: "1h 15m", type: "Management" },
                { title: "Review Q3 Analytics", time: "30m", type: "Data" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        <div>
                            <p className="font-bold text-sm dark:text-slate-200">{item.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.type}</p>
                        </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
                    <Target size={18} className="text-emerald-500" /> Top Priority
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">Finalize presentation slides for tomorrow's meeting</p>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full bg-emerald-500" />
                </div>
                <div className="flex justify-between mt-3">
                    <span className="text-[10px] font-black uppercase text-slate-400">Progress</span>
                    <span className="text-[10px] font-black uppercase text-emerald-500">75%</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <Calendar size={20} className="text-slate-400" />
                    <span className="text-[10px] font-bold uppercase dark:text-slate-300">Schedule</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <History size={20} className="text-slate-400" />
                    <span className="text-[10px] font-bold uppercase dark:text-slate-300">Archive</span>
                </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </DashboardLayout>
  );
}