import React from "react";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} style={{ color: "#FFD700", fontSize: "24px" }}>★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} style={{ color: "#FFD700", fontSize: "24px" }}>☆</span>);
    } else {
      stars.push(<span key={i} style={{ color: "#ccc", fontSize: "24px" }}>☆</span>);
    }
  }
  return <div>{stars}</div>;
}

export default function ClientRatings() {
  const ratings = [5, 4, 5, 5, 4, 5, 5, 3, 5, 5]; 

  const averageRating =
    ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2>Prosečna ocena naših klijenata</h2>
      <StarRating rating={averageRating} />
      <p style={{ fontSize: "18px", marginTop: "8px" }}>
        {averageRating.toFixed(1)} od 5 ({ratings.length} ocena)
      </p>
    </div>
  );
}
