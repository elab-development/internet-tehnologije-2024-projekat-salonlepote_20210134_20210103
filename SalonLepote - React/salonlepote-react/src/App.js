import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'; 
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import MakeupArtists from "./pages/makeupArtists";
import ReservationForm from "./pages/ReservationForm";
import NotFound from "./pages/NotFound"; // opcionalno
function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/makeup-artists" element={<MakeupArtists />} />
        <Route path="/rezervisi" element={<ReservationForm />} />
        <Route path="*" element={<NotFound />} /> {/* opcionalno */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
