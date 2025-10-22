import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="bg-primary-light text-secondary text-sm py-6 mt-10 font-display">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">&copy; 2025 AbsolutZero. All rights reserved.</p>
        <div className="flex gap-4">
          <a onClick={() => navigate('/signin')} className="cursor-pointer hover:underline">Login</a>
          <a onClick={() => navigate('/signup')} className="cursor-pointer hover:underline">Sign Up</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;