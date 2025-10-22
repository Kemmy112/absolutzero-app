import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Signin() {
  const [email, setEmail] = useState(localStorage.getItem("az_email") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // { text, type: 'error' | 'success' }
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

  // 🔐 Handle sign-in
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage({ text: error.message || "Sign in failed", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setMessage({ text: "Signin success!", type: "success" });
    setTimeout(() => navigate("/dashboard"), 1000);
  };


  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const shakeVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-center text-sky-700 mb-2">
          Welcome back
        </h1>
        <p className="text-center text-sky-600 mb-6">
          Sign in to continue your focus journey
        </p>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-sky-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-sky-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgotpassword" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {message.text && (
              <motion.p
                key={message.text}
                variants={message.type === "error" ? shakeVariants : messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`text-center text-sm font-medium mt-2 ${
                  message.type === "error" ? "text-red-500" : "text-green-600"
                }`}
              >
                {message.text}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl flex justify-center items-center transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>

          <p className="text-center text-sm mt-3 text-sky-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-sky-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
