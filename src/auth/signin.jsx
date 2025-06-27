import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BiHome } from 'react-icons/bi';

const Signin = () => {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = e => {
    e.preventDefault();
    navigate('/onboarding')
    console.log("Signing in:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary px-4">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl w-full max-w-md p-8 text-secondary dark:text-white">
        {/* Home Button */}
        <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-2xl hover:text-accent">
          <BiHome />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center font-display">Sign In</h2>
        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-dark transition">
            Sign In
          </button>
        </form>

        <div className="my-4 text-center text-sm text-secondary/70">or</div>

        <button
          onClick={() => console.log("Google sign-in")}
          className="w-full flex items-center justify-center gap-2 border border-secondary/30 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <FcGoogle size={20} />
          Sign In with Google
        </button>

        <p className="text-sm text-center mt-6 text-secondary/70">
          Need an account?{' '}
          <span
            className="text-accent hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
