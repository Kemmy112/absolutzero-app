import { useState } from "react";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Home, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        navigate("/signin");
      }, 1800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background glow animations */}
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

        <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter your new password below. Make sure it's strong and secure.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 p-3 rounded-lg bg-gray-900/60 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 p-3 rounded-lg bg-gray-900/60 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mt-2 text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-700 hover:bg-cyan-600 p-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Reset Password"}
          </motion.button>
        </form>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-10 bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-md"
          >
            Password reset successfully! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

