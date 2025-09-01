import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/index.css';
import './styles/app.css';
import 'boxicons/css/boxicons.css';
// import 'boxicons/dist/boxicons.js';
import Navbar from './components/navbar';
import Homepage from './pages/home';
import Onboarding from './pages/onboardingpage';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import Footer from './components/footer';
import Timer from './pages/timer';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/navbar' element={<Navbar/>} />
      <Route path='/onboarding' element={<Onboarding/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/timer' element={<Timer/>} />
      <Route path='/footer' element={<Footer/>} />
    </Routes>
   </Router>
  );
}

export default App;
