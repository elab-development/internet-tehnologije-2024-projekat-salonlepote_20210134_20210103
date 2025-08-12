import { useState } from "react";
import axios from "axios";
import Input from "../components/Input";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/password/reset", {
        email,
        password,
        password_confirmation: confirmPassword,
        token,
      });
      alert("Lozinka uspešno resetovana! Možete se prijaviti.");
      window.location.href = "/login";
    } catch (err) {
      alert("Došlo je do greške pri promeni lozinke.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Reset lozinke</h2>
        
        <Input
          type="email"
          label="Email:"
          placeholder="Unesite Vaš email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          label="Nova lozinka:"
          placeholder="Unesite Vašu novu lozinku"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          label= "Potvrdi lozinku:"
          placeholder="Unesite ponovo novu lozinku"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <input
          type="text"
          label="Token:"
          placeholder="Unesite token iz mejla"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <button type="submit">Promeni lozinku</button>
      </form>
    </div>
  );
}

export default ResetPassword;
