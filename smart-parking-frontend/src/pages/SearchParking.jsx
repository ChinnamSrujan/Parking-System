import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parkingAPI } from '../services/api';
import ParkingCard from '../components/ParkingCard';

function SearchParking() {
  const [parkingLots, setParkingLots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    parkingAPI.getAllParkingLots()
      .then(res => setParkingLots(res.data))
      .catch(err => console.error('Error fetching parking lots:', err));
  }, []);

  const handleViewSlots = (lot) => {
    navigate(`/slots/${lot.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 animate-slide-left">Search Parking Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {parkingLots.map((lot) => (
          <div key={lot.id} className="animate-fade-in-up card-hover">
            <ParkingCard lot={lot} onViewSlots={handleViewSlots} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchParking;
