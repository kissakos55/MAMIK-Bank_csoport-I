import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import sha256 from "js-sha256";
import WAVES from "vanta/dist/vanta.waves.min";


export const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const vantaRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("felhasz");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAvatar(`http://mamikbank.maklarig.nhely.hu/${parsedUser.profilePicturePath}`);
    }

    if (vantaRef.current) {
      WAVES({
        el: vantaRef.current,
        color: 0x0b5fae,
        waveHeight: 15,
        waveSpeed: 0.5,
      });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const saltResponse = await axios.post(
        `http://localhost:5000/api/Login/GetSalt/${loginName}`
      );
      const salt = saltResponse.data;
      const tmpHash = sha256(password + salt.toString());
      const loginResponse = await axios.post("http://localhost:5000/api/Login", {
        loginName,
        tmpHash,
      });

      if (loginResponse.status === 200) {
        let userData = loginResponse.data;
        localStorage.setItem("felhasz", JSON.stringify(userData));
        setUser(userData);
        setAvatar(`http://mamikbank.maklarig.nhely.hu/${userData.profilePicturePath}`);
        alert(`Sikeres bejelentkezés! Felhasználó: ${userData.name}`);
      } else {
        alert("Hiba történt a bejelentkezéskor!");
      }
    } catch (error) {
      alert("Hiba történt: " + error.message);
    }
  };

  const handleLogout = async () => {
    if (user?.token) {
      try {
        await axios.post(`http://localhost:5000/api/Logout/${user.token}`);
      } catch (error) {
        console.error("Hiba történt a kijelentkezés során:", error);
      }
    }

    localStorage.removeItem("felhasz");
    setUser(null);
    setAvatar("");
    alert("Sikeres kijelentkezés!");
    window.location.reload();
  };

  const generateAccountNumber = () => {
    return Math.floor(Math.random() * 1000000000) + 1000000000;
  };

  const openBankWindow = () => {
    const accountNumber = generateAccountNumber();
    const newWindow = window.open("", "_blank", "width=800,height=600");
    
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
              .account-info, .savings-form {
                margin-top: 20px;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 5px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              }
              button {
                padding: 10px 20px;
                margin-top: 10px;
                font-size: 16px;
                background-color: #003366;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <h1>Banki Személyes Ügyek</h1>
            <div class="account-info">
              <p><strong>Név:</strong> ${user ? user.name : "Ismeretlen"}</p>
              <p><strong>Számlaszám:</strong> ${accountNumber}</p>
              <p><strong>Számla egyenleg:</strong> <span id="balance">50000</span> Ft</p>
            </div>

            <div class="savings-form">
              <h2>Megtakarítás hozzáadása</h2>
              <input type="number" id="savingsAmount" placeholder="Írja be a megtakarítandó összeget"/>
              <button id="addSavingsButton">Hozzáadás a megtakarításhoz</button>
              <p id="savingsInfo">Megtakarítás: 0 Ft</p>
            </div>

            <script>
              document.getElementById("addSavingsButton").onclick = function() {
                const savingsAmount = document.getElementById("savingsAmount").value;
                const currentBalance = parseInt(document.getElementById("balance").innerText);
                const currentSavings = parseInt(document.getElementById("savingsInfo").innerText.replace('Megtakarítás: ', '').replace(' Ft', ''));

                if (savingsAmount && !isNaN(savingsAmount) && parseInt(savingsAmount) > 0) {
                  const savingsAmountInt = parseInt(savingsAmount);
                  
                  if (savingsAmountInt <= currentBalance) {
                    document.getElementById("balance").innerText = currentBalance - savingsAmountInt;
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
    <div ref={vantaRef} style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "center",
          color: "#003366",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {user ? (
          <>
            <h2>Belépve: {user.name}</h2>
            {avatar && <img src={avatar} width="50%" height="50%" alt="Avatar" style={{ marginTop: "20px", borderRadius: "50%", border: "3px solid #003366" }} />}
            <button onClick={handleLogout} style={buttonStyle}>Kijelentkezés</button>
            <button onClick={openBankWindow} style={buttonStyle}>Személyes ügyek intézése</button>
          </>
        ) : (
          <>
            <h2>Bejelentkezés</h2>
            <input type="text" placeholder="Felhasználónév" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
            <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} style={buttonStyle}>Bejelentkezés</button>
          </>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px 30px",
  borderRadius: "8px",
  backgroundColor: "#003366",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  maxWidth: "300px",
};

export default Login;
