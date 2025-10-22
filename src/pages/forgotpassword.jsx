// src/pages/forgotpassword.jsx
import { useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Mail, ArrowLeft } from "lucide-react";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (error) setError(error.message);
    else setMessage("A password reset link has been sent to your email ❄️");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Subtle floating background glow */}
      <motion.div
        className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ top: "10%", left: "15%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700/50"
      >
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-gray-400 hover:text-cyan-400 transition">
            <Home className="w-5 h-5" />
          </Link>
          <Link to="/signin" className="text-gray-400 hover:text-cyan-400 text-sm flex items-center gap-1 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter your registered email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 p-3 rounded-lg bg-gray-900/60 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-700 hover:bg-cyan-600 p-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-sm mt-4 text-center"
          >
            {message}
          </motion.p>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-4 text-center"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
