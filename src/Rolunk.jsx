import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Rolunk.css'; // Itt is be kell importálni a CSS-t

export const Rolunk = () => {
  const [panasz, setPanasz] = useState('');
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendPanasz = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: nev,
      from_email: email,
      message: panasz,
    };

    emailjs
      .send('service_id', 'template_id', templateParams, 'user_id')
      .then(
        (result) => {
          setSuccessMessage('A panasz sikeresen elküldve!');
          setErrorMessage('');
        },
        (error) => {
          setErrorMessage('Hiba történt a panasz elküldésekor. Kérlek próbáld meg később.');
          setSuccessMessage('');
        }
      );
  };

  return (
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
        <button type="submit" className="submit-btn">Panasz küldése</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Rolunk;
