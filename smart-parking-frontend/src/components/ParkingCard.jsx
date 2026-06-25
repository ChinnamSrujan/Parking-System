// Using reliable free image sources for parking/mall locations
const locationImages = {
  'phoenix':   'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80',
  'nexus':     'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
  'forum':     'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  'pvr':       'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
  'inox':      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
  'lulu':      'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?auto=format&fit=crop&w=600&q=80',
  'cinepolis': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
};

// Fallback gradient colors per location for when images don't load
const locationColors = {
  'phoenix':   'from-blue-500 to-blue-700',
  'nexus':     'from-purple-500 to-purple-700',
  'forum':     'from-green-500 to-green-700',
  'pvr':       'from-red-500 to-red-700',
  'inox':      'from-orange-500 to-orange-700',
  'lulu':      'from-pink-500 to-pink-700',
  'cinepolis': 'from-indigo-500 to-indigo-700',
};

// Parking lot icons
const locationIcons = {
  'phoenix':   '🏬',
  'nexus':     '🛍️',
  'forum':     '🏪',
  'pvr':       '🎬',
  'inox':      '🎭',
  'lulu':      '🏢',
  'cinepolis': '🎥',
};

function getKey(name) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(locationImages)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

function ParkingCard({ lot, onViewSlots }) {
  const key = getKey(lot.locationName);
  const color = key ? locationColors[key] : 'from-blue-500 to-blue-700';
  const icon = key ? locationIcons[key] : '🅿️';
  const pct = lot.totalSlots > 0 ? Math.round(((lot.totalSlots - lot.availableSlots) / lot.totalSlots) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition card-hover animate-fade-in-up">
      {/* Gradient header with icon — no external image dependency */}
      <div className={`relative h-36 bg-gradient-to-br ${color} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-5xl mb-1">{icon}</div>
          <div className="text-white font-bold text-sm opacity-90">{lot.locationName.split(' ').slice(0,2).join(' ')}</div>
        </div>
        {/* Availability badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow ${
          lot.availableSlots > 10 ? 'bg-green-400 text-white' :
          lot.availableSlots > 0  ? 'bg-yellow-400 text-gray-900' :
          'bg-red-500 text-white'
        }`}>
          {lot.availableSlots > 0 ? `${lot.availableSlots} free` : 'Full'}
        </div>
        {/* Location pin */}
        <div className="absolute bottom-2 left-3 text-white text-xs opacity-80">
          📍 {lot.address.split(',').slice(-2).join(',').trim()}
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
          <div
            className={`h-1.5 rounded-full transition-all ${
              pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-yellow-400' : 'bg-green-500'
            }`}
            style={{ width: `${pct}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mb-3">{pct}% occupied</p>

        <button
          onClick={() => onViewSlots(lot)}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          View Slots
        </button>
      </div>
    </div>
  );
}

export default ParkingCard;
