package com.smartparking.controller;

import com.smartparking.model.ParkingLot;
import com.smartparking.model.Slot;
import com.smartparking.service.ParkingLotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-lots")
public class ParkingLotController {
    
    @Autowired
    private ParkingLotService parkingLotService;
    
    @GetMapping
    public ResponseEntity<List<ParkingLot>> getAllParkingLots() {
        return ResponseEntity.ok(parkingLotService.getAllParkingLots());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ParkingLot> getParkingLotById(@PathVariable String id) {
        return ResponseEntity.ok(parkingLotService.getParkingLotById(id));
    }
    
    @GetMapping("/{id}/slots")
    public ResponseEntity<List<Slot>> getSlots(@PathVariable String id) {
        return ResponseEntity.ok(parkingLotService.getSlotsByParkingLotId(id));
    }
}
