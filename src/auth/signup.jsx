import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTnC, setAgreeTnC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("signupData"));
    if (saved) {
      setFullName(saved.fullName || "");
      setEmail(saved.email || "");
      setPassword(saved.password || "");
      setConfirmPassword(saved.confirmPassword || "");
      setAgreeTnC(saved.agreeTnC || false);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      "signupData",
      JSON.stringify({ fullName, email, password, confirmPassword, agreeTnC })
    );
  }, [fullName, email, password, confirmPassword, agreeTnC]);

  // Password strength checker
  useEffect(() => {
    if (!password) return setPasswordStrength("");
    const strongPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPattern.test(password)) setPasswordStrength("Weak");
    else setPasswordStrength("Strong");
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const strongPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPattern.test(password)) {
      setErrorMsg(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!agreeTnC) {
      setErrorMsg("You must agree to the Terms and Conditions.");
      return;
    }

    try {
      setLoading(true);

      // Supabase: send OTP to email
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { full_name: fullName, tempPassword: password },
          shouldCreateUser: true,
        },
      });

      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        // Redirect to verify OTP page
        navigate("/verifyotp", { state: { email } });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMsg("Unexpected error occurred. Please try again.");
    }
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
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {password && (
            <p
              className={`text-sm ${
                passwordStrength === "Strong" ? "text-green-600" : "text-red-600"
              }`}
            >
              Password strength: {passwordStrength}
            </p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agreeTnC}
              onChange={(e) => setAgreeTnC(e.target.checked)}
              className="w-4 h-4"
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="text-sky-600 hover:underline">
                Terms and Conditions
              </a>
            </span>
          </label>

          {/* Error */}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <a href="/signin" className="text-sky-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}


