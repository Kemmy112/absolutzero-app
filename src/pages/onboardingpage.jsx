import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BiArrowBack } from 'react-icons/bi';


const predefinedInterests = [
  'Web Dev',
  'AI',
  'Crypto',
  'UI/UX',
  'Game Dev',
  'Mobile Apps',
  'Cloud',
  'Data Science',
  'IT',
  'Project Management',
  'Writing'
];

const predefinedAims = [
  'Learning',
  'Collaborating',
  'Building Projects',
  'Networking',
  'Goal and habit tracking',
  'Achieve x focus sessions daily',
  'Mental wellness and balance',
  'Accountabilty',
  'Improve screen time boundaries'
];

const generateUsername = (fullName = 'user') => {
  const base = fullName.trim().toLowerCase().replace(/\s+/g, '_');
  const rand = Math.floor(Math.random() * 10000);
  return `${base}_${rand}`;
};


const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState(generateUsername());
  const [aims, setAims] = useState([]);
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchNameAndSuggest = async () => {
    const { data } = await supabase.auth.getUser();
    const fullName = data?.user?.user_metadata?.full_name || 'user';
    setUsername(generateUsername(fullName));
  };
  fetchNameAndSuggest();
}, []);



  const toggleItem = (item, list, setList) => {
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const goBack = () => setStep(prev => Math.max(1, prev - 1));

  useEffect(() => {
    const check = async () => {
      if (username.trim()) {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .single();
        setIsUsernameAvailable(!data);
      } else {
        setIsUsernameAvailable(null);
      }
    };
    check();
  }, [username]);

  const handleSubmit = async () => {
    if (!username || aims.length === 0 || interests.length === 0) {
      setError('Please complete all fields.');
      return;
    }

    setLoading(true);
    setError('');

    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;

    if (!userId) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        username,
        aims: aims.join(', '),
        interests: interests.join(', '),
      });

    if (dbError) {
      setError(dbError.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 transition-all duration-300">
            <h2 className="text-xl font-bold text-white">Step 1 of 3: Choose a Username</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Unique username"
              className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p
              className="text-blue-400 text-sm underline cursor-pointer"
              onClick={() => setUsername(generateUsername())}
            >
              Suggest a username
            </p>
            {isUsernameAvailable === false && <p className="text-red-400 text-sm">Username is taken</p>}
            {isUsernameAvailable && <p className="text-green-400 text-sm">Username is available</p>}
            <button
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark"
              onClick={() => setStep(2)}
              disabled={!username.trim() || isUsernameAvailable === false}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 transition-all duration-300">
            <h2 className="text-xl font-bold text-white">Step 2 of 3: Select Your Aims</h2>
            <div className="flex flex-wrap gap-2">
              {predefinedAims.map((aim) => (
                <div
                  key={aim}
                  onClick={() => toggleItem(aim, aims, setAims)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition ${
                    aims.includes(aim)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  {aim}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={goBack} className="text-white flex items-center gap-1"><BiArrowBack /> Back</button>
              <button
                className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark"
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 transition-all duration-300">
            <h2 className="text-xl font-bold text-white">Step 3 of 3: Select Your Interests</h2>
            <div className="flex flex-wrap gap-2">
              {predefinedInterests.map((interest) => (
                <div
                  key={interest}
                  onClick={() => toggleItem(interest, interests, setInterests)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition ${
                    interests.includes(interest)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  {interest}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={goBack} className="text-white flex items-center gap-1"><BiArrowBack /> Back</button>
              <button
                className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Finish'}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;


