import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'; 
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/services" element={<Services />} />
          <Route path="/reservations" element={<Reservations />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
