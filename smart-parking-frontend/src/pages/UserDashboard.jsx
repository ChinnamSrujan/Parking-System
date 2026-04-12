import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';

function CountdownTimer({ endTime }) {
  const calc = () => {
    const diff = new Date(endTime.endsWith('Z') ? endTime : endTime + 'Z') - new Date();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s, diff };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [endTime]);
  if (!time) return <span className="text-red-500 font-semibold">Expired</span>;
  const urgent = time.diff < 15 * 60 * 1000;
  return (
    <span className={`font-mono font-bold text-lg ${urgent ? 'text-red-500 animate-pulse' : 'text-green-600'}`}>
      {String(time.h).padStart(2,'0')}:{String(time.m).padStart(2,'0')}:{String(time.s).padStart(2,'0')}
    </span>
  );
}

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [extending, setExtending] = useState(null);
  const [extendHours, setExtendHours] = useState(1);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    if (!user?.id) return;
    try {
      const response = await bookingAPI.getUserBookings(user.id);
      setBookings(response.data.filter(b => b.status === 'ACTIVE'));
    } catch (error) { console.error(error); }
  };

  const handleExtend = async (bookingId) => {
    try {
      await bookingAPI.extendBooking(bookingId, extendHours);
      setExtending(null);
      fetchBookings();
      alert(`Booking extended by ${extendHours} hour(s)`);
    } catch (e) { alert('Failed to extend booking'); }
  };

  const toIST = (t) => t ? new Date(t.endsWith('Z') ? t : t + 'Z').toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-';

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 animate-slide-left">Welcome, {user?.name || 'User'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-children">
        <Link to="/search" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition card-hover animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-2">Search Parking</h3>
          <p>Find available parking spots near you</p>
        </Link>
        <Link to="/bookings" className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition card-hover animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-2">My Bookings</h3>
          <p>View your booking history</p>
        </Link>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg card-hover animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-2">Active Bookings</h3>
          <p className="text-4xl font-bold">{bookings.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in-up" style={{animationDelay:'0.3s'}}>
        <h2 className="text-2xl font-bold mb-4">Active Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No active bookings</p>
        ) : (
          <div className="space-y-4 stagger-children">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 animate-fade-in-up card-hover">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Booking ID: {booking.id}</p>
                    {booking.vehicleNumber && (
                      <p className="mb-1">🚗 <strong>Vehicle:</strong> <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{booking.vehicleNumber}</span></p>
                    )}
                    <p className="mb-1"><strong>Start:</strong> {toIST(booking.bookingStartTime)}</p>
                    <p className="mb-1"><strong>End:</strong> {toIST(booking.bookingEndTime)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Time remaining</p>
                    <CountdownTimer endTime={booking.bookingEndTime} />
                  </div>
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {extending === booking.id ? (
                    <div className="flex items-center gap-2">
                      <input type="number" min="1" max="12" value={extendHours}
                        onChange={e => setExtendHours(parseInt(e.target.value))}
                        className="w-16 p-1 border rounded text-center" />
                      <span className="text-sm text-gray-600">hr(s)</span>
                      <button onClick={() => handleExtend(booking.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Confirm</button>
                      <button onClick={() => setExtending(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setExtending(booking.id)} className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-200">
                      ⏱ Extend Time
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
