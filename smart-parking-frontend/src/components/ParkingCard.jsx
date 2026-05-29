// Map parking lot names to relevant Unsplash images
const locationImages = {
  'phoenix': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
  'nexus': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80',
  'forum': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  'pvr': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
  'inox': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
  'lulu': 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=600&q=80',
  'cinepolis': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
};

function getImage(name) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(locationImages)) {
    if (lower.includes(key)) return locationImages[key];
  }
  return 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80';
}

function ParkingCard({ lot, onViewSlots }) {
  const img = getImage(lot.locationName);
  const pct = lot.totalSlots > 0 ? Math.round(((lot.totalSlots - lot.availableSlots) / lot.totalSlots) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition card-hover animate-fade-in-up">
      {/* Location image */}
      <div className="relative h-40 overflow-hidden">
        <img src={img} alt={lot.locationName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-2 left-3 text-white">
          <p className="text-xs opacity-80">📍 {lot.address.split(',').slice(-2).join(',').trim()}</p>
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
          lot.availableSlots > 10 ? 'bg-green-500 text-white' :
          lot.availableSlots > 0 ? 'bg-yellow-400 text-gray-900' :
          'bg-red-500 text-white'
        }`}>
          {lot.availableSlots > 0 ? `${lot.availableSlots} free` : 'Full'}
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 text-gray-800">{lot.locationName}</h3>
        <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
          <span>🅿 {lot.totalSlots} total slots</span>
          <span className="font-semibold text-blue-600">₹{lot.pricePerHour}/hr</span>
        </div>

        {/* Occupancy bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div className={`h-1.5 rounded-full ${pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-yellow-400' : 'bg-green-500'}`}
            style={{ width: `${pct}%` }}></div>
        </div>

        <button
          onClick={() => onViewSlots(lot)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          View Slots
        </button>
      </div>
    </div>
  );
}

export default ParkingCard;
