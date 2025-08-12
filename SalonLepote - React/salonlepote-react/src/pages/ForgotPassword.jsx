import { useState } from "react";
import axiosInstance from "../api/axios.js";
import {Link} from "react-router-dom";
import Input from "../components/Input.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/password/forgot", { email })
      .then(res => {
        alert("Proverite email za link za reset lozinke.");
      })
      .catch(err => {
       alert("Došlo je do greške. Proverite email.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Zaboravljena lozinka</h2>
        <Input
          type="email"
          label="Email:"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={"Unesite Vaš email"}
          required 
        />
        <button type="submit">Pošalji link</button>
        <label>Ako ste primili email, unesite token:</label>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
        <Link
          to="/reset-password"
          style={{
            padding: "10px 16px",
            backgroundColor: "#7f39fb",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Unesi token
        </Link>
      </div>
      </form>
      
    </div>
  );
}

export default ForgotPassword;
