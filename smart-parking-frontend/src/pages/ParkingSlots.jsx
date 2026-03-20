import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parkingAPI } from '../services/api';
import BookingModal from '../components/BookingModal';

function ParkingSlots() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [lot, setLot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [lotId]);

  const fetchData = async () => {
    try {
      const [lotRes, slotsRes] = await Promise.all([
        parkingAPI.getParkingLotById(lotId),
        parkingAPI.getSlots(lotId)
      ]);
      setLot(lotRes.data);
      setSlots(slotsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setShowModal(false);
    fetchData();
  };

  const available = slots.filter(s => s.status === 'AVAILABLE').length;
  const booked = slots.filter(s => s.status !== 'AVAILABLE').length;
  const recommendedSlot = slots.find(s => s.status === 'AVAILABLE');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">Loading slots...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={() => navigate('/search')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Parking Locations
      </button>

      {/* Lot Info */}
      {lot && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-scale-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{lot.locationName}</h1>
          <p className="text-gray-500 mb-4">{lot.address}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              <span className="text-gray-700">Available: <strong>{available}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span>
              <span className="text-gray-700">Booked: <strong>{booked}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Price: <strong className="text-blue-600">₹{lot.pricePerHour}/hr</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-6 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-green-500"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-yellow-400"></div>
          <span className="text-sm text-gray-600">Recommended</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gray-300"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-orange-400"></div>
          <span className="text-sm text-gray-600">Maintenance</span>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Select a Slot</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {slots.map((slot) => {
            const isRecommended = recommendedSlot && slot.slotId === recommendedSlot.slotId;
            const isMaintenance = slot.status === 'MAINTENANCE';
            const isAvailable = slot.status === 'AVAILABLE';
            return (
            <button
              key={slot.slotId}
              onClick={() => {
                if (isAvailable) { setSelectedSlot(slot); setShowModal(true); }
              }}
              disabled={!isAvailable}
              title={isRecommended ? '⭐ Recommended slot' : isMaintenance ? 'Under maintenance' : ''}
              className={`p-3 rounded-lg font-semibold text-sm transition-transform relative ${
                isRecommended
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:scale-105 cursor-pointer shadow-lg ring-2 ring-yellow-600'
                  : isAvailable
                  ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 cursor-pointer shadow'
                  : isMaintenance
                  ? 'bg-orange-400 text-white cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {slot.slotNumber}
              {isRecommended && <span className="absolute -top-1 -right-1 text-xs">⭐</span>}
            </button>
            );
          })}
        </div>
      </div>

      {showModal && lot && (
        <BookingModal
          slot={selectedSlot}
          parkingLot={lot}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default ParkingSlots;
