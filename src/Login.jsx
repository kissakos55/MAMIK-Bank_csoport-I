import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import sha256 from "js-sha256";
import * as THREE from "three";
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

    // Vanta.js animáció inicializálása
    if (vantaRef.current) {
      WAVES({
        el: vantaRef.current,
        color: 0x0b5fae, // Kék szín
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
        console.log(localStorage.getItem("felhasz"));
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
        const logoutUrl = `http://localhost:5000/api/Logout/${user.token}`;
        const response = await axios.post(logoutUrl);
        console.log(response.data);
      } catch (error) {
        console.error("Hiba történt a kijelentkezés során:", error);
      }
    }

    localStorage.removeItem("felhasz");
    setUser(null);
    setAvatar("");
    alert("Sikeres kijelentkezés!");
    window.location.reload(); // Oldal újratöltése, hogy a login form jelenjen meg
  };

  return (
    <div ref={vantaRef} style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "35%", // Feljebb helyezve
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Fehér háttér színe
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "center",
          color: "#003366", // Sötétkék szín
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {user ? (
          <>
            <h2>Belépve: {user.name}</h2>
            {avatar && (
              <img
                src={avatar}
                width="50%"
                height="50%"
                alt="Avatar"
                style={{
                  marginTop: "20px",
                  borderRadius: "50%",
                  border: "3px solid #003366",
                }}
              />
            )}
            <button
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                padding: "12px 25px",
                borderRadius: "8px",
                backgroundColor: "#003366",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
            >
              Kijelentkezés
            </button>
          </>
        ) : (
          <>
            <h2>Bejelentkezés</h2>
            <input
              type="text"
              placeholder="Felhasználónév"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleLogin}
              style={loginButtonStyle}
            >
              Bejelentkezés
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  margin: "10px 0",
  padding: "12px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "300px",
  border: "2px solid #003366",
  fontSize: "16px",
};

const loginButtonStyle = {
  marginTop: "15px",
  padding: "12px 30px",
  borderRadius: "8px",
  backgroundColor: "#003366", // Banki kék
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  maxWidth: "300px",
  transition: "background-color 0.3s ease",
};

