import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/index.css';
import './styles/app.css';
import 'boxicons/css/boxicons.css';
import ProtectedRoute from './components/protectedroutes';
import Navbar from './components/navbar';
import Themetoggle from './components/themetoggle';
import Homepage from './pages/home';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Verifyotp from './auth/verifyotp';
import Forgotpassword from './pages/forgotpassword';
import Resetpassword from './pages/resetpassword';
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
      <Route path='/verifyotp' element={<Verifyotp/>} />
      <Route path='/onboarding' element={<Onboarding/>} />
      <Route path='/forgotpassword' element={<Forgotpassword/>} />
      <Route path='/resetpassword' element={<Resetpassword/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path='/about' element={<About/>} />
      <Route path='/footer' element={<Footer/>} />
    </Routes>
   </Router>
  );
}

export default App;
