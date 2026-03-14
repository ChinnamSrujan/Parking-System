function ParkingCard({ lot, onViewSlots }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-2">{lot.locationName}</h3>
      <p className="text-gray-600 mb-4">{lot.address}</p>
      <div className="space-y-2 mb-4">
        <p><strong>Total Slots:</strong> {lot.totalSlots}</p>
        <p><strong>Available:</strong> <span className="text-green-600">{lot.availableSlots}</span></p>
        <p><strong>Price:</strong> ₹{lot.pricePerHour}/hour</p>
      </div>
      <button
        onClick={() => onViewSlots(lot)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        View Slots
      </button>
    </div>
  );
}

export default ParkingCard;
