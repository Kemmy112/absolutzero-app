import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => navigate("/onboarding"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center`}>
      <div className="absolute top-4 left-4 flex gap-3">
        <Link to="/"><Home className="w-6 h-6" /></Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
      <div className="bg-gray-800 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Email Confirmed 🎉</h2>
        <p className="mb-4">Redirecting you to onboarding...</p>
        <button
          onClick={() => navigate("/onboarding")}
          className="w-full bg-cyan-700 hover:bg-cyan-600 p-3 rounded-lg font-semibold"
        >
          Continue Now
        </button>
      </div>
    </div>
  );
}
