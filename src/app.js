import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/index.css';
import './styles/app.css';
import 'boxicons/css/boxicons.css';
import Navbar from './components/navbar';
import Themetoggle from './components/themetoggle';
import Homepage from './pages/home';
import Signup from './auth/signup';
import Signin from './auth/signin';
import ConfirmEmail from './auth/confirmemail';
import Onboarding from './pages/onboarding';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import Footer from './components/footer';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/navbar' element={<Navbar/>} />
      <Route path='/themetoggle' element={<Themetoggle/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/confirmemail' element={<ConfirmEmail/>} />
      <Route path='/onboarding' element={<Onboarding/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/footer' element={<Footer/>} />
    </Routes>
   </Router>
  );
}

export default App;
