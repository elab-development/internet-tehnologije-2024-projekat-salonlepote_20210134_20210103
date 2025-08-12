import { useEffect, useState } from "react";
import axios from "../api/axios";
import stilTabele from "../styles/Table.css";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Korisnici() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});


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

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
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
      await axios.put(`/users/${id}`, editFormData);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...editFormData } : u))
      );
      setEditingId(null);
      setEditFormData({});
      alert("Korisnik je uspešno izmenjen.");
    } catch (err) {
      console.error(err);
      alert("Greška pri izmeni korisnika.");
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
              <td>
                {editingId === u.id ? (
                  <Input
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  u.name || "N/A"
                )}
              </td>
              <td>
                {editingId === u.id ? (
                  <Input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  u.email || "N/A"
                )}
              </td>
              
              <td>{u.created_at}</td>
              <td>{u.updated_at}</td>
              <td>
                {editingId === u.id ? (
                  <select name="role" value={editFormData.role} onChange={handleInputChange} style={{ padding: '6px 10px',fontSize: '16px',borderRadius: '5px'}}>
                    <option value="client">client</option>
                    <option value="makeup_artist">makeup_artist</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>
              <td>
                {editingId === u.id ? (
                  <>
                    <Button onClick={() => handleSave(u.id)} style={{ marginRight: "8px" }}>Sačuvaj</Button>
                    <Button onClick={handleCancelClick}>Otkaži</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(u)} style={{ marginRight: "8px" }}>Izmeni</Button>
                    <Button onClick={() => handleDelete(u.id)}>Obriši</Button>
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
