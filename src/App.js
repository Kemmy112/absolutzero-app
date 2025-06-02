import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/home.css';
import 'boxicons/css/boxicons.css';
// import 'boxicons/dist/boxicons.js';
import Navbar from './components/navbar';
import Homepage from './pages/home';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import Signup from './auth/signup';
// import Signin from './auth/signin';
import Timer from './pages/timer';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/navbar' element={<Navbar/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/about' element={<About/>} />
      {/* <Route path='/signin' element={<Signin/>} /> */}
      <Route path='/timer' element={<Timer/>} />
    </Routes>
   </Router>
  );
}

export default App;
