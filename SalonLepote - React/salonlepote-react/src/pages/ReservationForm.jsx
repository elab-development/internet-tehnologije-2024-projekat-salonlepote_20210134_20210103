import { useState } from "react";
import axios from "../api/axios";

function ReservationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [makeupArtistId, setMakeupArtistId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/reservations", {
        date,
        time,
        service_id: serviceId,
        makeup_artist_id: makeupArtistId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Rezervacija uspešna");
    } catch (err) {
      alert("Greška pri rezervaciji");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ovde dodaj select za service i makeup artist iz baze */}
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Rezerviši</button>
    </form>
  );
}

export default ReservationForm;
