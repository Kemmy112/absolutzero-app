import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function VerifyEmail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const location = useLocation();
const email = location.state?.email;

  const handleVerify = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup',
    });

    if (error) {
      setError('Invalid or expired OTP');
    } else {
      navigate('/signin'); // or straight to dashboard if already authenticated
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <h2 className="text-2xl font-bold mb-2 text-accent">Verify your email</h2>
      <p className="mb-4">We sent a 6-digit code to <strong>{email}</strong>. Please enter it below.</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="px-4 py-2 rounded text-black w-64 mb-3"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={loading}
        className="px-6 py-2 rounded bg-accent text-black hover:scale-105 transition"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>

      <button
        onClick={() => navigate('/')}
        className="mt-4 text-blue-400 underline text-sm"
      >
        Back to Home
      </button>
    </div>
  );
}

