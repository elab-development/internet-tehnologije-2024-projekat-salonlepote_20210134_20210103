import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

const treatmentsData = [
  { id: 1, name: "Dubinsko čišćenje lica", category: "lice" },
  { id: 2, name: "Hidratantni tretman lica", category: "lice" },
  { id: 3, name: "Anti-age tretman", category: "lice" },
  { id: 4, name: "Relax masaža", category: "masaža" },
  { id: 5, name: "Sportska masaža", category: "masaža" },
  { id: 6, name: "Aromaterapija", category: "masaža" },
  { id: 7, name: "Kiseonički tretman lica", category: "lice" },
  { id: 8, name: "Masaža leđa", category: "masaža" },
  { id: 9, name: "Tretman lica vitaminima", category: "lice" },
  { id: 10, name: "Masaža stopala", category: "masaža" },
];



const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "30px",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: "center",
  color: "#333",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  margin: "15px 0",
  width: "60%",
  fontSize: "16px",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  marginTop: "20px",
  fontSize: "18px",
  color: "#555",
  textAlign: "left",
};

const paginationStyle = {
  marginTop: "25px",
};

const buttonStyle = (active) => ({
  margin: "0 6px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: active ? "#a341ff" : "#ddd",
  color: active ? "white" : "#333",
  cursor: "pointer",
  fontWeight: active ? "700" : "400",
});

function Treatments() {
  const [category, setCategory] = useState("sve");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
<div style={{ padding: "20px", minHeight: "100vh", position: "relative" }}>
  <Breadcrumbs
        paths={[
          { name: "Početna", link: "/" },
          { name: "Tretmani", link: "/treatments" },
        ]}
      />
</div>
  const filteredTreatments =
    category === "sve"
      ? treatmentsData
      : treatmentsData.filter((t) => t.category === category);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTreatments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);

  return (
    
  

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <Breadcrumbs
          paths={[
            { name: "Početna", link: "/" },
            { name: "Tretmani", link: "/treatments" },
          ]}
        />
      
        
        <div style={containerStyle}>
      
      

      <h2>Naši tretmani</h2>

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1); // resetuj stranicu kad filter promeni
        }}
        style={selectStyle}
      >
        <option value="sve">Svi tretmani</option>
        <option value="lice">Tretmani lica</option>
        <option value="masaža">Masaže</option>
      </select>

      <ul style={listStyle}>
        {currentItems.map((t) => (
          <li key={t.id}>• {t.name}</li>
        ))}
      </ul>

      <div style={paginationStyle}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={buttonStyle(currentPage === index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Treatments;
