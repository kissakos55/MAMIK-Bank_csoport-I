
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Login } from './Login';
import { Registration } from './Registration';

export const App =() => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Be/Kijelentkezés</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/Registration'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Regisztráció</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path = "/" element={ <Login /> } />
        <Route path = "/Registration" element={ <Registration /> } />
        <Route path = "*" element={ <Login /> } />
        <Route />
      </Routes>
    </Router>
  );
}
