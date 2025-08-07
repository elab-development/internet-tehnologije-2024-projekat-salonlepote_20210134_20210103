import { useState } from "react";
import axios from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // ✅ Provera da lozinke odgovaraju
    if (password !== confirm) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });

      setSuccess("Uspešna registracija!");
      // Resetuj formu
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Greška pri registraciji.");
      }
    }
  };

  return (
    <div>
      <h2>Registracija</h2>

      <form onSubmit={handleRegister}>
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

      {/* ✅ Poruke za korisnika */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;


