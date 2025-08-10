import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import AdminRoute from "./components/AdminRoute";
 
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MakeupArtists from "./pages/makeupArtists";
import ReservationForm from "./pages/ReservationForm";
import NotFound from "./pages/NotFound"; // opcionalno
import Gallery from './pages/Gallery';
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from './components/AdminLayout';
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Treatments from "./pages/Treatments";
import MyReservations from "./pages/MyReservations";

import './styles.css';


function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/makeup-artists" element={<MakeupArtists />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="*" element={<NotFound />} /> {/* opcionalno */}
        <Route path="/galerija" element={<Gallery />} />
        <Route path="/admin-dashboard" element={ <AdminRoute> <AdminLayout><AdminDashboard /></AdminLayout></AdminRoute> }/>
        <Route path="/admin/reservations" element={ <AdminRoute> <AdminLayout><Reservations /></AdminLayout></AdminRoute> }/>
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/${r.id}" element={<ReservationForm />} />
        <Route path="/admin/users" element={<AdminRoute> <AdminLayout> <Users /></AdminLayout></AdminRoute>}/>
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
