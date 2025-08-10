import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext"; 
import { getClientReservations, getMakeupArtistReservations } from "../api/api";
import "../styles/Table.css";

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
