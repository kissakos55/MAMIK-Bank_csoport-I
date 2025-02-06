import React from 'react';
import { NavLink } from 'react-router-dom';
import './Fooldal.css';

export const Fooldal = () => {
  return (
    <div className="welcome-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Üdvözöljük a MAMIK Bank weboldalán!</h1>
          <p>
            A legmodernebb banki szolgáltatásokkal és egyszerű megoldásokkal segítjük a pénzügyi biztonságot.
          </p>
        </div>
      </div>
      
      <section className="why-choose-us">
        <h2>Miért válassza a MAMIK Bankot?</h2>
        <div className="features">
          <div className="feature-item">
            <h3>Biztonságos tranzakciók</h3>
            <p>
              Minden egyes tranzakciót a legújabb titkosítási technológiával védjük.
            </p>
          </div>
          <div className="feature-item">
            <h3>Kényelmes online bankolás</h3>
            <p>
              Az online felületünk intuitív és könnyen használható, hogy bárhonnan elérhesse pénzügyeit.
            </p>
          </div>
          <div className="feature-item">
            <h3>Számítható ügyfélszolgálat</h3>
            <p>
              Szakértő csapatunk mindig rendelkezésére áll, hogy segítséget nyújtson bármilyen kérdésben.
            </p>
          </div>
        </div>
      </section>
      
      <section className="call-to-action">
        <h2>Kezdje el még ma!</h2>
        <p>Nyisson számlát és élvezze a pénzügyi szolgáltatásaink előnyeit.</p>
        
        <NavLink to="/Registration">
          <button className="cta-button">Regisztráljon most!</button>
        </NavLink>

        <p>Vagy jelentkezzen be!</p>
        <NavLink to="/Login">
          <button className="cta-button">Bejelentkezés</button>
        </NavLink>
      </section>

      
      <footer className="footer">
        <p>3529 Miskolc, Palóczy László utca 3.</p>
        <p>© Copyright 2025. MAMIK Bank</p>
        <p>Powered by Kerenyir</p>
      </footer>
    </div>
  );
};
