import React, { useState } from 'react';
import './Rolunk.css';
import { motion } from 'framer-motion';
import mdominik from './mdominik.jpg'; 
import mgabor from './mgabor.jpg'; 
import kakos from './kakos.jpg'; 
export const Rolunk = () => {
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
        <p>A MAMIK Bank egy dinamikusan fejlődő pénzintézet, amely elkötelezett amellett, hogy innovatív pénzügyi megoldásokkal szolgálja ki ügyfeleit. Célunk, hogy segíthessük vállalkozásokat és magánszemélyeket a pénzügyi döntéseikben, miközben biztosítjuk számukra a legmagasabb szintű ügyfélszolgálatot és megbízhatóságot. Bankunk modern technológiai háttérrel és szakértő csapattal dolgozik azon, hogy minden pénzügyi tranzakció zökkenőmentes és biztonságos legyen.

A MAMIK Bank története több évtizedes múltra tekint vissza, és folyamatosan bővíti szolgáltatásait annak érdekében, hogy megfeleljen a piaci igényeknek és a legújabb trendeknek. Az ügyfelek számára testreszabott megoldásokat kínálunk, legyen szó személyi kölcsönökről, vállalati hitelekről vagy befektetési lehetőségekről. A digitális banki szolgáltatásaink révén ügyfeleink bárhonnan, bármikor elérhetik számláikat és kezelhetik pénzügyeiket.

Számunkra az ügyfelek bizalma a legfontosabb érték, ezért minden tevékenységünket a legnagyobb átláthatósággal és tisztességgel végezzük. Bankunk folyamatosan fejleszti digitális platformjait, hogy még kényelmesebb és gyorsabb pénzügyi élményben részesíthessük ügyfeleinket. A MAMIK Bank filozófiája a hosszú távú, kölcsönösen előnyös kapcsolatokra épít, és célunk, hogy minden egyes ügyfelünket a legjobb pénzügyi megoldásokkal támogassuk.

A fenntarthatóságra és társadalmi felelősségvállalásra is nagy figyelmet fordítunk, és aktívan részt veszünk olyan programokban, amelyek a közösség fejlődését szolgálják. A MAMIK Bank számára a fejlődés nemcsak a pénzügyi eredményekben, hanem a társadalmi és környezeti hatásokban is megmutatkozik. Továbbra is azon dolgozunk, hogy egyre több ember számára kínálhassunk olyan pénzügyi megoldásokat, amelyek hozzájárulnak a sikeres és biztos jövőhöz.</p>
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

export default Rolunk;
