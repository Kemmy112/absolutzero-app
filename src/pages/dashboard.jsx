import { useState, useEffect } from 'react';
import { Menu, X, Bell, UserCircle2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      if (data?.username) setUsername(data.username);
    };

    fetchUserProfile();
  }, []);

  const navItems = ['Home', 'Recents', 'Weekly Logs', 'Settings', 'Log out'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white flex flex-col">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-white/5 border-b border-white/10">
        <button onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-4">
          <Bell size={20} />
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <UserCircle2 />
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {drawerOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white/10 backdrop-blur-lg p-6 z-50">
          <h2 className="text-xl font-bold mb-6">Navigation</h2>
          <nav className="flex flex-col gap-3">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setDrawerOpen(false)}
                className="text-left text-white hover:text-accent"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="p-6 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {username || 'friend'} 👋</h1>
        <p className="text-white/70 mb-6 italic">Let’s log something awesome — it’s a write time to shine!</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white/10 rounded-xl shadow text-white">
            <h3 className="font-semibold text-lg">Logs This Week</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="p-4 bg-white/10 rounded-xl shadow text-white">
            <h3 className="font-semibold text-lg">Focus Hours</h3>
            <p className="text-3xl font-bold mt-2">12h</p>
          </div>
          <div className="p-4 bg-white/10 rounded-xl shadow text-white">
            <h3 className="font-semibold text-lg">Streak</h3>
            <p className="text-3xl font-bold mt-2">🔥 5 days</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white/10 p-6 rounded-xl mb-8 shadow">
          <h3 className="text-lg font-semibold mb-2">Weekly Activity</h3>
          <div className="h-40 flex items-center justify-center text-white/40 italic">[Will be updated soon...]</div>
        </div>

        {/* Achievements */}
        <div className="bg-white/10 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-4">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white font-bold shadow">🏆</div>
            <div className="w-24 h-24 bg-accent/70 rounded-full flex items-center justify-center text-white font-bold shadow">🎯</div>
            <div className="w-24 h-24 bg-accent/50 rounded-full flex items-center justify-center text-white font-bold shadow">🧠</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
