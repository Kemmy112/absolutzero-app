import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Timer, BarChart2, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Timer, label: "Focus Timer", path: "/dashboard/timer" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] dark:text-[#a0e9ff] transition-colors">

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-[#0f2027]/70 backdrop-blur-md border-r border-sky-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-8 text-sky-700 dark:text-[#a0e9ff]">AbsolutZero</h2>
        <nav className="space-y-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-700 transition"
            >
              <Icon className="w-5 h-5 text-sky-500" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-600 transition">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-[#0f2027]/80 backdrop-blur-md border-b border-sky-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-sky-700 dark:text-[#a0e9ff]">AbsolutZero</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0f2027] shadow-lg z-40 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-sky-700 dark:text-[#a0e9ff]">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <nav className="space-y-4">
              {menuItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-700 transition"
                >
                  <Icon className="w-5 h-5 text-sky-500" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64 mt-14 md:mt-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;
