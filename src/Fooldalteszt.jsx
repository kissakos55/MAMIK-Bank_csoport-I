import React, { useState } from 'react';
import './Fooldalteszt.css';

export const Fooldalteszt = () => {
  const [name, setName] = useState(''); // Felhasználó neve
  const [savings, setSavings] = useState(0); // Megtakarítások nyomon követése

  // Generálás függvényei
  const generateAccountNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000) + 1000000000; // 10 számjegyű számlaszám
    return randomNumber.toString();
  };

  // Új ablak nyitása és adat megjelenítése
  const openBankWindow = () => {
    const accountNumber = generateAccountNumber();

    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Személyes ügyek</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #003366;
                padding: 20px;
                text-align: center;
              }
              h1 {
                color: #003366;
              }
              .account-info {
                margin-top: 20px;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 5px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              }
              .account-info p {
                font-size: 18px;
              }
              .savings-form {
                margin-top: 20px;
              }
              .savings-form input {
                padding: 10px;
                font-size: 16px;
                width: 100%;
                max-width: 300px;
                border-radius: 5px;
                border: 1px solid #ccc;
              }
              .savings-form button {
                padding: 10px 20px;
                margin-top: 10px;
                font-size: 16px;
                background-color: #003366;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              }
              .savings-form p {
                font-size: 16px;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <h1>Banki Személyes Ügyek</h1>
            <div class="account-info">
              <p><strong>Név:</strong> ${name}</p>
              <p><strong>Számlaszám:</strong> ${accountNumber}</p>
              <p><strong>Számla egyenleg:</strong> <span id="balance">50000</span> Ft</p>
            </div>

            <div class="savings-form">
              <h2>Megtakarítás hozzáadása</h2>
              <input 
                type="number" 
                id="savingsAmount" 
                placeholder="Írja be a megtakarítandó összeget" 
                style={{ padding: '10px', fontSize: '16px', maxWidth: '300px', width: '100%', borderRadius: '5px' }}
              />
              <button id="addSavingsButton" style={{ marginTop: '10px' }}>
                Hozzáadás a megtakarításhoz
              </button>
              <p id="savingsInfo" style={{ marginTop: '20px', fontSize: '18px' }}>Megtakarítás: 0 Ft</p>
            </div>

            <script>
              // Az új ablakban lévő gomb működtetése
              document.getElementById("addSavingsButton").onclick = function() {
                const savingsAmount = document.getElementById("savingsAmount").value;
                if (savingsAmount && !isNaN(savingsAmount) && parseInt(savingsAmount) > 0) {
                  const savingsAmountInt = parseInt(savingsAmount);
                  const currentBalance = parseInt(document.getElementById("balance").innerText);
                  
                  if (savingsAmountInt <= currentBalance) {
                    // Levonjuk a számla egyenlegéből
                    document.getElementById("balance").innerText = currentBalance - savingsAmountInt;
                    // Hozzáadjuk a megtakarításhoz
                    const currentSavings = parseInt(document.getElementById("savingsInfo").innerText.replace('Megtakarítás: ', '').replace(' Ft', ''));
                    document.getElementById("savingsInfo").innerText = 'Megtakarítás: ' + (currentSavings + savingsAmountInt) + ' Ft';
                  } else {
                    alert("Nincs elegendő pénz a számlán a megtakarításhoz!");
                  }
                }
              };
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Üdvözöljük a Főoldalon!</h1>
      <p>
        Ez egy bemutató oldal, amely a weboldal alapfunkcióit tartalmazza.
        Az oldal segít navigálni a különböző szekciók között.
      </p>
      <p>
        Kérjük, válasszon egy opciót a navigációs menüből a fenti információk eléréséhez.
      </p>

      {/* Űrlap, ahol a felhasználó megadhatja a nevét */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Név:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Írja be a nevét" 
            style={inputStyle}
          />
        </div>
      </form>

      {/* Gomb, amely megnyitja az új ablakot a számla információkkal */}
      <button style={buttonStyle} onClick={openBankWindow}>
        Személyes ügyek intézése
      </button>

      {/* Nincs többé számla egyenleg megjelenítése */}
    </div>
  );
};

export default Fooldalteszt;

// Stílusok
const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  color: '#003366',
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '20px',
  fontSize: '16px',
  backgroundColor: '#003366',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  fontSize: '16px',
  marginBottom: '5px',
  display: 'block',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '100%',
  maxWidth: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};
