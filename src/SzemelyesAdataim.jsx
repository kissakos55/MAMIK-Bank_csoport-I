import React, { useState } from 'react';
import { FaLock, FaUnlockAlt } from 'react-icons/fa'; // Lakat ikonok importálása
import { Modal, Button } from 'react-bootstrap'; // Bootstrap modális ablak importálása

export const SzemelyesAdataim = () => {
  const [data, setData] = useState({
    nev: 'Kiss Péter',
    email: 'kiss.peter@example.com',
    telefonszam: '+36 20 123 4567',
    cim: '1055 Budapest, Kossuth Lajos utca 1.',
  });

  const [isEditable, setIsEditable] = useState({
    nev: false,
    email: false,
    telefonszam: false,
    cim: false,
  });

  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const correctPassword = 'a'; // Ezt később egy biztonságos forrásból kell lekérni

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleEditClick = (field) => {
    if (isEditable[field]) {
      setIsEditable({
        ...isEditable,
        [field]: false,
      });
    } else {
      setCurrentField(field);
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsEditable({
        ...isEditable,
        [currentField]: true,
      });
      setShowPasswordModal(false);
      setPassword('');
    } else {
      alert('Hibás jelszó!');
      setPassword('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Személyes Adatok</h2>
      <form>
        {Object.keys(data).map((field) => (
          <div className="mb-3" key={field}>
            <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id={field}
                name={field}
                value={data[field]}
                onChange={handleChange}
                disabled={!isEditable[field]}
              />
              <button
                type="button"
                className="btn btn-link ms-2"
                onClick={() => handleEditClick(field)}
              >
                {isEditable[field] ? <FaUnlockAlt /> : <FaLock />}
              </button>
            </div>
          </div>
        ))}
      </form>

      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Jelszó szükséges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Adja meg a jelszót a módosításhoz:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Mégse
          </Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Megerősítés
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
