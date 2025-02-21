import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";
import "./Panaszkezeles.css";

export const Panaszkezeles = () => {
  const [panasz, setPanasz] = useState("");
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = WAVES({
        el: vantaRef.current,
        THREE, // FONTOS: ez biztosítja a THREE.js elérését
        color: 0x0b5fae,
        waveHeight: 20,
        waveSpeed: 0.5,
        zoom: 1.2,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const sendPanasz = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: nev,
      from_email: email,
      message: panasz,
    };

    emailjs
      .send("service_id", "template_id", templateParams, "user_id")
      .then(
        () => {
          setSuccessMessage("A panasz sikeresen elküldve!");
          setErrorMessage("");
        },
        () => {
          setErrorMessage("Hiba történt a panasz elküldésekor. Kérlek próbáld meg később.");
          setSuccessMessage("");
        }
      );
  };

  return (
    <div ref={vantaRef} style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      <div className="panasz-container">
        <h1>Panaszkezelés</h1>
        <form onSubmit={sendPanasz} className="panasz-form">
          <div className="form-group">
            <label htmlFor="nev">Neved:</label>
            <input
              type="text"
              id="nev"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email címed:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="panasz">Panasz leírása:</label>
            <textarea
              id="panasz"
              value={panasz}
              onChange={(e) => setPanasz(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            Panasz küldése
          </button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Panaszkezeles;
