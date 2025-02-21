import React, { useState, useEffect } from "react";

const Modal = ({ show, onClose, user }) => {
  const [balance, setBalance] = useState(50000); // Kezdeti egyenleg
  const [savings, setSavings] = useState(0); // Kezdeti megtakarítás
  const [savingsAmount, setSavingsAmount] = useState(""); // Az új megtakarítás összege
  const [accountNumber, setAccountNumber] = useState(null); // Számlaszám állapota

  // Generáljuk a számlaszámot egyszer, amikor a komponens először renderelődik
  useEffect(() => {
    const generatedAccountNumber = Math.floor(Math.random() * 1000000000) + 1000000000;
    setAccountNumber(generatedAccountNumber);
  }, []); // Csak egyszer fut le a komponens első renderelésekor

  if (!show) return null; // Ha nincs megnyitva, akkor nem rendereljük a modális ablakot.

  const handleAddSavings = () => {
    const savingsAmountInt = parseInt(savingsAmount);

    if (savingsAmountInt && savingsAmountInt > 0) {
      if (savingsAmountInt <= balance) {
        // Levonjuk a megtakarítandó összeget az egyenlegből
        setBalance(balance - savingsAmountInt);
        // Hozzáadjuk a megtakarításhoz
        setSavings(savings + savingsAmountInt);
        setSavingsAmount(""); // Input törlés

        alert(`Sikeres hozzáadás! ${savingsAmountInt} Ft hozzáadva a megtakarításhoz.`);
      } else {
        alert("Nincs elegendő pénz a számlán a megtakarításhoz!");
      }
    } else {
      alert("Kérjük, adjon meg egy érvényes összeget!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Átlátszó háttér
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000", // Magas z-index
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1>Banki Személyes Ügyek</h1>
        <div>
          <p><strong>Név:</strong> {user ? user.name : "Ismeretlen"}</p>
          <p><strong>Számlaszám:</strong> {accountNumber}</p>
          <p><strong>Számla egyenleg:</strong> {balance} Ft</p>
          <p><strong>Megtakarítás:</strong> {savings} Ft</p>
        </div>

        <div>
          <h2>Megtakarítás hozzáadása</h2>
          <input
            type="number"
            value={savingsAmount}
            onChange={(e) => setSavingsAmount(e.target.value)}
            placeholder="Írja be a megtakarítandó összeget"
          />
          <button onClick={handleAddSavings}>Hozzáadás a megtakarításhoz</button>
        </div>

        <button onClick={onClose} style={{ marginTop: "20px" }}>Bezárás</button>
      </div>
    </div>
  );
};

export default Modal;
