import { NavLink } from "react-router-dom";

//AdminSidebar sluzi za navigaciju kroz admin deo
export default function AdminSidebar() {
  const activeStyle = {
    fontWeight: "bold",
    color: "#4a148c",
  };

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>Admin Meni</h2>
      <nav style={styles.nav}>
        <NavLink
          to="/admin/reservations"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          end
        >
          Rezervacije
        </NavLink>
        <NavLink
          to="/admin/users"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Korisnici
        </NavLink>
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f3e5f5",
    boxSizing: "border-box",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "25px",
    color: "#4a148c",
    fontWeight: "700",
    fontSize: "1.5rem",
    borderBottom: "2px solid #7b1fa2",
    paddingBottom: "8px",
  },
  nav: {
    fontSize:"1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    padding: "10px 15px",
    textDecoration: "none",
    color: "#4a148c",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background-color 0.3s, color 0.3s",
  },
  activeLink: {
    backgroundColor: "#7b1fa2",
    color: "#fff",
  },
};
