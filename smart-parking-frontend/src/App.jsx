import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SearchParking from './pages/SearchParking';
import ParkingSlots from './pages/ParkingSlots';
import BookingHistory from './pages/BookingHistory';
import AdminDashboard from './pages/AdminDashboard';
import QRVerification from './pages/QRVerification';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={isAdmin ? "/admin" : "/dashboard"} />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={isAdmin ? "/admin" : "/dashboard"} />} />
          <Route path="/dashboard" element={isAuthenticated && !isAdmin ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated && !isAdmin ? <SearchParking /> : <Navigate to="/login" />} />
          <Route path="/slots/:lotId" element={isAuthenticated && !isAdmin ? <ParkingSlots /> : <Navigate to="/login" />} />
          <Route path="/bookings" element={isAuthenticated && !isAdmin ? <BookingHistory /> : <Navigate to="/login" />} />
          <Route path="/verify-qr" element={isAuthenticated ? <QRVerification /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? (isAdmin ? "/admin" : "/dashboard") : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
