import React, { useState, useEffect } from 'react';
import { FaLock, FaUnlockAlt } from 'react-icons/fa'; // Lakat ikonok importálása
import { Modal, Button } from 'react-bootstrap'; // Bootstrap modális ablak importálása
import axios from "axios";

export const SzemelyesAdataim = () => {
  const [data, setData] = useState({
    nev: 'Kiss Péter',
    email: 'kiss.peter@example.com',
    telefonszam: '+36 20 123 4567',
    cim: '1055 Budapest, Kossuth Lajos utca 1.',
    id: '12345', // Feltételezzük, hogy van ilyen mező
    ugyfelAzonosito: '67890', // Feltételezzük, hogy van ilyen mező
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Új állapot a betöltés kezelésére
  const correctPassword = 'a'; // Ezt később egy biztonságos forrásból kell lekérni

  useEffect(() => {
    // Betöltjük a felhasználót a localStorage-ból
    const storedUser = JSON.parse(localStorage.getItem("felhasz"));
    if (storedUser) {
      setUser(storedUser); // Felhasználó beállítása
    } else {
      setLoading(false); // Ha nincs felhasználó, azonnal befejezzük
    }
  }, []);

  useEffect(() => {
    // Csak akkor próbálunk adatot lekérni, ha a user már elérhető
    if (user && user.token && user.ugyfelAzonosito) {
      const fetchData = async () => {
        try {
          let url = `http://localhost:5000/api/Ugyfelek/${user.token},${user.ugyfelAzonosito}`;
          console.log(url);
          const response = await axios.get(url);
          if (response.status === 200) {
            setData(response.data);
            alert(`Sikeres adatbeolvasás`);
          } else {
            alert("Hiba történt az adat beolvasásnál");
          }
        } catch (error) {
          alert("Hiba történt: " + error.message);
        } finally {
          setLoading(false); // Ha a lekérés befejeződött, beállítjuk a loading-ot false-ra
        }
      };

      fetchData();
    }
  }, [user]); // Az effect újra lefut, ha a user változik

  // Az id és ugyfelAzonosito eltávolítása a data objektumból
  const filteredData = { ...data };
  delete filteredData.id;
  delete filteredData.ugyfelAzonosito;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data); // Módosított adatokat itt találod
  };

  const handleSaveData = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/Ugyfelek/${user.token}`, data);
      if (response.status === 200) {
        alert("Sikeres adatmentés");
      } else {
        alert("Hiba történt az adat mentésénél");
      }
    } catch (error) {
      alert("Hiba történt: " + error.message);
    }
  };


  const handleEditClick = (field) => {

    if (isEditable[field]) {
      console.log(field);
      console.log("szabikának elmentek otthonról ekkor kell meghívni a put metódusát az ugyfelek tablába");
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
    console.log(data);
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
      <Button variant="primary" onClick={handleSaveData}>
        Módosítás mentése
      </Button>
      {loading ? (
        <p>Adatok betöltése...</p> // Tükrözzük a betöltési állapotot
      ) : (
        <form>
          {Object.keys(filteredData).map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  name={field}
                  value={filteredData[field]}
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
      )}

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
