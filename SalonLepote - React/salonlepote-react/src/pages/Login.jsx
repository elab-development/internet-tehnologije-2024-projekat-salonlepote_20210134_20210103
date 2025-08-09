import { useState } from "react";
import axios from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";

const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      // očekujemo da backend vrati token i user podatke
      const token = res.data.data.token;
      const user = res.data.data.user;
    
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Uspešna prijava");
      window.location.href = "/"; // osvežavanje i preusmeravanje na početnu
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
        placeholder="Unesite vaš email"
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
        error={password.length < 6 && password ? "Lozinka je prekratka" : ""}
        required
      />


    <Button type="submit">Prijavi se</Button>
    </form>
  );
}
export default Login;
