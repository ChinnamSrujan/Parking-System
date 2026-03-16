import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings(user.id);
      setBookings(response.data.filter(b => b.status === 'ACTIVE'));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/search" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition">
          <h3 className="text-2xl font-bold mb-2">Search Parking</h3>
          <p>Find available parking spots near you</p>
        </Link>
        
        <Link to="/bookings" className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition">
          <h3 className="text-2xl font-bold mb-2">My Bookings</h3>
          <p>View your booking history</p>
        </Link>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Active Bookings</h3>
          <p className="text-4xl font-bold">{bookings.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Active Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No active bookings</p>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="border p-4 rounded">
                <p><strong>Booking ID:</strong> {booking.id}</p>
                <p><strong>Status:</strong> <span className="text-green-600">{booking.status}</span></p>
                <p><strong>Start:</strong> {new Date(booking.bookingStartTime + (booking.bookingStartTime.endsWith('Z') ? '' : 'Z')).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(booking.bookingEndTime + (booking.bookingEndTime.endsWith('Z') ? '' : 'Z')).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
