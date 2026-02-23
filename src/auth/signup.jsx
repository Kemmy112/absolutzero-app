import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import { 
  Loader2, Eye, EyeOff, User, Mail, Lock, 
  ArrowLeft, Snowflake, ChevronRight 
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTnC: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("signup_draft"));
    if (saved) setFormData(prev => ({ ...prev, ...saved }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    const updatedData = { ...formData, [name]: newVal };
    setFormData(updatedData);
    
    // Persist draft
    localStorage.setItem("signup_draft", JSON.stringify(updatedData));

    if (name === "password") {
      let score = 0;
      if (value.length > 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[\W_]/.test(value)) score++;
      setPasswordStrength(score);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (passwordStrength < 2) {
      setErrorMsg("Please use a stronger password.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          data: { full_name: formData.fullName, tempPassword: formData.password },
          shouldCreateUser: true,
        },
      });

      if (error) throw error;
      localStorage.removeItem("signup_draft");
      navigate("/verifyotp", { state: { email: formData.email } });
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-12 transition-colors duration-500 bg-slate-50 dark:bg-[#020617] overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      {/* Navigation - Fixed width container to match form center */}
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
        {/* The Card - Added defined borders and smaller max-width */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl py-10 px-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 ring-8 ring-slate-900/[0.02] dark:ring-white/[0.02]">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-4">
              <Snowflake className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Join the minimalist productivity movement.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="relative group">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 transition-all dark:text-white"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 transition-all dark:text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 transition-all dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-cyan-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="flex gap-1.5 px-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i < passwordStrength 
                        ? (passwordStrength <= 2 ? 'bg-amber-400' : 'bg-cyan-500') 
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Terms */}
            <div className="flex items-center gap-3 px-1 py-2">
              <input
                name="agreeTnC"
                type="checkbox"
                checked={formData.agreeTnC}
                onChange={handleChange}
                className="h-5 w-5 rounded-lg border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500 transition-all cursor-pointer"
                required
              />
              <label className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                I agree to the <Link to="/terms" className="text-cyan-600 font-semibold hover:underline">Terms of Service</Link>
              </label>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium"
              >
                {errorMsg}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-xl shadow-cyan-500/20 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ChevronRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/signin" className="font-bold text-cyan-600 hover:text-cyan-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}