import { useEffect, useState } from 'react';
import { bookingAPI } from '../services/api';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings(user.id);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancelBooking(bookingId);
        fetchBookings();
        alert('Booking cancelled successfully');
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Booking History</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-500 text-xl">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Booking ID:</strong> {booking.id}</p>
                  <p className="mb-2"><strong>Slot ID:</strong> {booking.slotId}</p>
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
                  <p className="mb-2"><strong>Start:</strong> {new Date(booking.bookingStartTime + (booking.bookingStartTime.endsWith('Z') ? '' : 'Z')).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</p>
                  <p className="mb-2"><strong>End:</strong> {new Date(booking.bookingEndTime + (booking.bookingEndTime.endsWith('Z') ? '' : 'Z')).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</p>
                  <p className="mb-2"><strong>Created:</strong> {new Date(booking.createdAt + (booking.createdAt.endsWith('Z') ? '' : 'Z')).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</p>
                </div>
              </div>
              
              {booking.qrCode && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Entry QR Code:</p>
                  <img src={`data:image/png;base64,${booking.qrCode}`} alt="QR Code" className="w-32 h-32" />
                </div>
              )}
              
              {booking.status === 'ACTIVE' && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
