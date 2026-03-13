package com.smartparking.service;

import com.smartparking.dto.BookingRequest;
import com.smartparking.model.Booking;
import com.smartparking.repository.BookingRepository;
import com.smartparking.util.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ParkingLotService parkingLotService;
    
    @Autowired
    private QRCodeGenerator qrCodeGenerator;
    
    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setParkingLotId(request.getParkingLotId());
        booking.setSlotId(request.getSlotId());
        booking.setBookingStartTime(request.getBookingStartTime());
        booking.setBookingEndTime(request.getBookingEndTime());
        booking.setStatus("ACTIVE");
        booking.setCreatedAt(LocalDateTime.now());
        
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
    
    public Booking cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("CANCELLED");
        
        // Release the slot
        parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
        
        return bookingRepository.save(booking);
    }
    
    public void autoReleaseExpiredBookings(int minutes) {
        LocalDateTime threshold = LocalDateTime.now().minusMinutes(minutes);
        List<Booking> expiredBookings = bookingRepository.findByStatusAndCreatedAtBefore("ACTIVE", threshold);
        
        for (Booking booking : expiredBookings) {
            if (booking.getPaymentId() == null) {
                booking.setStatus("CANCELLED");
                bookingRepository.save(booking);
                parkingLotService.updateSlotStatus(booking.getParkingLotId(), booking.getSlotId(), "AVAILABLE");
            }
        }
    }
}
