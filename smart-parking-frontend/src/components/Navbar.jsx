import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2 text-2xl font-bold">
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 rounded-full shadow" />
            Smart Parking
          </Link>
          <div className="flex gap-6 items-center">
            {!isAdmin && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <Link to="/search" className="hover:text-blue-200">Search Parking</Link>
                <Link to="/bookings" className="hover:text-blue-200">My Bookings</Link>
              </>
            )}
            {isAdmin && (
              <Link to="/admin" className="hover:text-blue-200">Admin Dashboard</Link>
            )}
            <span className="text-sm">{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
