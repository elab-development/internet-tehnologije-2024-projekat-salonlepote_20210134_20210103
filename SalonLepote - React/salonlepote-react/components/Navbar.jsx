import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/makeup-artists">Šminkeri</Link></li>
        <li><Link to="/rezervisi">Rezerviši</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registracija</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
