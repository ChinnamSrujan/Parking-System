import { useEffect, useState } from 'react';
import { parkingAPI, bookingAPI, paymentAPI } from '../services/api';
import ParkingCard from '../components/ParkingCard';
import BookingModal from '../components/BookingModal';

function SearchParking() {
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const response = await parkingAPI.getAllParkingLots();
      setParkingLots(response.data);
    } catch (error) {
      console.error('Error fetching parking lots:', error);
    }
  };

  const handleViewSlots = async (lot) => {
    try {
      const response = await parkingAPI.getSlots(lot.id);
      setSlots(response.data);
      setSelectedLot(lot);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      // Create booking first
      const booking = await bookingAPI.createBooking(bookingData);
      
      // Payment will be handled by StripePaymentForm component
      // After successful payment, show success message
      alert('Booking and payment successful!');
      setShowModal(false);
      setSelectedLot(null);
      setSlots([]);
      fetchParkingLots();
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Parking Locations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {parkingLots.map((lot) => (
          <ParkingCard key={lot.id} lot={lot} onViewSlots={handleViewSlots} />
        ))}
      </div>

      {selectedLot && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Available Slots - {selectedLot.locationName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {slots.map((slot) => (
              <button
                key={slot.slotId}
                onClick={() => slot.status === 'AVAILABLE' && handleBookSlot(slot)}
                disabled={slot.status !== 'AVAILABLE'}
                className={`p-4 rounded-lg font-semibold ${
                  slot.status === 'AVAILABLE'
                    ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {slot.slotNumber}
                <div className="text-xs mt-1">{slot.status}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <BookingModal
          slot={selectedSlot}
          parkingLot={selectedLot}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default SearchParking;
