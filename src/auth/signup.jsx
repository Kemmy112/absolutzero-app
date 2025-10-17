import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Loader2, Eye, EyeOff, Moon, Sun } from "lucide-react";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20"
    height="20"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.3 9 3.5l6.7-6.7C35.3 2.4 29.9 0 24 0 14.6 0 6.4 5.4 2.4 13.3l7.9 6.1C11.9 13.3 17.4 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.8-2.2 5.1-4.6 6.7l7.1 5.5C43.8 37.2 46.5 31.3 46.5 24.5z"
    />
    <path
      fill="#4A90E2"
      d="M10.3 28.4c-.5-1.4-.8-2.8-.8-4.4s.3-3 .8-4.4l-7.9-6.1C.9 17.1 0 20.4 0 24s.9 6.9 2.4 10l7.9-5.6z"
    />
    <path
      fill="#FBBC05"
      d="M24 48c6.5 0 12-2.1 16-5.7l-7.1-5.5c-2 1.3-4.6 2.1-7.2 2.1-6.6 0-12.1-4.5-14.1-10.5l-7.9 5.6C6.4 42.6 14.6 48 24 48z"
    />
  </svg>
);


export default function Signup({ onSuccessRedirect = '/onboarding' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);

  // Password strength score: 0-4
  const passwordStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(password);

  useEffect(() => {
    // simple dark mode toggle tied to body class
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const validateForm = () => {
    setError('');
    if (!name.trim()) return setError('Please enter your full name.'), false;
    if (!email.trim()) return setError('Please enter your email.'), false;
    if (!password) return setError('Please enter a password.'), false;
    if (strength < 2) return setError('Password is too weak. Use 8+ chars, mix letters & numbers.'), false;
    if (password !== confirm) return setError('Passwords do not match.'), false;
    if (!agree) return setError('You must agree to the terms and conditions.'), false;
    return true;
  };

  const handleSignup = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    setMessage('');

    try {
     
      const { data, error } = await supabase.auth.signUp({
       email,
       password,
       options: {
    data: { full_name: name },
  },
});

      if (error) throw error;

      
      setMessage('Check your email for a verification link. After verifying, you can log in.');
   
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (oauthError) throw oauthError;
      // On success, user will be redirected by Supabase to the configured redirect URL
    } catch (err) {
      setError(err.message || 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 sm:p-8 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold">AZ</div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Create your account</h1>
              <p className="text-sm text-slate-500 dark:text-slate-300">Fast. Focused. Private.</p>
            </div>
          </div>

          <button
            onClick={() => setDark(prev => !prev)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-700 border-gray-100 dark:border-slate-700"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600 dark:text-slate-300">Full name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
             className="w-full p-3 border rounded-lg bg-transparent 
             border-gray-300 dark:border-gray-600 
             text-gray-800 dark:text-gray-100 
             placeholder-gray-400 dark:placeholder-gray-400
             focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
             transition"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600 dark:text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border rounded-lg bg-transparent 
             border-gray-300 dark:border-gray-600 
             text-gray-800 dark:text-gray-100 
             placeholder-gray-400 dark:placeholder-gray-400
             focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
             transition"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block col-span-2 relative">
              <span className="text-sm text-slate-600 dark:text-slate-300">Password</span>
              <div className="mt-1 flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password"
                  className="w-full p-3 border rounded-lg bg-transparent 
             border-gray-300 dark:border-gray-600 
             text-gray-800 dark:text-gray-100 
             placeholder-gray-400 dark:placeholder-gray-400
             focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
             transition"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="ml-2 p-2 rounded-md">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Strength:</span>
                  <div className="flex gap-1">
                    {[0,1,2,3].map(i => (
                      <span key={i} className={`w-8 h-1 rounded ${i < strength ? 'bg-cyan-400' : 'bg-slate-200 dark:bg-slate-700'}`}></span>
                    ))}
                  </div>
                  <span className="ml-2">{['Very weak','Weak','Okay','Strong'][Math.max(0, strength-1)]}</span>
                </div>
              </div>
            </label>

            <label className="block col-span-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">Confirm Password</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm password"
                className="w-full p-3 border rounded-lg bg-transparent 
             border-gray-300 dark:border-gray-600 
             text-gray-800 dark:text-gray-100 
             placeholder-gray-400 dark:placeholder-gray-400
             focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
             transition"
              />
            </label>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
            <div className="text-slate-600 dark:text-slate-300">I agree to the <a href="/terms" className="text-cyan-600 dark:text-cyan-400 underline">Terms & Conditions</a></div>
          </label>

          {error && <div className="text-sm text-red-500">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-3 rounded-lg py-2 font-medium bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow hover:opacity-95 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create account'}
            </button>

            <button
  type="button"
  onClick={handleGoogle}
  disabled={loading}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
>
  <GoogleIcon />
  <span className="text-sm">Google</span>
</button>

          </div>

          <div className="text-sm text-center text-slate-500 dark:text-slate-400">Already have an account? <a href="/login" className="text-cyan-600 dark:text-cyan-400 underline">Log in</a></div>
        </form>

      
      </div>
    </div>
  );
}
