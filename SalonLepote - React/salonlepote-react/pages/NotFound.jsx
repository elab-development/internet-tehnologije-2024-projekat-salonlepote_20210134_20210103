import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>404 - Stranica nije pronađena</h2>
      <p>Stranica koju ste tražili ne postoji.</p>
      <Link to="/">Vrati se na početnu</Link>
    </div>
  );
}

export default NotFound;
