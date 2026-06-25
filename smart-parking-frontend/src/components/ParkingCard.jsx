// Actual photos of Bengaluru malls from Wikimedia Commons (CC licensed)
const locationImages = {
  'phoenix':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Phoenix-marketcity-BLR-2.jpg/800px-Phoenix-marketcity-BLR-2.jpg',
  'nexus':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Forum-Mall-Whitefield-Bangalore.jpg/800px-Forum-Mall-Whitefield-Bangalore.jpg',
  'forum':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Forum-Mall-Whitefield-Bangalore.jpg/800px-Forum-Mall-Whitefield-Bangalore.jpg',
  'pvr':         'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Orion-mall-BLR-2.jpg/800px-Orion-mall-BLR-2.jpg',
  'inox':        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Garuda_Mall_Bangalore_182322.jpg/800px-Garuda_Mall_Bangalore_182322.jpg',
  'lulu':        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lulu_mall_bangalore.jpg/800px-Lulu_mall_bangalore.jpg',
  'cinepolis':   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Orion-mall-BLR-2.jpg/800px-Orion-mall-BLR-2.jpg',
  'ub city':     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Garuda_Mall_Bangalore_182322.jpg/800px-Garuda_Mall_Bangalore_182322.jpg',
  'ub':          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Garuda_Mall_Bangalore_182322.jpg/800px-Garuda_Mall_Bangalore_182322.jpg',
  'royal':       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Phoenix-marketcity-BLR-2.jpg/800px-Phoenix-marketcity-BLR-2.jpg',
  'mantri':      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lulu_mall_bangalore.jpg/800px-Lulu_mall_bangalore.jpg',
  'orion':       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Orion-mall-BLR-2.jpg/800px-Orion-mall-BLR-2.jpg',
  'market square': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Forum-Mall-Whitefield-Bangalore.jpg/800px-Forum-Mall-Whitefield-Bangalore.jpg',
  'brigade':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Phoenix-marketcity-BLR-2.jpg/800px-Phoenix-marketcity-BLR-2.jpg',
  'gopalan':     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lulu_mall_bangalore.jpg/800px-Lulu_mall_bangalore.jpg',
  'total':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Forum-Mall-Whitefield-Bangalore.jpg/800px-Forum-Mall-Whitefield-Bangalore.jpg',
  'central':     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Garuda_Mall_Bangalore_182322.jpg/800px-Garuda_Mall_Bangalore_182322.jpg',
  'innovative':  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Orion-mall-BLR-2.jpg/800px-Orion-mall-BLR-2.jpg',
};

const locationColors = {
  'phoenix': 'from-blue-600 to-blue-800', 'nexus': 'from-purple-600 to-purple-800',
  'forum': 'from-green-600 to-green-800', 'pvr': 'from-red-600 to-red-800',
  'inox': 'from-orange-600 to-orange-800', 'lulu': 'from-pink-600 to-pink-800',
  'cinepolis': 'from-indigo-600 to-indigo-800', 'ub': 'from-yellow-600 to-yellow-800',
  'royal': 'from-rose-600 to-rose-800', 'mantri': 'from-teal-600 to-teal-800',
  'orion': 'from-cyan-600 to-cyan-800', 'market': 'from-lime-600 to-lime-800',
  'brigade': 'from-violet-600 to-violet-800', 'gopalan': 'from-amber-600 to-amber-800',
  'total': 'from-emerald-600 to-emerald-800', 'central': 'from-sky-600 to-sky-800',
  'innovative': 'from-fuchsia-600 to-fuchsia-800',
};

const locationIcons = {
  'phoenix': '🏬', 'nexus': '🛍️', 'forum': '🏪', 'pvr': '🎬',
  'inox': '🎭', 'lulu': '🏢', 'cinepolis': '🎥', 'ub': '🏙️',
  'royal': '👑', 'mantri': '🏛️', 'orion': '🌟', 'market': '🏪',
  'brigade': '🏗️', 'gopalan': '🎪', 'total': '🛒', 'central': '🏬',
  'innovative': '💡',
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
  const imgSrc = key ? locationImages[key] : null;
  const color = key ? locationColors[key] : 'from-blue-600 to-blue-800';
  const icon = key ? locationIcons[key] : '🅿️';
  const pct = lot.totalSlots > 0
    ? Math.round(((lot.totalSlots - lot.availableSlots) / lot.totalSlots) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition card-hover animate-fade-in-up">
      {/* Mall photo with gradient fallback */}
      <div className="relative h-40 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={lot.locationName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback gradient shown if image fails */}
        <div
          className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}
          style={{ display: imgSrc ? 'none' : 'flex' }}
        >
          <div className="text-center">
            <div className="text-5xl mb-1">{icon}</div>
            <div className="text-white font-bold text-sm opacity-90">
              {lot.locationName.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
        </div>

        {/* Dark overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

        {/* Availability badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow ${
          lot.availableSlots > 10 ? 'bg-green-500 text-white' :
          lot.availableSlots > 0  ? 'bg-yellow-400 text-gray-900' :
          'bg-red-500 text-white'
        }`}>
          {lot.availableSlots > 0 ? `${lot.availableSlots} free` : 'Full'}
        </div>

        {/* Location name on image */}
        <div className="absolute bottom-2 left-3 text-white">
          <p className="font-bold text-sm drop-shadow">{lot.locationName}</p>
          <p className="text-xs opacity-80">📍 {lot.address.split(',').slice(-2).join(',').trim()}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
          <span>🅿 {lot.totalSlots} total slots</span>
          <span className="font-semibold text-blue-600">₹{lot.pricePerHour}/hr</span>
        </div>

        {/* Occupancy bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
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
