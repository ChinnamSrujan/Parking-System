package com.smartparking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "parkingLots")
public class ParkingLot {
    @Id
    private String id;
    private String locationName;
    private String address;
    private Integer totalSlots;
    private Integer availableSlots;
    private Double pricePerHour;
    private List<Slot> slots;
    
    public ParkingLot() {}
    
    public ParkingLot(String id, String locationName, String address, Integer totalSlots, 
                      Integer availableSlots, Double pricePerHour, List<Slot> slots) {
        this.id = id;
        this.locationName = locationName;
        this.address = address;
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.pricePerHour = pricePerHour;
        this.slots = slots;
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public Integer getTotalSlots() { return totalSlots; }
    public void setTotalSlots(Integer totalSlots) { this.totalSlots = totalSlots; }
    
    public Integer getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(Integer availableSlots) { this.availableSlots = availableSlots; }
    
    public Double getPricePerHour() { return pricePerHour; }
    public void setPricePerHour(Double pricePerHour) { this.pricePerHour = pricePerHour; }
    
    public List<Slot> getSlots() { return slots; }
    public void setSlots(List<Slot> slots) { this.slots = slots; }
}
