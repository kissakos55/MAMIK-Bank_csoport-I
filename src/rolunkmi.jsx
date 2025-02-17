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
        <p>A MAMIK Bank egy dinamikusan fejlődő pénzintézet, amely célja, hogy ügyfelei számára a legmodernebb banki szolgáltatásokat kínálja. Bankunk az innovációra és a bizalomra épít, miközben mindig figyelembe vesszük a változó gazdasági környezetet. Mi hiszünk abban, hogy a bankolásnak egyszerűnek és hozzáférhetőnek kell lennie mindenki számára, ezért a legújabb technológiai megoldásokat alkalmazzuk.

MAMIK Bank ügyfelei számára személyre szabott pénzügyi megoldásokat biztosít, legyen szó megtakarításokról, hitelezésről vagy vállalati pénzügyi szolgáltatásokról. A digitális banki lehetőségek mellett a hagyományos személyes kiszolgálás is fontos szerepet kap, így mindenki megtalálja a számára legkényelmesebb módot a banki ügyintézéshez.

Küldetésünk, hogy segítünk ügyfeleinknek pénzügyi céljaik elérésében, miközben biztosítjuk a legmagasabb szintű biztonságot és átláthatóságot. MAMIK Bank folyamatosan fejleszti szolgáltatásait, hogy megfeleljen a modern pénzügyi világ kihívásainak.

A bankunknál a tisztesség, megbízhatóság és a kiemelkedő ügyfélszolgálat mindig az első helyen áll. Munkatársaink magas szintű szakértelemmel és elkötelezettséggel dolgoznak azon, hogy minden ügyfelünk számára a legjobb megoldásokat kínálják.</p>
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