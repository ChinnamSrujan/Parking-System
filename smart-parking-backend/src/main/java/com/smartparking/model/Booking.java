package com.smartparking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    private String userId;
    private String parkingLotId;
    private String slotId;
    private LocalDateTime bookingStartTime;
    private LocalDateTime bookingEndTime;
    private String status;
    private String paymentId;
    private String qrCode;
    private LocalDateTime createdAt;
    private String vehicleNumber;
    
    public Booking() {}
    
    public Booking(String id, String userId, String parkingLotId, String slotId,
                   LocalDateTime bookingStartTime, LocalDateTime bookingEndTime,
                   String status, String paymentId, String qrCode, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.parkingLotId = parkingLotId;
        this.slotId = slotId;
        this.bookingStartTime = bookingStartTime;
        this.bookingEndTime = bookingEndTime;
        this.status = status;
        this.paymentId = paymentId;
        this.qrCode = qrCode;
        this.createdAt = createdAt;
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
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
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    
    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }
}
