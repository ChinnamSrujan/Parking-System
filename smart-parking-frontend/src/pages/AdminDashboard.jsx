import { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';
import DashboardChart from '../components/DashboardChart';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showAddLot, setShowAddLot] = useState(false);
  const [newLot, setNewLot] = useState({
    locationName: '',
    address: '',
    totalSlots: 0,
    pricePerHour: 0,
    slots: []
  });

  useEffect(() => {
    fetchAnalytics();
    fetchBookings();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await adminAPI.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCreateLot = async (e) => {
    e.preventDefault();
    try {
      const slots = [];
      for (let i = 1; i <= newLot.totalSlots; i++) {
        slots.push({
          slotNumber: `A${i}`,
          status: 'AVAILABLE'
        });
      }
      
      await adminAPI.createParkingLot({ ...newLot, slots });
      alert('Parking lot created successfully');
      setShowAddLot(false);
      setNewLot({ locationName: '', address: '', totalSlots: 0, pricePerHour: 0, slots: [] });
    } catch (error) {
      alert('Failed to create parking lot');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      
      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Total Bookings</h3>
              <p className="text-4xl font-bold">{analytics.totalBookings}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Active Bookings</h3>
              <p className="text-4xl font-bold">{analytics.activeBookings}</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
              <p className="text-4xl font-bold">${analytics.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Utilization Rate</h3>
              <p className="text-4xl font-bold">{analytics.utilizationRate.toFixed(1)}%</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <DashboardChart data={analytics} />
          </div>
        </>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Parking Lots</h2>
          <button
            onClick={() => setShowAddLot(!showAddLot)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {showAddLot ? 'Cancel' : 'Add Parking Lot'}
          </button>
        </div>

        {showAddLot && (
          <form onSubmit={handleCreateLot} className="mb-6 p-4 border rounded">
            <input
              type="text"
              placeholder="Location Name"
              className="w-full p-2 mb-3 border rounded"
              value={newLot.locationName}
              onChange={(e) => setNewLot({ ...newLot, locationName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 mb-3 border rounded"
              value={newLot.address}
              onChange={(e) => setNewLot({ ...newLot, address: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Total Slots"
              className="w-full p-2 mb-3 border rounded"
              value={newLot.totalSlots}
              onChange={(e) => setNewLot({ ...newLot, totalSlots: parseInt(e.target.value) })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price Per Hour"
              className="w-full p-2 mb-3 border rounded"
              value={newLot.pricePerHour}
              onChange={(e) => setNewLot({ ...newLot, pricePerHour: parseFloat(e.target.value) })}
              required
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Create Parking Lot
            </button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Booking ID</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Slot ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Start Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-3">{booking.id}</td>
                  <td className="p-3">{booking.userId}</td>
                  <td className="p-3">{booking.slotId}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      booking.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(booking.bookingStartTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
