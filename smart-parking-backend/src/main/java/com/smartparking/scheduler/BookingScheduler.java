package com.smartparking.scheduler;

import com.smartparking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BookingScheduler {
    
    @Autowired
    private BookingService bookingService;
    
    @Value("${booking.auto-release-minutes}")
    private int autoReleaseMinutes;
    
    @Scheduled(fixedRate = 60000) // Run every 1 minute
    public void autoReleaseExpiredBookings() {
        bookingService.autoReleaseExpiredBookings(autoReleaseMinutes);
    }
}
