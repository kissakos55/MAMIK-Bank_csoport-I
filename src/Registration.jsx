import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sha256 from "js-sha256";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

export const Registration = () => {
  const [formData, setFormData] = useState({
    felhasznaloNev: "",
    jelszo: "",
    teljesNev: "",
    email: "",
  });
  const [error, setError] = useState(""); // Hibakezelés tárolása
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Ha módosítunk, töröljük a hibát
  };

  const generateSalt = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let salt = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salt += characters.charAt(randomIndex);
    }
    return salt;
  };

  const handleSubmit = async () => {
    // Validálás: ellenőrizzük, hogy minden mező ki van-e töltve
    if (!formData.felhasznaloNev || !formData.jelszo || !formData.teljesNev || !formData.email) {
      setError("Minden mezőt ki kell tölteni!"); // Ha bármelyik mező üres, hibát adunk vissza
      return;
    }

    const salt = generateSalt(64);
    const hashedPassword = sha256(formData.jelszo + salt);

    const requestBody = {
      id: 0,
      felhasznaloNev: formData.felhasznaloNev,
      teljesNev: formData.teljesNev,
      salt,
      hash: hashedPassword,
      email: formData.email,
      jogosultsag: 1,
      aktiv: 0,
      regisztracioDatuma: new Date().toISOString(),
      fenykepUtvonal: "default.jpg",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/Regisztracio", requestBody);
      alert(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Hiba történt a regisztráció során!");
    }
  };

  return (
    <div ref={vantaRef} style={{ height: "90vh", color: "#fff", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "30px 50px",
          borderRadius: "10px",
          textAlign: "center",
          color: "#fff",
          width: "400px",
        }}
      >
        <h2>Regisztráció</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            <strong>{error}</strong>
          </div>
        )}

        <input
          type="text"
          name="felhasznaloNev"
          placeholder="Felhasználónév"
          value={formData.felhasznaloNev}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
          }}
        />
        <input
          type="password"
          name="jelszo"
          placeholder="Jelszó"
          value={formData.jelszo}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
          }}
        />
        <input
          type="text"
          name="teljesNev"
          placeholder="Teljes név"
          value={formData.teljesNev}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "5px",
            backgroundColor: "#003366",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Regisztráció
        </button>
      </div>
    </div>
  );
};
