import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Snowflake,
  Lock,
  User,
  Target,
  History,
  Trophy, // 💡 Replacing '🔥' (Streak)
  Zap, // 💡 Replacing '❄️' (Greeting/Brand Accent)
  Hourglass, // 💡 Replacing 'h' in stats for visual consistency
  Shield, // 💡 Replacing '27' (Distractions)
} from "lucide-react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

// Simple Placeholder Component for the Progress Bar (Unchanged)
const CircularProgress = ({ percent, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#2c5364"
          strokeWidth="10"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#a0e9ff"
          strokeWidth="10"
          strokeDasharray={2 * Math.PI * 45}
          strokeDashoffset={2 * Math.PI * 45 * (1 - percent / 100)} 
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - percent / 100) }}
          transition={{ duration: 1.5 }}
        />
        <text
          x="50"
          y="55"
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-bold"
        >
          {percent}%
        </text>
      </svg>
    </div>
    <p className="text-sm text-gray-400 mt-2">{label}</p>
  </div>
);


export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null); 
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  // Dummy data
  const dailyGoalHours = 4;
  const hoursFocusedToday = 3.5;
  const goalProgressPercent = Math.min(
    Math.round((hoursFocusedToday / dailyGoalHours) * 100),
    100
  );

  // ⏰ Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // 👤 Fetch profile username and image URL
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigate("/signin");
        return;
      }
      const userId = data.user.id;
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, profile_image_url") 
        .eq("id", userId)
        .single();

      if (profile?.username) setUsername(profile.username);
      if (profile?.profile_image_url)
        setProfileImageUrl(profile.profile_image_url);
    };

    fetchProfile();
  }, [navigate]);

  // 🚪 Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* 🧊 Sidebar (Unchanged) */}
      <aside className="hidden md:flex flex-col w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <Snowflake className="w-8 h-8 text-[#a0e9ff]" />
          <h1 className="text-2xl font-bold tracking-wide">AbsolutZero</h1>
        </div>
        <nav className="flex flex-col gap-3 flex-1">
          {[
            { icon: Home, label: "Home" },
            { icon: Clock, label: "Focus Sessions" },
            { icon: BarChart3, label: "Progress" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, x: 6, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              <item.icon className="w-5 h-5 text-[#a0e9ff]" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-auto px-4 py-3 rounded-xl hover:bg-red-500/20 transition text-red-400 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* 🌌 Main Dashboard Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-white/10"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#a0e9ff] flex items-center gap-2">
              {greeting} {username ? `, ${username}` : ""} 
              {/* 💡 Icon used instead of '❄️' emoji */}
              <Zap className="w-6 h-6 text-yellow-300" /> 
            </h2>
            <p className="text-gray-300 mt-1">
              Let’s make today distraction-free.
            </p>
          </div>

          {/* PROFILE PICTURE DISPLAY (Unchanged) */}
          <div className="mt-4 md:mt-0">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={`${username}'s avatar`}
                className="w-14 h-14 rounded-full object-cover border-3 border-[#a0e9ff] shadow-xl ring-2 ring-[#89d8ff]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold border-3 border-[#a0e9ff] shadow-xl">
                <User className="w-6 h-6 text-white/80" />
              </div>
            )}
          </div>
        </motion.div>

        {/* MAIN CONTENT GRID LAYOUT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT/MAIN COLUMN (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Quick Stats & Daily Progress (Icon-Replaced) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-4 gap-6"
            >
              {/* Stat 1: Streak */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition shadow-lg border border-white/5">
                <p className="text-gray-300 text-sm">Current Streak</p>
                {/* 💡 Icon used instead of '🔥' emoji */}
                <h3 className="text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" /> 4 Days
                </h3>
              </div>
              
              {/* Stat 2: Total Hours */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition shadow-lg border border-white/5">
                <p className="text-gray-300 text-sm">Total Today</p>
                {/* 💡 Icon used instead of just 'h' */}
                <h3 className="text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                    3.5 <Hourglass className="w-6 h-6 text-[#a0e9ff]" />
                </h3>
              </div>

              {/* Stat 3: Distractions Blocked */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition shadow-lg border border-white/5">
                <p className="text-gray-300 text-sm">Distractions Blocked</p>
                {/* 💡 Icon used as visual context */}
                <h3 className="text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6 text-red-400" /> 27
                </h3>
              </div>

              {/* Stat 4: Progress Circle (Unchanged) */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center shadow-lg border border-white/5">
                <CircularProgress percent={goalProgressPercent} label={`Goal: ${dailyGoalHours}h`} />
              </div>
            </motion.div>

            {/* 2. Lock-In Session (Unchanged) */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:bg-white/20 transition-all border border-white/10"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[#a0e9ff] mb-1">
                    Start New Focus Session
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Define your apps and duration to start a deep work session.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(160, 233, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-[#a0e9ff] text-[#0f2027] px-8 py-3 rounded-full font-bold shadow-lg transition duration-200"
                >
                  <Lock className="w-5 h-5" />
                  Lock In Now
                </motion.button>
              </div>
            </motion.div>

            {/* 3. Recent Activity Widget (Unchanged) */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-400" /> Recent Focus History
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-300 border-b border-white/5 pb-2">
                    <span className="font-medium">Design System Refactor</span>
                    <span className="text-sm bg-[#a0e9ff]/20 text-[#a0e9ff] px-3 py-1 rounded-full">55m</span>
                </li>
                <li className="flex justify-between items-center text-gray-300 border-b border-white/5 pb-2">
                    <span className="font-medium">Client Meeting Prep</span>
                    <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">1h 15m</span>
                </li>
                <li className="flex justify-between items-center text-gray-300">
                    <span className="font-medium">Review Q3 Analytics</span>
                    <span className="text-sm bg-[#a0e9ff]/20 text-[#a0e9ff] px-3 py-1 rounded-full">30m</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* RIGHT/SIDEBAR COLUMN (Unchanged) */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5"
            >
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" /> Today's Top Priority
              </h3>
              <p className="text-lg font-bold text-white mb-4">
                "Finalize presentation slides for tomorrow's meeting"
              </p>
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-green-400"
                ></motion.div>
              </div>
              <p className="text-sm text-gray-400 mt-2">75% Complete</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5"
            >
              <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">
                    ▶️ Review Weekly Report
                </li>
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">
                    ⚙️ Configure Blocked Sites
                </li>
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">
                    📚 Read Focus Tips
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}


