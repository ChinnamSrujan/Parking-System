package com.smartparking.service;

import com.smartparking.dto.BookingRequest;
import com.smartparking.model.Booking;
import com.smartparking.repository.BookingRepository;
import com.smartparking.util.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class BookingService {
    
    private static final ZoneId IST = ZoneId.of("Asia/Kolkata");

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ParkingLotService parkingLotService;
    
    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    // Parse ISO string (with or without Z) into IST LocalDateTime
    private LocalDateTime parseToIST(String isoString) {
        if (isoString == null) return null;
        // Ensure it ends with Z for proper UTC parsing
        String s = isoString.trim();
        if (!s.endsWith("Z") && !s.contains("+")) s = s + "Z";
        return Instant.parse(s).atZone(IST).toLocalDateTime();
    }
    
    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setParkingLotId(request.getParkingLotId());
        booking.setSlotId(request.getSlotId());
        booking.setBookingStartTime(parseToIST(request.getBookingStartTime()));
        booking.setBookingEndTime(parseToIST(request.getBookingEndTime()));
        booking.setStatus("ACTIVE");
        booking.setCreatedAt(LocalDateTime.now(IST));
        booking.setVehicleNumber(request.getVehicleNumber());
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Update slot status
        parkingLotService.updateSlotStatus(request.getParkingLotId(), request.getSlotId(), "BOOKED");
        
        // Generate QR code
        String qrCode = qrCodeGenerator.generateQRCode(savedBooking.getId());
        savedBooking.setQrCode(qrCode);
        
        return bookingRepository.save(savedBooking);
    }
    
    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking getBookingById(String bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Booking extendBooking(String bookingId, int extraHours) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!"ACTIVE".equals(booking.getStatus()))
            throw new RuntimeException("Only active bookings can be extended");
        booking.setBookingEndTime(booking.getBookingEndTime().plusHours(extraHours));
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(String bookingId) {        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("CANCELLED");
        
        // Release the slot
        parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
        
        return bookingRepository.save(booking);
    }
    
    public void autoReleaseExpiredBookings(int minutes) {
        List<Booking> expiredBookings = bookingRepository.findByStatusAndBookingEndTimeBefore("ACTIVE", LocalDateTime.now(IST));

        for (Booking booking : expiredBookings) {
            booking.setStatus("COMPLETED");
            bookingRepository.save(booking);
            parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
        }

        // Also reconcile: free any BOOKED slot that has no ACTIVE booking
        reconcileOrphanedSlots();
    }

    private void reconcileOrphanedSlots() {
        // Collect all slotIds that have an ACTIVE booking
        List<Booking> activeBookings = bookingRepository.findByStatus("ACTIVE");
        java.util.Set<String> activeSlotIds = new java.util.HashSet<>();
        for (Booking b : activeBookings) {
            activeSlotIds.add(b.getSlotId());
        }

        // For every parking lot, free any BOOKED slot not in the active set
        List<com.smartparking.model.ParkingLot> lots = parkingLotService.getAllParkingLots();
        for (com.smartparking.model.ParkingLot lot : lots) {
            for (com.smartparking.model.Slot slot : lot.getSlots()) {
                if ("BOOKED".equals(slot.getStatus()) && !activeSlotIds.contains(slot.getSlotId())) {
                    parkingLotService.updateSlotStatus(lot.getId(), slot.getSlotId(), "AVAILABLE");
                }
            }
        }
    }
}
