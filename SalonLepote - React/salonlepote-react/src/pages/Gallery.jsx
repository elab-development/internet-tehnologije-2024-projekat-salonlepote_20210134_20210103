// src/pages/Galerija.jsx
import React, { useState } from 'react';
import img1 from '../assets/galerija1jpg.jpg';
import img2 from '../assets/galerija2.jpg';
import img3 from '../assets/galerija3.jpg';
import img4 from '../assets/galerija4.jpg';
import "../styles/Galerija.css";


const Galerija = () => {
  const slike = [img1, img2, img3, img4];
  const [trenutna, setTrenutna] = useState(0);

  const sledecaSlika = () => {
    setTrenutna((trenutna + 1) % slike.length);
  };

  const prethodnaSlika = () => {
    setTrenutna((trenutna - 1 + slike.length) % slike.length);
  };

  return (
    <><h2>Galerija fotografija</h2><div className="galerija-container">
      <button onClick={prethodnaSlika} className="galerija-btn">❮</button>
      <img src={slike[trenutna]} alt="Galerija" className="galerija-slika" />
      <button onClick={sledecaSlika} className="galerija-btn">❯</button>
    </div></>
  );
};

export default Galerija;
