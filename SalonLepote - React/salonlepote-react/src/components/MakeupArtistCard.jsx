function MakeupArtistCard({ name, email, role, description, image }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <h3>{name}</h3>
      <p><strong>Uloga:</strong> {role}</p>
      <p><strong>Email:</strong> {email}</p>
      <p>{description}</p>
    </div>
  );
}

const styles = {
    card: {
        background: "#ffeef8ff",
        borderRadius: "8px",
        padding: "20px",       
        margin: "20px",
        width: "300px",        
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)", 
        textAlign: "center"
    },
    image: {
        width: "100%",
        height: "250px",       
        objectFit: "cover",
        borderRadius: "8px"
    }
};

export default MakeupArtistCard;