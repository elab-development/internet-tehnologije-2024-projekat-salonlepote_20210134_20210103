import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MakeupArtists from "./pages/MakeupArtists";
import ReservationForm from "./pages/ReservationForm";
import NotFound from "./pages/NotFound"; // opcionalno

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/makeup-artists" element={<MakeupArtists />} />
        <Route path="/rezervisi" element={<ReservationForm />} />
        <Route path="*" element={<NotFound />} /> {/* opcionalno */}
      </Routes>
    </Router>
  );

  <Route path="/login" element={<Login />} />

}

export default App;
