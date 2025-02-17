import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Login } from './Login';
import { Registration } from './Registration';
import { Rolunk } from './Rolunk';
import { Fooldal } from './Fooldal';
import { Fooldalteszt } from './Fooldalteszt';


export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span className="nav-link">Főoldal</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={'/login'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span className="nav-link">Be/Kijelentkezés</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={'/Registration'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span className="nav-link">Regisztráció</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={'/Panaszkezeles'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span className="nav-link">Panaszkezelés</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Fooldal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Panaszkezeles" element={<Rolunk />} />
        
        <Route path="*" element={<Login />} />
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
