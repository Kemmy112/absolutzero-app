import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import {
  Moon,
  Sun,
  ArrowRight,
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    goals: [],
    preferences: [],
    discovery: "",
    profileImage: null,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleGoal = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const togglePreference = (pref) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) throw new Error("User not found.");

      const user = authData.user;
      let imageUrl = null;

      // Upload profile image
      if (formData.profileImage) {
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`public/${user.id}.png`, formData.profileImage, {
            upsert: true,
          });
        if (uploadError) throw uploadError;

        const { data: publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(`public/${user.id}.png`);
        imageUrl = publicURL.publicUrl;
      }

      // Update profile info
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          goals: formData.goals,
          preferences: formData.preferences,
          discovery: formData.discovery,
          profile_image_url: imageUrl,
          updated_at: new Date(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
      alert("Error completing onboarding: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  };

  const stepTitles = [
    "Choose a Username",
    "Select Your Goals",
    "Set Your Preferences",
    "Tell Us How You Found AbsolutZero",
    "Upload a Profile Image",
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0b172a] to-[#142f46] text-white"
          : "bg-gradient-to-br from-[#e7f1ff] to-[#cde6ff] text-gray-900"
      }`}
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-md w-full bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...fade}
            className="flex flex-col items-center space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center mb-2">
              {stepTitles[step - 1]}
            </h2>

            {step === 1 && (
              <input
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-white/20 bg-transparent focus:ring-2 focus:ring-blue-400 outline-none"
              />
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {["Focus", "Discipline", "Clarity", "Productivity"].map(
                  (goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-2 rounded-lg border ${
                        formData.goals.includes(goal)
                          ? "bg-blue-500 text-white border-blue-400"
                          : "bg-transparent border-white/30"
                      }`}
                    >
                      {goal}
                    </button>
                  )
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-3">
                {["Dark Mode", "Pomodoro Timer", "Soundscapes", "Reminders"].map(
                  (pref) => (
                    <button
                      key={pref}
                      onClick={() => togglePreference(pref)}
                      className={`p-2 rounded-lg border ${
                        formData.preferences.includes(pref)
                          ? "bg-blue-500 text-white border-blue-400"
                          : "bg-transparent border-white/30"
                      }`}
                    >
                      {pref}
                    </button>
                  )
                )}
              </div>
            )}

            {step === 4 && (
              <select
                value={formData.discovery}
                onChange={(e) =>
                  setFormData({ ...formData, discovery: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-white/20 bg-transparent focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select one...</option>
                <option value="friend">A friend told me</option>
                <option value="social">Saw it on social media</option>
                <option value="web">Found it online</option>
                <option value="other">Other</option>
              </select>
            )}

            {step === 5 && (
              <div className="flex flex-col items-center space-y-3">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center border border-white/30 rounded-xl p-6 hover:bg-white/10 transition"
                >
                  <Upload size={28} />
                  <span className="mt-2">
                    {formData.profileImage
                      ? formData.profileImage.name
                      : "Upload Image (Optional)"}
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between w-full pt-6">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                >
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    "Finish"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

