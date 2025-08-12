import { useState } from "react";
import axios from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";
import {useAuth} from "../hooks/AuthContext";
import { Link } from "react-router-dom";

const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
     
      const token = res.data.data.token;
      const user = res.data.data.user;
    
      login(token, user); 
      
      alert("Uspešna prijava");
      window.location.href = "/"; 
    } catch (err) {
      alert("Greška pri prijavi");
    }
  };

  return (
     <form
      onSubmit={handleLogin}
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Prijava</h2>

      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Unesite Vaš email"
        error={!validateEmail(email) && email ? "Neispravan email format" : ""}
        required
      />

      <Input
        id="password"
        label="Lozinka"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Unesite lozinku"
        error={password.length < 8 && password ? "Lozinka je prekratka. Lozinka sadrži bar 8 karaktera." : ""}
        required
      />

      <p style={{ textAlign: "center", marginTop: "10px",color: "#555" }}>
        Zaboravili ste lozinku?{" "}
        <Link to="/forgot-password">Resetujte je.</Link>
      </p>

    <Button type="submit">Prijavi se</Button>
    <p style={{ fontSize: "16px", color: "#555", textAlign: "center", marginTop: "10px" }}>
      Nemate nalog?{" "}
      <Link to="/register">Registrujte se.</Link>
    </p>
    </form>
    
  );
}
export default Login;
