package com.smartparking.dto;

public class BookingRequest {
    private String userId;
    private String parkingLotId;
    private String slotId;
    private String bookingStartTime;
    private String bookingEndTime;
    private String vehicleNumber;
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getParkingLotId() { return parkingLotId; }
    public void setParkingLotId(String parkingLotId) { this.parkingLotId = parkingLotId; }
    
    public String getSlotId() { return slotId; }
    public void setSlotId(String slotId) { this.slotId = slotId; }
    
    public String getBookingStartTime() { return bookingStartTime; }
    public void setBookingStartTime(String bookingStartTime) { this.bookingStartTime = bookingStartTime; }
    
    public String getBookingEndTime() { return bookingEndTime; }
    public void setBookingEndTime(String bookingEndTime) { this.bookingEndTime = bookingEndTime; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }
}
