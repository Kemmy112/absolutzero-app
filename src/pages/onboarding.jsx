import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabase";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [formData, setFormData] = useState({
    goals: "",
    preferences: "",
    source: "",
    profileImage: null,
  });

  const totalSteps = 5;

  // 🧊 Real-time username validation
  useEffect(() => {
    const checkUsername = async () => {
      if (username.trim().length < 3) {
        setUsernameStatus("Too short");
        return;
      }
      const validPattern = /^[a-zA-Z0-9._]+$/;
      if (!validPattern.test(username)) {
        setUsernameStatus("Invalid characters");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();
      if (data) setUsernameStatus("Taken");
      else setUsernameStatus("Available");
    };

    if (username) {
      const debounce = setTimeout(checkUsername, 600);
      return () => clearTimeout(debounce);
    } else {
      setUsernameStatus("");
    }
  }, [username]);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async () => {
    // handle saving onboarding data
    console.log("Submitting onboarding:", { username, ...formData });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Progress Circles */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        {[...Array(totalSteps)].map((_, i) => {
          const stepNum = i + 1;
          const isActive = step >= stepNum;
          return (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold 
                ${isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {stepNum}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`w-8 h-1 ${
                    step > stepNum ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Steps Content */}
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Choose a unique username
              </h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="username"
              />
              {usernameStatus && (
                <p
                  className={`mt-2 text-sm ${
                    usernameStatus === "Available"
                      ? "text-green-600"
                      : usernameStatus === "Taken"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {usernameStatus === "Available"
                    ? "Available"
                    : usernameStatus === "Taken"
                    ? "Taken"
                    : ` ${usernameStatus}`}
                </p>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={usernameStatus !== "Available"}
                  className={`px-6 py-2 rounded-lg text-white ${
                    usernameStatus === "Available"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                What are your main goals?
              </h2>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="E.g. improve focus, reduce distractions..."
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Choose your preferences
              </h2>
              <input
                type="text"
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Dark mode, focus duration..."
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                How did you hear about us?
              </h2>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select one...</option>
                <option value="friend">From a friend</option>
                <option value="social">Social media</option>
                <option value="ad">Online ad</option>
                <option value="other">Other</option>
              </select>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Upload a profile image (optional)
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Finish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
