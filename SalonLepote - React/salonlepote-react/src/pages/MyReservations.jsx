import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext"; 
import { getClientReservations, getMakeupArtistReservations } from "../api/api";
import "../styles/Table.css";
import axiosInstance from "../api/axios"; 
import Button from "../components/Button";

export default function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        let res;
        if (user?.role === "client") {
          res = await getClientReservations();
        } else if (user?.role === "makeup_artist") {
          res = await getMakeupArtistReservations();
        } else {
          setError("Ova stranica nije dostupna za ovu ulogu.");
          setLoading(false);
          return;
        }
        setReservations(res.data);
      } catch (err) {
        console.error(err);
        setError("Greška pri učitavanju rezervacija.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

   const confirmReservation = async (id) => {
    const confirmAction = window.confirm(
      "Da li ste sigurni da želite potvrditi ovu rezervaciju? Korisniku će biti poslat mejl."
    );

    if (!confirmAction) return; 

    try {
       await axiosInstance.get(`/confirm-reservation/${id}`, { withCredentials: true });
      alert("Rezervacija potvrđena! Korisniku je poslat mejl o potvrdi.");
      
      setReservations(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: "confirmed" } : r
        )
      );
    } catch (err) {
      alert("Došlo je do greške prilikom potvrde rezervacije.");
    }
  };

  const cancelReservation = async (id) => {
    const confirmAction = window.confirm(
      "Da li ste sigurni da želite otkazati ovu rezervaciju?"
    );

    if (!confirmAction) return;

    try {
      await axiosInstance.post(`/reservations/${id}/cancel`, {}, { withCredentials: true });
      alert("Rezervacija otkazana.");
      
      setReservations(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: "canceled" } : r
        )
      );
    } catch (err) {
      alert("Došlo je do greške prilikom otkazivanja rezervacije.");
    }
  };

  if (loading) return <p>Učitavanje rezervacija...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tabela-container">
      <h2>Moje rezervacije</h2>
      {reservations.length === 0 ? (
        <p>Nemate rezervacija.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usluga</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Status</th>
              {user?.role === "makeup_artist" && <th>Potvrda</th>}
              {user?.role === "client" && <th>Otkazivanje</th>}
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.service?.name}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.status}</td>
                {user?.role === "makeup_artist" && (
                  <td>
                    {r.status !== "confirmed" && (
                      <Button  onClick={() => confirmReservation(r.id)}> Potvrdi rezervaciju</Button>
                    )}
                  </td>
                )}
                 {user?.role === "client" && (
                  <td>
                    {r.status !== "canceled" && r.status !== "confirmed" && (
                      <Button onClick={() => cancelReservation(r.id)}>Otkaži</Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
