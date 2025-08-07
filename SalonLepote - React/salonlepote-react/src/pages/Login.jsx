import { useState } from "react";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      localStorage.setItem("token", res.data.data.token);
      alert("Uspešna prijava");
    } catch (err) {
      alert("Greška pri prijavi");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lozinka" />
      <button type="submit">Prijavi se</button>
    </form>
  );
}
export default Login;
