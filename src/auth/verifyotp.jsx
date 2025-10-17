import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

export default function Verifyotp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) setErrorMsg(error.message);
    else navigate("/onboarding");
  };

  const resendOtp = async () => {
    await supabase.auth.signInWithOtp({ email });
    setTimer(60);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-sky-700 mb-4">
          Verify your email
        </h1>
        <p className="text-center text-sky-600 mb-6">
          We’ve sent a 6-digit code to <b>{email}</b>
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 outline-none text-center text-lg tracking-widest"
            required
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl"
          >
            Verify
          </button>

          <div className="text-center text-sm mt-3 text-sky-700">
            {timer > 0 ? (
              <p>Resend code in {timer}s</p>
            ) : (
              <button type="button" onClick={resendOtp} className="underline">
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}


