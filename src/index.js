import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import Navbar from './components/navbar';
import Homepage from './pages/home';
import Dashboard from './pages/dashboard';
import Signup from './auth/signup';
// import Signin from './auth/signin';
import Timer from './pages/timer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <App />,
    <Homepage />,
    <Navbar />,
    <Timer />,
    <Signup />,
    {/* <Signin/> */},
    <Dashboard />
  
);
