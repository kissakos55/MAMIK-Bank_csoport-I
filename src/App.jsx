import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Login } from './Login';
import { Registration } from './Registration';
import { Panaszkezeles } from './Panaszkezeles';
import { Fooldal } from './Fooldal';
import { Rolunk } from './Rolunk';
import { SzemelyesAdataim } from './SzemelyesAdataim'; // Importáljuk az új oldalt

// Bootstrap CSS importálása
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  // Itt tároljuk, hogy a felhasználó be van-e jelentkezve
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Bejelentkezési folyamat, ezt az autentikációt itt helyettesíthetjük
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Főoldal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/login'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Bejelentkezés/Kijelentkezés
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/Registration'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Regisztráció
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/Panaszkezeles'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Panaszkezelés
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/Rolunk'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Rólunk
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to={'/SzemelyesAdataim'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  Személyes Adatok
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Fooldal />} />
        <Route path="/login" element={<Login login={login} />} /> {/* Bejelentkezés */}
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Panaszkezeles" element={<Panaszkezeles />} />
        <Route path="/Rolunk" element={<Rolunk />} />
        {isAuthenticated && <Route path="/SzemelyesAdataim" element={<SzemelyesAdataim />} />} {/* Csak akkor jelenjen meg */}
        <Route path="*" element={<Login login={login} />} />
      </Routes>
    </Router>
  );
};

// Navbar stílusok
const navbarStyle = {
  backgroundColor: "#003366", // Banki sötétkék
  color: "#fff", // Fehér szöveg
  padding: "10px 0", // Padding beállítás
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Enyhe árnyék
};
