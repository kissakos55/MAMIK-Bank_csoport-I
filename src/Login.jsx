import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import sha256 from "js-sha256";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from 'three';
import Modal from "./Modal"; // Importáljuk a modált, ha nincs még
import { useNavigate } from "react-router-dom"; // Importáljuk a navigációt

export const Login = ({ login }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // A modális ablak állapota
  const vantaRef = useRef(null);
  const navigate = useNavigate(); // Navigációhoz

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
        THREE,
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
        login(); // Beállítjuk, hogy a felhasználó be van jelentkezve
        alert(`Sikeres bejelentkezés! Felhasználó: ${userData.name}`);
        navigate("/SzemelyesAdatim"); // Átirányítjuk a személyes adatok oldalra
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

  const openBankWindow = () => {
    setIsModalOpen(true); // Modális ablak megnyitása
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

      {/* Modális ablak */}
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
      )}
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
