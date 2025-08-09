import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import logoImage from "../assets/logo-bez-pozadine.png";
import Button from "../components/Button";
import useAuth from "../hooks/UseAuth";

function NavBar() {
  const { user, logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // preusmeravanje na login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logoImage}
            alt="J&B Beauty Lounge Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <Link to="/">J&B Beauty Lounge</Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Početna</Link></li>
          <li><Link to="/galerija">Galerija</Link></li>
          <li><Link to="/makeup-artists">Šminkeri</Link></li>
          <li><Link to="/rezervisi">Rezerviši</Link></li>

           {/* Admin vidi dashboard */}
          {user?.role === "admin" && (
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          )}

          {/* Makeup artist vidi svoje rezervacije */}
          {user?.role === "makeup_artist" && (
            <li><Link to="/my-reservations">Moje rezervacije</Link></li>
          )}

          {/* Client vidi svoje rezervacije */}
          { user?.role === "client" && (
            <li><Link to="/client-reservations">Moje rezervacije</Link></li>
          )}

          {/* Login / Logout dugme */}
          {isLoggedIn ? (
            <>
              <li style={{ fontWeight: "bold" }}>{user?.name} ({user?.role})</li>
              <li><Button onClick={handleLogout}>Logout</Button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
