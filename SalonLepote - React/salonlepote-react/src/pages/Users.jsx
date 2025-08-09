import { useEffect, useState } from "react";
import axios from "../api/axios";
import stilTabele from "../styles/Table.css";
import Button from "../components/Button";

export default function Korisnici() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const us = await axios.get("/users");
      setUsers(us.data);
    } catch (err) {
      console.error(err);
      alert("Greška pri učitavanju korisnika.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete korisnika?")) {
      try {
        await axios.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        alert("Korisnik je obrisan.");
      } catch (err) {
        alert("Greška pri brisanju korisnika.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Korisnici</h1>
      <table border="1" cellPadding="8" style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Email</th>
            <th>Kreiran</th>
            <th>Izmenjen</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u?.name || "N/A"}</td>
                <td>{u?.email || "N/A"}</td>
                <td>{u.created_at}</td>
                <td>{u.updated_at}</td>
                <td>{u.role}</td>
                <td><Button onClick={() => handleDelete(u.id)}>Obriši</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
