import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/dashboardlayout";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import {
  User,
  Zap,
  Trophy,
  Hourglass,
  Shield,
  History,
  Target,
  Lock,
} from "lucide-react";

/* ---------- Responsive Circular Progress ---------- */
const CircularProgress = ({ percent, label }) => {
  // basic calculations for stroke
  const radius = 36;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100" role="img" aria-label={label}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="#a0e9ff"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2 }}
          />
          <text
            x="50"
            y="55"
            fontSize="18"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-bold"
          >
            {percent}%
          </text>
        </svg>
      </div>
      <p className="text-xs sm:text-sm text-gray-300 mt-2 text-center">{label}</p>
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
  const goalProgressPercent = Math.min(
    Math.round((hoursFocusedToday / dailyGoalHours) * 100),
    100
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning,");
    else if (hour < 18) setGreeting("Good afternoon,");
    else setGreeting("Good evening,");
  }, []);

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
      if (profile?.profile_image_url) setProfileImageUrl(profile.profile_image_url);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.message ?? err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="flex flex-col min-h-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4 sm:px-6 py-6">
        {/* Header / Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#a0e9ff] flex items-center gap-2 truncate">
              <span className="truncate">
                {greeting}
                {username ? ` ${username}` : ""}
              </span>
              <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            </h2>
            <p className="text-sm text-gray-300 mt-1 truncate">
              Let’s make today distraction-free.
            </p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={`${username || "User"}'s avatar`}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#a0e9ff] shadow-md"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-semibold border-2 border-[#a0e9ff] shadow-md">
                <User className="w-5 h-5 text-white/80" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Main grid: responsive - single col on mobile, 2 columns on sm, 3 on lg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* LEFT: span 2 on larger screens */}
          <div className="sm:col-span-2 space-y-6">
            {/* Quick stats: responsive grid (2 cols on small, 4 on md+) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/10 transition shadow-md border border-white/5 flex flex-col justify-center">
                <p className="text-gray-300 text-xs sm:text-sm">Current Streak</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> 4
                </h3>
                <span className="text-xs text-gray-400 mt-1">days</span>
              </div>

              <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/10 transition shadow-md border border-white/5 flex flex-col justify-center">
                <p className="text-gray-300 text-xs sm:text-sm">Total Today</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  3.5 <Hourglass className="w-5 h-5 text-[#a0e9ff]" />
                </h3>
                <span className="text-xs text-gray-400 mt-1">hours</span>
              </div>

              <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/10 transition shadow-md border border-white/5 flex flex-col justify-center">
                <p className="text-gray-300 text-xs sm:text-sm">Distractions Blocked</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" /> 27
                </h3>
                <span className="text-xs text-gray-400 mt-1">items</span>
              </div>

              <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center shadow-md border border-white/5">
                <CircularProgress percent={goalProgressPercent} label={`Goal: ${dailyGoalHours}h`} />
              </div>
            </motion.div>

            {/* Lock-in Session */}
            <motion.div
              variants={itemVariants}
              className="bg-white/6 backdrop-blur-lg rounded-2xl p-5 shadow-lg hover:bg-white/10 transition border border-white/8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#a0e9ff] mb-1">
                    Start New Focus Session
                  </h3>
                  <p className="text-sm text-gray-300">
                    Define your apps and duration to start a deep work session.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 sm:mt-0 inline-flex items-center gap-2 bg-[#a0e9ff] text-[#0f2027] px-4 sm:px-6 py-2.5 rounded-full font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#89d8ff]"
                  aria-label="Lock in focus session"
                >
                  <Lock className="w-4 h-4" />
                  Lock In Now
                </motion.button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              variants={itemVariants}
              className="bg-white/6 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/5"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-gray-400" /> Recent Focus History
              </h3>
              <ul className="space-y-3">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300 border-b border-white/5 pb-2">
                  <span className="font-medium">Design System Refactor</span>
                  <span className="mt-2 sm:mt-0 text-sm bg-[#a0e9ff]/20 text-[#a0e9ff] px-2 py-1 rounded-full inline-block">55m</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300 border-b border-white/5 pb-2">
                  <span className="font-medium">Client Meeting Prep</span>
                  <span className="mt-2 sm:mt-0 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full inline-block">1h 15m</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300">
                  <span className="font-medium">Review Q3 Analytics</span>
                  <span className="mt-2 sm:mt-0 text-sm bg-[#a0e9ff]/20 text-[#a0e9ff] px-2 py-1 rounded-full inline-block">30m</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* RIGHT column (sidebar) */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white/6 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/5"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" /> Today's Top Priority
              </h3>
              <p className="text-sm font-bold text-white mb-3">
                Finalize presentation slides for tomorrow's meeting
              </p>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-green-400"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">75% Complete</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/6 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/5"
            >
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">▶️ Review Weekly Report</li>
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">⚙️ Configure Blocked Sites</li>
                <li className="text-gray-300 hover:text-[#a0e9ff] cursor-pointer transition">📚 Read Focus Tips</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
