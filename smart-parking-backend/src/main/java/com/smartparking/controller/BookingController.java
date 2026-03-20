package com.smartparking.controller;

import com.smartparking.dto.BookingRequest;
import com.smartparking.model.Booking;
import com.smartparking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }
    
    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }
    
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }

    @PutMapping("/{bookingId}/extend")
    public ResponseEntity<Booking> extendBooking(@PathVariable String bookingId, @RequestParam int hours) {
        return ResponseEntity.ok(bookingService.extendBooking(bookingId, hours));
    }
}
