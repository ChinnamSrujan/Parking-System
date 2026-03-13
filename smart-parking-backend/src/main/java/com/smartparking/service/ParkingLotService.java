package com.smartparking.service;

import com.smartparking.model.ParkingLot;
import com.smartparking.model.Slot;
import com.smartparking.repository.ParkingLotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ParkingLotService {
    
    @Autowired
    private ParkingLotRepository parkingLotRepository;
    
    public List<ParkingLot> getAllParkingLots() {
        return parkingLotRepository.findAll();
    }
    
    public ParkingLot getParkingLotById(String id) {
        return parkingLotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking lot not found"));
    }
    
    public List<Slot> getSlotsByParkingLotId(String id) {
        ParkingLot parkingLot = getParkingLotById(id);
        return parkingLot.getSlots();
    }
    
    public ParkingLot createParkingLot(ParkingLot parkingLot) {
        parkingLot.setAvailableSlots(parkingLot.getTotalSlots());
        return parkingLotRepository.save(parkingLot);
    }
    
    public ParkingLot addSlot(String parkingLotId, Slot slot) {
        ParkingLot parkingLot = getParkingLotById(parkingLotId);
        
        slot.setSlotId(UUID.randomUUID().toString());
        slot.setStatus("AVAILABLE");
        
        parkingLot.getSlots().add(slot);
        parkingLot.setTotalSlots(parkingLot.getSlots().size());
        parkingLot.setAvailableSlots(parkingLot.getAvailableSlots() + 1);
        
        return parkingLotRepository.save(parkingLot);
    }
    
    public ParkingLot updateSlotStatus(String parkingLotId, String slotId, String status) {
        ParkingLot parkingLot = getParkingLotById(parkingLotId);
        
        Slot slot = parkingLot.getSlots().stream()
                .filter(s -> s.getSlotId().equals(slotId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        
        String oldStatus = slot.getStatus();
        slot.setStatus(status);
        
        if (oldStatus.equals("AVAILABLE") && !status.equals("AVAILABLE")) {
            parkingLot.setAvailableSlots(parkingLot.getAvailableSlots() - 1);
        } else if (!oldStatus.equals("AVAILABLE") && status.equals("AVAILABLE")) {
            parkingLot.setAvailableSlots(parkingLot.getAvailableSlots() + 1);
        }
        
        return parkingLotRepository.save(parkingLot);
    }
}
