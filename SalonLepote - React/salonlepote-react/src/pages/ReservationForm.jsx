import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/ReservationForm.css";

const ReservationForm = () => {
  const [services, setServices] = useState([]);
  const [makeupArtists, setMakeupArtists] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
  
    setServices([
      { id: 1, name: "Dnevna šminka" },
      { id: 2, name: "Svečana šminka" },
      { id: 3, name: "Venčana šminka" },
      { id: 4, name: "Profesionalno konturisanje" }
    ]);

    
    axios
      .get("/makeup-artists")
      .then((res) => setMakeupArtists(res.data.data || []))
      .catch((err) => {
        console.error("Greška pri učitavanju šminkera:", err);
        setMakeupArtists([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !selectedArtist || !date || !time) {
      alert("Molimo popunite sva polja");
      return;
    }
    alert(`Rezervacija uspešna!\nUsluga: ${selectedService}\nŠminker: ${selectedArtist}\nDatum: ${date}\nVreme: ${time}`);
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2 color="#009b43ff">Rezervacija</h2>


      <label>Usluga:</label>
      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Izaberi uslugu</option>
        {services.map((service) => (
          <option key={service.id} value={service.name}>
            {service.name}
          </option>
        ))}
      </select>

      <label>Šminker:</label>
      <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
        <option value="">Izaberi šminkera</option>
        {makeupArtists.map((artist) => (
          <option key={artist.id} value={artist.name}>
            {artist.name}
          </option>
        ))}
      </select>

      <label>Datum:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Vreme:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button type="submit">Rezerviši</button>
    </form>
  );
};

export default ReservationForm;
