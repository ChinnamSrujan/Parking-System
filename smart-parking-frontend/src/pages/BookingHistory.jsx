import { useEffect, useState } from 'react';
import { bookingAPI } from '../services/api';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [extending, setExtending] = useState(null);
  const [extendHours, setExtendHours] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings(user.id);
      setBookings(response.data);
    } catch (error) { console.error(error); }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancelBooking(bookingId);
        fetchBookings();
        alert('Booking cancelled successfully');
      } catch (error) { alert('Failed to cancel booking'); }
    }
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

  // CSV export
  const exportCSV = () => {
    const headers = ['Booking ID', 'Slot ID', 'Vehicle', 'Status', 'Start Time', 'End Time', 'Created'];
    const rows = bookings.map(b => [
      b.id, b.slotId, b.vehicleNumber || '', b.status,
      toIST(b.bookingStartTime), toIST(b.bookingEndTime), toIST(b.createdAt)
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'my-bookings.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold animate-slide-left">My Booking History</h1>
        {bookings.length > 0 && (
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium">
            ⬇ Export CSV
          </button>
        )}
      </div>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-scale-in">
          <p className="text-gray-500 text-xl">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 animate-fade-in-up card-hover">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Booking ID:</strong> {booking.id}</p>
                  <p className="mb-2"><strong>Slot ID:</strong> {booking.slotId}</p>
                  {booking.vehicleNumber && <p className="mb-2">🚗 <strong>Vehicle:</strong> <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{booking.vehicleNumber}</span></p>}
                  <p className="mb-2">
                    <strong>Status:</strong>{' '}
                    <span className={`px-3 py-1 rounded ${
                      booking.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="mb-2"><strong>Start:</strong> {toIST(booking.bookingStartTime)}</p>
                  <p className="mb-2"><strong>End:</strong> {toIST(booking.bookingEndTime)}</p>
                  <p className="mb-2"><strong>Created:</strong> {toIST(booking.createdAt)}</p>
                </div>
              </div>
              
              {booking.qrCode && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Entry QR Code:</p>
                  <img src={`data:image/png;base64,${booking.qrCode}`} alt="QR Code" className="w-32 h-32" />
                </div>
              )}
              
              {booking.status === 'ACTIVE' && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  {extending === booking.id ? (
                    <div className="flex items-center gap-2">
                      <input type="number" min="1" max="12" value={extendHours}
                        onChange={e => setExtendHours(parseInt(e.target.value))}
                        className="w-16 p-1 border rounded text-center" />
                      <span className="text-sm text-gray-600">hr(s)</span>
                      <button onClick={() => handleExtend(booking.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Confirm</button>
                      <button onClick={() => setExtending(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setExtending(booking.id)} className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm font-medium">
                      ⏱ Extend Time
                    </button>
                  )}
                  <button onClick={() => handleCancel(booking.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
