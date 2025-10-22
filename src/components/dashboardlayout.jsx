import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Timer, BarChart2, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Timer, label: "Focus Timer", path: "/dashboard/timer" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogoutAndClose = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] dark:text-[#a0e9ff] transition-colors">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-[#0f2027]/70 backdrop-blur-md border-r border-sky-100 dark:border-gray-700 p-6 flex-shrink-0">
        <h2 className="text-xl font-bold mb-8 text-sky-700 dark:text-[#a0e9ff]">AbsolutZero</h2>
        <nav className="space-y-4 flex-1">
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

        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition text-red-400 font-medium"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 py-4 bg-white/90 dark:bg-[#0f2027]/90 backdrop-blur-md border-b border-sky-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-sky-700 dark:text-[#a0e9ff]">AbsolutZero</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pt-20 md:pt-6 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black dark:bg-black/80 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0f2027] shadow-xl z-50 p-6 flex flex-col"
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
                onClick={handleLogoutAndClose}
                className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
