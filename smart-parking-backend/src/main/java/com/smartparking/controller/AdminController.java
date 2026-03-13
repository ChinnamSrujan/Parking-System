package com.smartparking.controller;

import com.smartparking.model.Booking;
import com.smartparking.model.ParkingLot;
import com.smartparking.model.Slot;
import com.smartparking.service.BookingService;
import com.smartparking.service.DashboardService;
import com.smartparking.service.ParkingLotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private ParkingLotService parkingLotService;
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private DashboardService dashboardService;
    
    @PostMapping("/parking-lot")
    public ResponseEntity<ParkingLot> createParkingLot(@RequestBody ParkingLot parkingLot) {
        return ResponseEntity.ok(parkingLotService.createParkingLot(parkingLot));
    }
    
    @PostMapping("/add-slot")
    public ResponseEntity<ParkingLot> addSlot(@RequestParam String parkingLotId, @RequestBody Slot slot) {
        return ResponseEntity.ok(parkingLotService.addSlot(parkingLotId, slot));
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(dashboardService.getAnalytics());
    }
}
