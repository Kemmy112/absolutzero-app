import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { Home, Moon, Sun } from "lucide-react";

export default function Onboarding() {
  const [focusGoal, setFocusGoal] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleOnboarding = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ focus_goal: focusGoal }).eq("id", user.id);
    }
    navigate("/dashboard");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center`}>
      <div className="absolute top-4 left-4 flex gap-3">
        <Link to="/"><Home className="w-6 h-6" /></Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      <div className="w-full max-w-md bg-gray-800 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Set Up Your Focus</h2>
        <form onSubmit={handleOnboarding} className="space-y-4">
          <input type="text" placeholder="Your focus goal..." className="w-full p-3 rounded-lg text-black" value={focusGoal} onChange={(e) => setFocusGoal(e.target.value)} required />
          <button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-600 p-3 rounded-lg font-semibold transition">Continue to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
