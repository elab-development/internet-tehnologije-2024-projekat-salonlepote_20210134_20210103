import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../styles/Form.css"

const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

function Register() {
  const navigate = useNavigate();
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

      setSuccess("Uspešna registracija! Možete se prijaviti!");
      navigate("/login");
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

      <form onSubmit={handleRegister} style={Form} >
         <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Registracija</h2>
        <label className="required">Ime i prezime:</label>
        <Input
          type="text"
          placeholder="Unesite Vaše ime i prezime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

        <label className="required">Email:</label>
        <Input
          type="email"
          placeholder="Unesite Vaš email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!validateEmail(email) && email ? "Neispravan email format" : ""}
        /><br />

        <label className="required">Lozinka:</label>
        <Input
          type="password"
          placeholder="Unesite Vašu lozinku"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password.length < 8 && password ? "Lozinka je prekratka. Lozinka mora imati bar 8 karaktera." : ""}
        /><br />

        <label className="required">Potvrda lozinke:</label>
        <Input
          type="password"
          placeholder="Ponovo unesite Vašu lozinku"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={password.length < 8 && password ? "Lozinka je prekratka. Lozinka mora imati bar 8 karaktera." : ""}
        /><br />

        <Button type="submit">Registruj se</Button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;


