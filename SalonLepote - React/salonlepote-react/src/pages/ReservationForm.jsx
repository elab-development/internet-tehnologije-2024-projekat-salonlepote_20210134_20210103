import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Form.css";

function ReservationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [makeupArtistId, setMakeupArtistId] = useState("");

  const [services, setServices] = useState([]);
  const [makeupArtists, setMakeupArtists] = useState([]);

  // Učitaj usluge i makeup artista na učitavanje komponente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Pretpostavimo da API endpointi postoje ovako:
        const servicesRes = await axios.get("/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(servicesRes.data);

        const artistsRes = await axios.get("/makeup-artists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMakeupArtists(artistsRes.data);
      } catch (error) {
        alert("Greška pri učitavanju podataka");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !serviceId || !makeupArtistId) {
      alert("Molimo popunite sva polja.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/reservations",
        {
          date,
          time,
          service_id: serviceId,
          makeup_artist_id: makeupArtistId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Rezervacija uspešna");
      // Očisti formu
      setDate("");
      setTime("");
      setServiceId("");
      setMakeupArtistId("");
    } catch (err) {
      alert("Greška pri rezervaciji");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forma za tvoju rezervaciju</h2>
      <label>
        Usluga:
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          <option value="">Izaberite uslugu</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Šminker:
        <select
          value={makeupArtistId}
          onChange={(e) => setMakeupArtistId(e.target.value)}
          required
        >
          <option value="">Izaberite šminkera</option>
          {makeupArtists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Datum:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Vreme:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Rezerviši</button>
    </form>
  );
}

export default ReservationForm;
