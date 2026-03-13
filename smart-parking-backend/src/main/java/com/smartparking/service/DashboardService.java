package com.smartparking.service;

import com.smartparking.model.Booking;
import com.smartparking.model.Payment;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.PaymentRepository;
import com.smartparking.repository.ParkingLotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private ParkingLotRepository parkingLotRepository;
    
    public Map<String, Object> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        List<Booking> allBookings = bookingRepository.findAll();
        List<Payment> allPayments = paymentRepository.findAll();
        
        // Total bookings
        analytics.put("totalBookings", allBookings.size());
        
        // Active bookings
        long activeBookings = allBookings.stream()
                .filter(b -> "ACTIVE".equals(b.getStatus()))
                .count();
        analytics.put("activeBookings", activeBookings);
        
        // Total revenue
        double totalRevenue = allPayments.stream()
                .mapToDouble(Payment::getAmount)
                .sum();
        analytics.put("totalRevenue", totalRevenue);
        
        // Today's bookings
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        long todayBookings = allBookings.stream()
                .filter(b -> b.getCreatedAt().isAfter(startOfDay))
                .count();
        analytics.put("todayBookings", todayBookings);
        
        // Parking utilization rate
        int totalSlots = parkingLotRepository.findAll().stream()
                .mapToInt(pl -> pl.getTotalSlots())
                .sum();
        int availableSlots = parkingLotRepository.findAll().stream()
                .mapToInt(pl -> pl.getAvailableSlots())
                .sum();
        double utilizationRate = totalSlots > 0 ? ((double)(totalSlots - availableSlots) / totalSlots) * 100 : 0;
        analytics.put("utilizationRate", utilizationRate);
        
        return analytics;
    }
}
