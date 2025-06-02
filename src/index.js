import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'; // App should wrap all other components

const root = createRoot(document.getElementById('root'));
root.render(<App />);
