// src/pages/Onboarding.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Loader2, ArrowRight, ArrowLeft, Sun, Moon } from "lucide-react";


export default function Onboarding() {
  const navigate = useNavigate();

  // Steps
  const totalSteps = 5;
  const [step, setStep] = useState(1);

  // Theme (keep AbsolutZero vibe)
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Auth / user
  const [user, setUser] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (data?.user) setUser(data.user);
      else {
        // Not authenticated - send to signin
        navigate("/signin");
      }
    })();
    return () => (mounted = false);
  }, [navigate]);

  // Form state (mirrors table/persisted values)
  const [formData, setFormData] = useState({
    full_name: "", 
    username: "",
    goals: [], 
    preferences: [], 
    discovery: "",
    profile_image_url: "",
    preview: null, 
  });

  // Loading / saving states
  const [loadingSave, setLoadingSave] = useState(false);
  const [stepLoading, setStepLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Username checking
  const [usernameAvailable, setUsernameAvailable] = useState(null); 
  const [checkingUsername, setCheckingUsername] = useState(false);
  const usernameDebounce = useRef(null);

  // Options for goals / prefs / discovery
  const goalsList = [
    "Focus more",
    "Improve productivity",
    "Reduce distractions",
    "Organize work",
    "Manage time",
    "Stay consistent",
  ];
  const prefsList = [
    "Minimal & quiet",
    "Chill & steady",
    "Energetic & goal-driven",
    "Night focus mode",
    "Early bird style",
  ];
  const discoveryOptions = [
    { value: "", label: "Select one..." },
    { value: "friend", label: "From a friend" },
    { value: "social", label: "Social media" },
    { value: "event", label: "Developer event" },
    { value: "web", label: "Found it online" },
    { value: "other", label: "Other" },
  ];

  // Localstorage key
  const LS_KEY = "absolutzero:onboarding";

  // Load saved progress from localStorage and Supabase (if available)
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((f) => ({ ...f, ...parsed }));
      } catch (e) {
        
      }
    }

    // Also fetch profile row if user exists (populate values)
    (async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          // map DB data to formData
          setFormData((f) => ({
            ...f,
            full_name: data.full_name ?? f.full_name,
            username: data.username ?? f.username,
            goals: data.goals ?? f.goals,
            preferences: data.preferences ?? f.preferences,
            discovery: data.discovery ?? f.discovery,
            profile_image_url: data.profile_image_url ?? f.profile_image_url,
            preview: data.profile_image_url ?? f.preview,
          }));
        } else {
          // if user metadata has full_name from signup, use it
          const metaName = user.user_metadata?.full_name;
          if (metaName) setFormData((f) => ({ ...f, full_name: metaName }));
        }
      } catch (err) {
        console.error("fetch profile:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Save to localStorage every time formData changes
  useEffect(() => {
    const toStore = { ...formData };
    // preview is ephemeral, don't store the blob URL
    delete toStore.preview;
    localStorage.setItem(LS_KEY, JSON.stringify(toStore));
  }, [formData]);

  // Helper: update form field
  const setField = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  // Live username check (debounced)
  useEffect(() => {
    if (!formData.username || !formData.username.trim()) {
      setUsernameAvailable(null);
      setCheckingUsername(false);
      return;
    }

    // allow letters, numbers, underscore, dot
    const pattern = /^[a-zA-Z0-9._]+$/;
    if (!pattern.test(formData.username)) {
      setUsernameAvailable(false);
      setCheckingUsername(false);
      return;
    }

    // debounce
    if (usernameDebounce.current) clearTimeout(usernameDebounce.current);
    usernameDebounce.current = setTimeout(async () => {
      try {
        setCheckingUsername(true);
        setUsernameAvailable(null);
        // check profiles table for username existence (case-insensitive)
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .ilike("username", formData.username.trim())
          .limit(1);
        if (error) throw error;

        // if data length > 0 and it's not the current user's profile => taken
        if (data && data.length > 0) {
          // If the found profile belongs to this user, it's allowed
          const foundId = data[0].id;
          if (foundId === user?.id) setUsernameAvailable(true);
          else setUsernameAvailable(false);
        } else {
          setUsernameAvailable(true);
        }
      } catch (err) {
        console.error("username check:", err);
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 550);

    return () => {
      if (usernameDebounce.current) clearTimeout(usernameDebounce.current);
    };
  }, [formData.username, user]);

  // Save a single field or the whole form to Supabase profiles table (upsert on id)
  const saveToSupabase = async (dataToSave = {}) => {
    if (!user) {
      setErrorMsg("Not authenticated. Please sign in.");
      return false;
    }

    setLoadingSave(true);
    setErrorMsg("");
    try {
      // Build object with id = user.id
      const payload = {
        id: user.id,
        full_name: formData.full_name,
        username: formData.username || null,
        goals: formData.goals,
        preferences: formData.preferences,
        discovery: formData.discovery || null,
        profile_image_url: formData.profile_image_url || null,
        updated_at: new Date(),
        ...dataToSave,
      };

      // Upsert - insert or update profile row
      const { error } = await supabase.from("profiles").upsert(payload, {
        returning: "minimal",
      });

      if (error) throw error;
      // clear localStorage only for specific keys? We'll leave it until finished
      setLoadingSave(false);
      return true;
    } catch (err) {
      console.error("save profile:", err);
      setErrorMsg(err.message || "Failed saving profile. Try again.");
      setLoadingSave(false);
      return false;
    }
  };

  // Navigation helpers with short transitions
  const goNext = async () => {
    // Block advancing from step 1 if username invalid / checking
    if (step === 1) {
      if (checkingUsername) return;
      if (!formData.username || !formData.username.trim() || !usernameAvailable) {
        setErrorMsg("Please pick a valid and available username.");
        return;
      }
    }

    // For steps 1-4, save to supabase before moving on
    setErrorMsg("");
    setStepLoading(true);
    if (step === 1 && usernameAvailable) {
      // Save username immediately
      await saveToSupabase({ username: formData.username });
    } else if (step === 2) {
      await saveToSupabase({ goals: formData.goals });
    } else if (step === 3) {
      await saveToSupabase({ preferences: formData.preferences });
    } else if (step === 4) {
      await saveToSupabase({ discovery: formData.discovery });
    }

    setTimeout(() => {
      setStep((s) => Math.min(totalSteps, s + 1));
      setStepLoading(false);
    }, 220);
  };

  const goPrev = () => {
    setStepLoading(true);
    setTimeout(() => {
      setStep((s) => Math.max(1, s - 1));
      setStepLoading(false);
    }, 180);
  };

  // Toggle multi-select helpers
  const toggleGoal = (goal) =>
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));

  const togglePreference = (pref) =>
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));

  // Image upload handler: instantly upload to profile-images bucket and set public URL
  const handleImageSelected = async (file) => {
    if (!file || !user) return;
    setUploadingImage(true);
    setErrorMsg("");
    try {
      // sanitize file name
      const cleanName = file.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = `${user.id}/${Date.now()}_${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      // get public url
      const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
      const publicUrl = data?.publicUrl ?? "";

      // set preview + url locally and immediately save to DB
      setFormData((p) => ({ ...p, preview: publicUrl, profile_image_url: publicUrl }));
      await saveToSupabase({ profile_image_url: publicUrl });

      setUploadingImage(false);
    } catch (err) {
      console.error("upload image:", err);
      setErrorMsg("Image upload failed. Try again.");
      setUploadingImage(false);
    }
  };

  const handleFinish = async () => {
    setErrorMsg("");
    setStepLoading(true);
    try {
      
      const ok = await saveToSupabase();
      if (!ok) throw new Error("Failed to save profile.");

    
      localStorage.removeItem(LS_KEY);
       await supabase.auth.signOut();
      navigate("/signin");
    } catch (err) {
      setErrorMsg(err.message || "Failed to finish onboarding.");
    } finally {
      setStepLoading(false);
    }
  };

  // Motion variants
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.32 } };

  // UI
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
      style={{
        background: darkMode
          ? "radial-gradient(1200px 600px at 10% 10%, rgba(4,12,20,0.45), transparent), linear-gradient(180deg,#071122 0%, #0c2430 35%, #0f2b37 100%)"
          : "radial-gradient(1200px 600px at 10% 10%, rgba(225,245,255,0.6), transparent), linear-gradient(180deg,#f0fbff 0%, #dbf3ff 35%, #cfeefd 100%)",
      }}
    >
      <div className="w-full max-w-3xl">
        <div
          className="relative mx-auto rounded-3xl p-6 md:p-10"
          style={{
            background: darkMode ? "rgba(6,10,15,0.45)" : "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-semibold font-display">Welcome to AbsolutZero</h1>
              <span className="text-sm opacity-80 hidden md:inline">— Let’s complete your profile</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs opacity-75">Progress</span>
                <span className="text-sm font-medium">{Math.round(((step - 1) / (totalSteps - 1)) * 100)}%</span>
              </div>

              <button onClick={() => setDarkMode((d) => !d)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Progress Circles (numbered only) */}
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => {
              const n = i + 1;
              const done = n < step;
              const active = n === step;
              return (
                <div key={n} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${done ? "bg-accent text-primary" : active ? "bg-primary text-white" : darkMode ? "bg-white/6 text-white/70" : "bg-white/60 text-primary"}`}
                    style={{ boxShadow: active ? "0 6px 18px rgba(0, 212, 255, 0.12)" : undefined }}
                  >
                    {n}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thin progress bar */}
          <div className="w-full h-1 rounded-full bg-white/10 mb-6 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(((step - 1) / (totalSteps - 1)) * 100)}%`, background: "linear-gradient(90deg, rgba(0,212,255,1), rgba(160,233,255,0.65))" }} />
          </div>

          {/* Animated Step Content */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div key={step} {...fade}>
                <h2 className="text-lg font-semibold mb-4">
                  {["Choose a Username", "Select Your Goals", "Set Your Preferences", "Tell Us How You Found Absolutzero", "Upload a Profile Image"][step - 1]}
                </h2>

                {/* STEP 1: Username */}
                {step === 1 && (
                  <div className="flex flex-col gap-4 max-w-md">
                    <input
                      type="text"
                      placeholder="username (letters, numbers, ., _ )"
                      value={formData.username}
                      onChange={(e) => setField("username", e.target.value.toLowerCase())}
                      className="w-full p-3 rounded-lg border border-accent bg-transparent focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <div className="flex items-center gap-3">
                      {checkingUsername ? (
                        <div className="flex items-center gap-2 text-sm text-blue-400">
                          <Loader2 size={16} className="animate-spin" /> Checking...
                        </div>
                      ) : usernameAvailable === true ? (
                        <div className="text-sm text-green-400">Available</div>
                      ) : usernameAvailable === false ? (
                        <div className="text-sm text-red-400">Taken / invalid</div>
                      ) : (
                        <div className="text-sm text-gray-400">Enter a username</div>
                      )}
                      <div className="ml-auto text-xs opacity-70">Allowed: a–z 0–9 . _</div>
                    </div>
                    {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                  </div>
                )}

                {/* STEP 2: Goals */}
                {step === 2 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {goalsList.map((g) => {
                      const active = formData.goals.includes(g);
                      return (
                        <button key={g} onClick={() => toggleGoal(g)} className={`p-3 rounded-2xl text-left transition-all border ${active ? "bg-accent text-primary border-accent-dark" : "bg-transparent border-white/10"}`}>
                          <div className="font-medium">{g}</div>
                          <div className="text-xs opacity-75 mt-1">{active ? "Selected" : "Tap to select"}</div>
                        </button>
                      );
                    })}
                    {/* custom goal input */}
                    <div className="col-span-2 md:col-span-1">
                      <input type="text" placeholder="Add a custom goal" className="w-full p-3 rounded-2xl border border-white/10 bg-transparent" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.target.value.trim();
                          if (val) {
                            setFormData((p) => ({ ...p, goals: [...p.goals, val] }));
                            e.target.value = "";
                          }
                        }
                      }} />
                      <div className="text-xs opacity-70 mt-2">Press Enter to add a custom goal</div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Preferences */}
                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {prefsList.map((p) => {
                      const active = formData.preferences.includes(p);
                      return (
                        <button key={p} onClick={() => togglePreference(p)} className={`p-3 rounded-2xl text-left transition-all border ${active ? "bg-accent text-primary border-accent-dark" : "bg-transparent border-white/10"}`}>
                          <div className="font-medium">{p}</div>
                          <div className="text-xs opacity-75 mt-1">{active ? "Included" : "Tap to include"}</div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 4: Discovery */}
                {step === 4 && (
                  <div className="max-w-md">
                    <select value={formData.discovery} onChange={(e) => setField("discovery", e.target.value)} className="w-full p-3 rounded-xl border border-white/20 bg-transparent focus:ring-2 focus:ring-accent-dark outline-none">
                      {discoveryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* STEP 5: Profile Image */}
                {step === 5 && (
                  <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-6 rounded-2xl bg-primary-light/40 backdrop-blur-md shadow-xl border border-accent/10">
                    <h3 className="text-md font-medium">Upload Your Profile Image</h3>
                    <p className="text-sm opacity-80">Optional — helps personalize your dashboard.</p>

                    {formData.preview ? (
                      <img src={formData.preview} alt="preview" className="w-28 h-28 rounded-full object-cover shadow-md border border-accent/30" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/70">No image</div>
                    )}

                    <label className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (file) {
                            // Show a temporary preview (use object URL) while uploading
                            const url = URL.createObjectURL(file);
                            setFormData((p) => ({ ...p, preview: url }));
                            handleImageSelected(file);
                          }
                        }}
                        className="hidden"
                      />
                      <div className="cursor-pointer px-4 py-2 rounded-lg bg-accent text-primary font-semibold text-sm text-center">
                        {uploadingImage ? "Uploading..." : "Choose Image"}
                      </div>
                    </label>
                    <div className="text-xs opacity-70">JPEG/PNG, max recommended 2MB</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div>
              {step > 1 ? (
                <button onClick={goPrev} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8 transition">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}
            </div>

            <div>
              {step < totalSteps ? (
                <button
                  onClick={goNext}
                  disabled={(step === 1 && (usernameAvailable === false || checkingUsername)) || stepLoading}
                  className={`px-5 py-2 rounded-lg font-medium transition ${step === 1 && (usernameAvailable === false || checkingUsername) ? "bg-gray-400 cursor-not-allowed text-white" : "bg-accent hover:bg-accent-dark text-primary"}`}
                >
                  Next <ArrowRight size={16} className="inline-block ml-2" />
                </button>
              ) : (
                <button onClick={handleFinish} disabled={stepLoading || loadingSave} className="px-5 py-2 rounded-lg font-medium transition bg-primary-light hover:brightness-95 text-white">
                  {loadingSave || stepLoading ? <div className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Saving...</div> : "Finish"}
                </button>
              )}
            </div>
          </div>

          {errorMsg && <div className="mt-4 text-sm text-red-400">{errorMsg}</div>}
          <div className="mt-4 text-xs opacity-75">You can update your profile picture and preferences later in Settings.</div>

          {/* overlays */}
          {stepLoading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl" style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.12)" }}>
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={28} className="animate-spin" />
                <div>Preparing next step…</div>
              </div>
            </div>
          )}

          {loadingSave && (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl" style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.18)" }}>
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={32} className="animate-spin" />
                <div>Saving changes…</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
