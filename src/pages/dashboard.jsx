import React, { useState, useEffect } from "react";

// Scroll Picker component (simple Tailwind version)
const TimePicker = ({ label, max, value, onChange }) => (
  <div className="flex flex-col items-center">
    <span className="text-[#a0e9ff] text-sm mb-2">{label}</span>
    <div className="h-24 overflow-y-scroll scrollbar-hide snap-y snap-mandatory bg-[#1a2e35] rounded-lg p-2">
      {[...Array(max + 1).keys()].map((num) => (
        <div
          key={num}
          onClick={() => onChange(num)}
          className={`snap-center py-2 px-4 cursor-pointer rounded-md text-center ${
            num === value
              ? "bg-[#0f2027] text-[#a0e9ff] font-bold"
              : "text-gray-400"
          }`}
        >
          {num.toString().padStart(2, "0")}
        </div>
      ))}
    </div>
  </div>
);


const Dashboard = () => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setStreak((s) => s + 1);
      setRecentTasks((prev) => [
        {
          name: task,
          duration: `${time.hours}h ${time.minutes}m ${time.seconds}s`,
          completed: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 5));
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTask = () => {
    const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
    setTimeLeft(totalSeconds);
    setIsActive(true);
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0f2027] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-[#a0e9ff] mb-8">Dashboard</h1>

      {/* Streak Counter */}
      <div className="mb-6 p-4 bg-[#1a2e35] rounded-2xl shadow-md text-center">
        <p className="text-lg">🔥 Current Streak: <span className="font-bold text-[#a0e9ff]">{streak}</span></p>
      </div>

      {/* Task Form */}
      {!isActive && timeLeft === null && (
        <div className="bg-[#1a2e35] p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#a0e9ff] mb-4">Create New Task</h2>
          <input
            type="text"
            placeholder="Enter task name..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 rounded-lg mb-6 bg-[#0f2027] text-white placeholder-gray-400 focus:outline-none"
          />


          <div className="grid grid-cols-3 gap-4 mb-6">
            <TimePicker
              label="Hours"
              max={5}
              value={time.hours}
              onChange={(val) => setTime((prev) => ({ ...prev, hours: val }))}
            />
            <TimePicker
              label="Minutes"
              max={59}
              value={time.minutes}
              onChange={(val) => setTime((prev) => ({ ...prev, minutes: val }))}
            />
            <TimePicker
              label="Seconds"
              max={59}
              value={time.seconds}
              onChange={(val) => setTime((prev) => ({ ...prev, seconds: val }))}
            />
          </div>
          

          <button
            onClick={startTask}
            disabled={!task}
            className="w-full py-3 rounded-lg bg-[#a0e9ff] text-[#0f2027] font-bold hover:bg-[#89d8ff] transition disabled:opacity-50"
          >
            Start Task
          </button>
        </div>
      )}

      {/* Timer */}
      {timeLeft !== null && (
        <div className="bg-[#1a2e35] p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">{task}</h2>
          <div className="text-5xl font-bold text-[#a0e9ff] mb-4">
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-6 py-2 rounded-lg bg-[#a0e9ff] text-[#0f2027] font-semibold mr-3"
          >
            {isActive ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => {
              setTask("");
              setTimeLeft(null);
              setIsActive(false);
            }}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold"
          >
            End
          </button>
        </div>
      )}

      {/* Recent Tasks */}
      <div className="mt-8 bg-[#1a2e35] p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-[#a0e9ff] mb-3">Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks completed yet.</p>
        ) : (
          <ul className="space-y-2">
            {recentTasks.map((t, i) => (
              <li
                key={i}
                className="flex justify-between text-sm bg-[#0f2027] p-3 rounded-lg"
              >
                <span className="font-medium text-[#a0e9ff]">{t.name}</span>
                <span className="text-gray-400">{t.duration} • {t.completed}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



