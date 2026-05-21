package com.smartparking.service;

import com.smartparking.dto.BookingRequest;
import com.smartparking.model.Booking;
import com.smartparking.repository.BookingRepository;
import com.smartparking.util.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingLotService parkingLotService;

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    // Parse local datetime string (no timezone) — stored as-is
    // e.g. "2026-05-12T16:38:00" -> LocalDateTime 2026-05-12T16:38:00
    private LocalDateTime parseUTC(String isoString) {
        if (isoString == null) return null;
        String s = isoString.trim();
        // Strip Z or timezone if present
        if (s.endsWith("Z")) s = s.substring(0, s.length() - 1);
        if (s.contains("+")) s = s.substring(0, s.indexOf('+'));
        if (s.contains(".")) s = s.substring(0, s.indexOf('.'));
        return LocalDateTime.parse(s);
    }

    // Current time as UTC for scheduler and createdAt
    private LocalDateTime nowUTC() {
        return LocalDateTime.now(ZoneOffset.UTC);
    }    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setParkingLotId(request.getParkingLotId());
        booking.setSlotId(request.getSlotId());
        booking.setBookingStartTime(parseUTC(request.getBookingStartTime()));
        booking.setBookingEndTime(parseUTC(request.getBookingEndTime()));
        booking.setStatus("ACTIVE");
        booking.setCreatedAt(nowUTC());
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

    public Booking cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
        return bookingRepository.save(booking);
    }

    public void autoReleaseExpiredBookings(int minutes) {
        // Compare in UTC — times stored as UTC, 1 min buffer
        LocalDateTime nowUTC = nowUTC().minusMinutes(1);
        List<Booking> expiredBookings = bookingRepository.findByStatusAndBookingEndTimeBefore("ACTIVE", nowUTC);

        for (Booking booking : expiredBookings) {
            booking.setStatus("COMPLETED");
            bookingRepository.save(booking);
            parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
        }

        reconcileOrphanedSlots();
    }

    private void reconcileOrphanedSlots() {
        List<Booking> activeBookings = bookingRepository.findByStatus("ACTIVE");
        java.util.Set<String> activeSlotIds = new java.util.HashSet<>();
        for (Booking b : activeBookings) {
            activeSlotIds.add(b.getSlotId());
        }

        LocalDateTime twoMinsAgo = nowUTC().minusMinutes(2);
        List<com.smartparking.model.ParkingLot> lots = parkingLotService.getAllParkingLots();
        for (com.smartparking.model.ParkingLot lot : lots) {
            for (com.smartparking.model.Slot slot : lot.getSlots()) {
                if ("BOOKED".equals(slot.getStatus()) && !activeSlotIds.contains(slot.getSlotId())) {
                    boolean recentBookingExists = bookingRepository.findAll().stream()
                        .anyMatch(b -> b.getSlotId().equals(slot.getSlotId())
                            && b.getCreatedAt() != null
                            && b.getCreatedAt().isAfter(twoMinsAgo));
                    if (!recentBookingExists) {
                        parkingLotService.updateSlotStatus(lot.getId(), slot.getSlotId(), "AVAILABLE");
                    }
                }
            }
        }
    }
}
