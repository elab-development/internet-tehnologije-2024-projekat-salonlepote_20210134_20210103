import { useEffect, useState } from "react";
import axios from "../api/axios";
import stilTabele from "../styles/Table.css";
import Button from "../components/Button";

export default function Rezervacije() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/reservations");
      setReservations(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Greška pri učitavanju rezervacija");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete rezervaciju?")) {
      try {
        await axios.delete(`/reservations/${id}`);
        setReservations((prev) => prev.filter((r) => r.id !== id));
        alert("Rezervacija obrisana.");
      } catch (err) {
        alert("Greška pri brisanju rezervacije.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rezervacije</h1>
      <table border="1" cellPadding="8" style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Klijent</th>
            <th>Šminker</th>
            <th>Usluga</th>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user?.name || "N/A"}</td>
                <td>{r.makeup_artist?.name || "N/A"}</td>
                <td>{r.service?.name || "N/A"}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.status}</td>
                <td>
                <Button onClick={() => handleDelete(r.id)}>Obriši</Button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
