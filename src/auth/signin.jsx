import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, EyeOff, Loader2, Mail, Lock, 
  ArrowLeft, Snowflake, ChevronRight, LogIn 
} from "lucide-react";

export default function Signin() {
  const [email, setEmail] = useState(localStorage.getItem("az_email") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("az_email"));
  const navigate = useNavigate();

  // 🚀 Auto redirect if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) navigate("/dashboard");
    };
    checkUser();
  }, [navigate]);

  // 💾 Save email locally if "Remember me" is checked
  useEffect(() => {
    if (rememberMe && email) {
      localStorage.setItem("az_email", email);
    } else {
      localStorage.removeItem("az_email");
    }
  }, [rememberMe, email]);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage({ text: error.message || "Sign in failed", type: "error" });
      return;
    }

    setMessage({ text: "Welcome back!", type: "success" });
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  const shakeVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-12 transition-colors duration-500 bg-slate-50 dark:bg-[#020617] overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      {/* Top Navigation */}
      <div className="w-full max-w-md mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to home</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* The Card */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl py-10 px-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 ring-8 ring-slate-900/[0.02] dark:ring-white/[0.02]">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-4">
              <LogIn className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSignin} className="space-y-5">
            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 transition-all dark:text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 transition-all dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-cyan-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500 transition-all"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  Remember me
                </span>
              </label>
              <Link to="/forgotpassword" size="sm" className="text-sm font-semibold text-cyan-600 hover:text-cyan-500 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {message.text && (
                <motion.div
                  key={message.text}
                  variants={message.type === "error" ? shakeVariants : {}}
                  initial="initial"
                  animate="animate"
                  className={`p-4 rounded-2xl text-sm font-medium border ${
                    message.type === "error" 
                      ? "bg-red-500/10 border-red-500/20 text-red-500" 
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-xl shadow-cyan-500/20 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Sign In <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-cyan-600 hover:text-cyan-500 transition-colors">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}