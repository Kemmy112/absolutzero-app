import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BiHome } from 'react-icons/bi';
import { supabase } from '../services/supabase';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${fullName}`,
          },
        },
      });

      if (error) throw error;

      navigate('/verify-email', { state: { email } });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) setError('Google sign-in failed: ' + error.message);
    } catch (err) {
      setError('Unexpected error during Google sign-in.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary px-4">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl w-full max-w-md p-8 text-secondary dark:text-white">
        <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-2xl hover:text-accent">
          <BiHome />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center font-display">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {/* <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 w-full bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            /> */}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-dark transition">
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-secondary/70">or</div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2 border border-secondary/30 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <FcGoogle size={20} />
          Sign Up with Google
        </button>

        <p className="text-sm text-center mt-6 text-secondary/70">
          Already have an account?{' '}
          <span className="text-accent hover:underline cursor-pointer" onClick={() => navigate('/signin')}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
