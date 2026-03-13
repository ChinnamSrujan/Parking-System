package com.smartparking.dto;

import java.time.LocalDateTime;

public class BookingRequest {
    private String userId;
    private String parkingLotId;
    private String slotId;
    private LocalDateTime bookingStartTime;
    private LocalDateTime bookingEndTime;
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getParkingLotId() { return parkingLotId; }
    public void setParkingLotId(String parkingLotId) { this.parkingLotId = parkingLotId; }
    
    public String getSlotId() { return slotId; }
    public void setSlotId(String slotId) { this.slotId = slotId; }
    
    public LocalDateTime getBookingStartTime() { return bookingStartTime; }
    public void setBookingStartTime(LocalDateTime bookingStartTime) { this.bookingStartTime = bookingStartTime; }
    
    public LocalDateTime getBookingEndTime() { return bookingEndTime; }
    public void setBookingEndTime(LocalDateTime bookingEndTime) { this.bookingEndTime = bookingEndTime; }
}
