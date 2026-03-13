function SlotCard({ slot, onBook }) {
  const getStatusColor = () => {
    switch (slot.status) {
      case 'AVAILABLE':
        return 'bg-green-500 hover:bg-green-600';
      case 'BOOKED':
        return 'bg-yellow-500';
      case 'OCCUPIED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <button
      onClick={() => slot.status === 'AVAILABLE' && onBook(slot)}
      disabled={slot.status !== 'AVAILABLE'}
      className={`p-6 rounded-lg text-white font-bold transition ${getStatusColor()} ${
        slot.status !== 'AVAILABLE' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      <div className="text-2xl mb-2">{slot.slotNumber}</div>
      <div className="text-sm">{slot.status}</div>
    </button>
  );
}

export default SlotCard;
