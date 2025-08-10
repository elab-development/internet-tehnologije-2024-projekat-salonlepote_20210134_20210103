import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/ReservationForm.css";
import {useAuth} from "../hooks/AuthContext";

const ReservationForm = () => {
  const { id } = useParams(); // Ako postoji, znači da menjamo
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [makeupArtists, setMakeupArtists] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); 
  const { user } = useAuth();

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

  // Ako je edit mode — učitavamo postojeće podatke
  useEffect(() => {
    if (id) {
      axios
        .get(`/reservations/${id}`)
        .then((res) => {
          const r = res.data;
          setSelectedService(r.service_id || "");
          setSelectedArtist(r.makeup_artist_id || "");
          setDate(r.date || "");
          setTime(r.time || "");
        })
        .catch((err) => console.error("Greška pri učitavanju rezervacije:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacija unosa
    if (!selectedService || !selectedArtist || !date || !time) {
      alert("Molimo popunite sva polja");
      return;
    }

    const payload = {
      service_id: Number(selectedService),
      makeup_artist_id: Number(selectedArtist),
      date,
      time,
      user_id: user.id,
    };

    try {
      if (id) {
        await axios.put(`/reservations/${id}`, payload);
        alert("Rezervacija uspešno izmenjena!");
        navigate("reservations");
      } else {
        console.log("Payload za slanje:", payload);
        await axios.post(`/reservations`, payload);
        alert("Rezervacija uspešno dodata!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Greška pri čuvanju rezervacije.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2>{id ? "Izmena rezervacije" : "Nova rezervacija"}</h2>


      <label>Usluga:</label>
      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Izaberi uslugu</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <label>Šminker:</label>
      <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
        <option value="">Izaberi šminkera</option>
        {makeupArtists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>

      <label>Datum:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Vreme:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button type="submit">{id ? "Sačuvaj izmene" : "Rezerviši"}</button>
    </form>
  );
};

export default ReservationForm;
