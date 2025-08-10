import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Jovana Milenković",
    text: "Salon je fantastičan! Profesionalna usluga i odlična atmosfera.",
  },
  {
    id: 2,
    name: "Marko Petrović",
    text: "Preporučujem svima! Šminkeri su pravi majstori svog posla.",
  },
  {
    id: 3,
    name: "Ana Kovačević",
    text: "Uvek izlazim zadovoljna i opuštena. Sjajan tim i tretmani.",
  },
];

const containerStyle = {
  maxWidth: "700px",
  margin: "50px auto",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "12px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const testimonialStyle = {
  borderLeft: "4px solid #a341ff",
  paddingLeft: "15px",
  marginBottom: "20px",
  color: "#333",
  fontStyle: "italic",
};

const nameStyle = {
  fontWeight: "700",
  marginTop: "5px",
  color: "#a341ff",
};

function Testimonials() {
  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Šta naši klijenti kažu</h2>
      {testimonials.map(({ id, name, text }) => (
        <div key={id} style={testimonialStyle}>
          <p>"{text}"</p>
          <p style={nameStyle}>— {name}</p>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;
