import React, { useState } from 'react';
import './rolunkmi.css';
import { motion } from 'framer-motion';
import mdominik from './mdominik.jpg'; 
import mgabor from './mgabor.jpg'; 
import kakos from './kakos.jpg'; 
export const Rolunkmi = () => {
  const [showText, setShowText] = useState(false);
  const [showFounders, setShowFounders] = useState(false);

  return (
    <div className="rolunk-container">
      <h1>Rólunk</h1>
      <button className="toggle-button" onClick={() => setShowText(!showText)}>
        {showText ? 'Elrejtés' : 'Rólunk'}
      </button>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className="info-box"
        style={{ display: showText ? 'block' : 'none' }}
      >
        <p>A MAMIK Bank a biztonságos és innovatív banki megoldások szolgáltatója. Küldetésünk, hogy ügyfeleink számára gyors, megbízható és modern pénzügyi szolgáltatásokat biztosítsunk.</p>
      </motion.div>
    
      <button className="founders-button" onClick={() => setShowFounders(!showFounders)}>
        {showFounders ? 'Alapítók elrejtése' : 'Alapítóink'}
      </button>
      
      {showFounders && (
        <motion.div
          className="founders-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Alapítóink</h2>
          <div className="founders-images">
         <div>
            <motion.img src={kakos} alt="Alapító 1" whileHover={{ scale: 1.1 }} />
            <p>Kiss Ákos</p>
         </div> 
         <div>
            <motion.img src={mdominik} alt="Alapító 2" whileHover={{ scale: 1.1 }} />
            <p>Minka Dominik</p>
         </div> 
         <div>
            <motion.img src={mgabor} alt="Alapító 3" whileHover={{ scale: 1.1 }} />
            <p>Maklári Gábor</p>
         </div> 
          
          </div>
          
        </motion.div>
      )}
    </div>
  );
};

export default Rolunkmi;