import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import stilTabele from "../styles/Table.css";
import Button from "../components/Button";

export default function Rezervacije() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  const handleEditClick = (reservation) => {
    setEditingId(reservation.id);
    setEditFormData({
      date: reservation.date || "",
      time: reservation.time || "",
      status: reservation.status || "",
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/reservations/${id}`, editFormData);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...editFormData } : r))
      );
      setEditingId(null);
      setEditFormData({});
      alert("Rezervacija je uspešno izmenjena.");
    } catch (err) {
      console.error(err);
      alert("Greška pri izmeni rezervacije.");
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

              {/* Renderuj input ili tekst u zavisnosti da li je u režimu izmene */}
              <td>
                {editingId === r.id ? (<input type="date" name="date" value={editFormData.date} onChange={handleInputChange}/>) : (r.date)}
              </td>
              <td>
                {editingId === r.id ? (<input type="time" name="time" value={editFormData.time} onChange={handleInputChange} />) : (r.time)}
              </td>
              <td>
                {editingId === r.id ? (<select name="status" value={editFormData.status} onChange={handleInputChange} >
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="pending">pending</option>
                  </select>) : (r.status)}
              </td>
              <td>
                {editingId === r.id ? (
                  <>
                    <Button onClick={() => handleSave(r.id)} style={{ marginRight: "12px" }}>Sačuvaj</Button>
                    <Button onClick={handleCancelClick}>Otkaži</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(r)} style={{ marginRight: "12px" }}> Izmeni</Button>
                    <Button onClick={() => handleDelete(r.id)}>Obriši</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}