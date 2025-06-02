import React from 'react';
import '../styles/home.css';
import Navbar from '../components/navbar';
import {motion} from 'framer-motion';
// import { Link } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/timer'); // Adjust the route if needed
  };

  return (
    <div className="homecontainer">
         <section className="header">
        <Navbar/>
        </section>

       <section className="hero-section">
  <motion.div
    className="hero-content"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h1 className="hero-topic">Zero Distraction. Absolut Productivity.</h1>
    <p className="hero-text">
      A productivity timer with chill vibes to help you work in focused bursts and cool down in breaks.
    </p>
  </motion.div>
  <button className="cta-button" onClick={handleClick}>
      Launch Timer
    </button>
  
</section>
    </div>
   
  );
};
    

export default Homepage;