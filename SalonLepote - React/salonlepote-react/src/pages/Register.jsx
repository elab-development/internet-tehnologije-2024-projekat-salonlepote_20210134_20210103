import { useState } from "react";
import axios from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });
      alert("Uspešna registracija!");
    } catch (err) {
      alert("Greška pri registraciji");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registracija</h2>
      <input
        type="text"
        placeholder="Ime"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Lozinka"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Potvrdi lozinku"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      /><br />
      <button type="submit">Registruj se</button>
    </form>
  );
}

export default Register;
