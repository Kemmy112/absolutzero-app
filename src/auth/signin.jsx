import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { Sun, Home, Eye, EyeOff, Moon,} from "lucide-react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      navigate("/dashboard");
    }
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
        <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
        {message && <p className="mb-4 text-red-400">{message}</p>}
        <form onSubmit={handleSignin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full p-3 rounded-lg text-black"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
</div>

          <button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-600 p-3 rounded-lg font-semibold transition">Sign In</button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          Don’t have an account? <Link to="/signup" className="text-cyan-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
