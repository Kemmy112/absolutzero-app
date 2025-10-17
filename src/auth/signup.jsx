import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { full_name: fullName },
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) setErrorMsg(error.message);
    else navigate("/verifyotp", { state: { email } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-center text-sky-700 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/signin" className="text-sky-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

