import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import logoImage from "../assets/logo-bez-pozadine.png";

function NavBar() {
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
          <li><Link to="/makeup-artists">Šminkeri</Link></li>
          <li><Link to="/rezervisi">Rezerviši</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
