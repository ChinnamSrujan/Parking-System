import { useEffect, useState } from 'react';
import { adminAPI, parkingAPI, bookingAPI } from '../services/api';
import DashboardChart from '../components/DashboardChart';
import QRScanner from '../components/QRScanner';
import VerificationResult from '../components/VerificationResult';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [parkingLots, setParkingLots] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddLot, setShowAddLot] = useState(false);
  const [newLot, setNewLot] = useState({ locationName: '', address: '', totalSlots: 0, pricePerHour: 0 });

  useEffect(() => {
    fetchAnalytics();
    fetchBookings();
    fetchParkingLots();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await adminAPI.getAnalytics();
      setAnalytics(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchBookings = async () => {
    try {
      const res = await adminAPI.getAllBookings();
      setBookings(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchParkingLots = async () => {
    try {
      const res = await parkingAPI.getAllParkingLots();
      setParkingLots(res.data);
    } catch (e) { console.error(e); }
  };

  const handleScanSuccess = async (bookingId) => {
    try {
      const res = await bookingAPI.getBookingById(bookingId);
      setVerificationResult(res.data && res.data.status === 'ACTIVE' ? res.data : null);
    } catch (e) {
      setVerificationResult(null);
    }
    setShowScanner(false);
    setShowResult(true);
  };

  const handleCreateLot = async (e) => {
    e.preventDefault();
    try {
      const slots = [];
      for (let i = 1; i <= newLot.totalSlots; i++) {
        slots.push({ slotNumber: `A${i}`, status: 'AVAILABLE' });
      }
      await adminAPI.createParkingLot({ ...newLot, slots });
      alert('Parking lot created successfully');
      setShowAddLot(false);
      setNewLot({ locationName: '', address: '', totalSlots: 0, pricePerHour: 0 });
      fetchParkingLots();
    } catch (e) {
      alert('Failed to create parking lot');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-6 animate-slide-left">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        {['overview', 'scan-qr', 'parking-lots', 'bookings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold capitalize rounded-t-lg transition-colors ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab === 'scan-qr' ? 'Scan QR' : tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 stagger-children">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg animate-fade-in-up card-hover">
              <h3 className="text-xl font-semibold mb-2">Total Bookings</h3>
              <p className="text-4xl font-bold">{analytics.totalBookings}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg animate-fade-in-up card-hover">
              <h3 className="text-xl font-semibold mb-2">Active Bookings</h3>
              <p className="text-4xl font-bold">{analytics.activeBookings}</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg animate-fade-in-up card-hover">
              <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
              <p className="text-4xl font-bold">₹{analytics.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg animate-fade-in-up card-hover">
              <h3 className="text-xl font-semibold mb-2">Utilization Rate</h3>
              <p className="text-4xl font-bold">{analytics.utilizationRate.toFixed(1)}%</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <DashboardChart data={analytics} />
          </div>
        </>
      )}

      {/* Scan QR Tab */}
      {activeTab === 'scan-qr' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Scan Customer QR Code</h2>
              <p className="text-gray-600">Scan the customer's booking QR code to verify their parking slot</p>
            </div>

            <button
              onClick={() => setShowScanner(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open QR Scanner
            </button>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-green-600 font-bold mb-1">✓ Valid</div>
                <p className="text-green-700 text-xs">Active booking</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-yellow-600 font-bold mb-1">⚠ Expired</div>
                <p className="text-yellow-700 text-xs">Booking passed</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <div className="text-red-600 font-bold mb-1">✗ Invalid</div>
                <p className="text-red-700 text-xs">Not found</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parking Lots Tab */}
      {activeTab === 'parking-lots' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Parking Lots</h2>
            <button
              onClick={() => setShowAddLot(!showAddLot)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {showAddLot ? 'Cancel' : 'Add Parking Lot'}
            </button>
          </div>

          {showAddLot && (
            <form onSubmit={handleCreateLot} className="bg-white rounded-lg shadow p-6 mb-6">
              <input type="text" placeholder="Location Name" className="w-full p-2 mb-3 border rounded"
                value={newLot.locationName} onChange={(e) => setNewLot({ ...newLot, locationName: e.target.value })} required />
              <input type="text" placeholder="Address" className="w-full p-2 mb-3 border rounded"
                value={newLot.address} onChange={(e) => setNewLot({ ...newLot, address: e.target.value })} required />
              <input type="number" placeholder="Total Slots" className="w-full p-2 mb-3 border rounded"
                value={newLot.totalSlots} onChange={(e) => setNewLot({ ...newLot, totalSlots: parseInt(e.target.value) })} required />
              <input type="number" step="0.01" placeholder="Price Per Hour (₹)" className="w-full p-2 mb-3 border rounded"
                value={newLot.pricePerHour} onChange={(e) => setNewLot({ ...newLot, pricePerHour: parseFloat(e.target.value) })} required />
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Create</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkingLots.map(lot => {
              const booked = lot.totalSlots - lot.availableSlots;
              const pct = lot.totalSlots > 0 ? Math.round((booked / lot.totalSlots) * 100) : 0;
              return (
                <div key={lot.id} className="bg-white rounded-lg shadow-lg p-6 animate-fade-in-up card-hover">
                  <h3 className="text-lg font-bold mb-1">{lot.locationName}</h3>
                  <p className="text-gray-500 text-sm mb-4">{lot.address}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">{lot.availableSlots}</p>
                      <p className="text-xs text-green-700">Available</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-red-600">{booked}</p>
                      <p className="text-xs text-red-700">Booked</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{pct}% occupied · ₹{lot.pricePerHour}/hr</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Booking ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Slot</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Start Time (IST)</th>
                  <th className="p-3 text-left">End Time (IST)</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const toIST = (t) => t ? new Date(t.endsWith('Z') ? t : t + 'Z').toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-';
                  return (
                  <tr key={b.id} className="border-b">
                    <td className="p-3 text-xs">{b.id}</td>
                    <td className="p-3 text-xs">{b.userId}</td>
                    <td className="p-3">{b.slotId}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        b.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>{b.status}</span>
                    </td>
                    <td className="p-3 text-sm">{toIST(b.bookingStartTime)}</td>
                    <td className="p-3 text-sm">{toIST(b.bookingEndTime)}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showScanner && (
        <QRScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />
      )}
      {showResult && (
        <VerificationResult booking={verificationResult} onClose={() => { setShowResult(false); setVerificationResult(null); }} />
      )}
    </div>
  );
}

export default AdminDashboard;
