package com.smartparking.model;

public class Slot {
    private String slotId;
    private String slotNumber;
    private String status;
    
    public Slot() {}
    
    public Slot(String slotId, String slotNumber, String status) {
        this.slotId = slotId;
        this.slotNumber = slotNumber;
        this.status = status;
    }
    
    public String getSlotId() { return slotId; }
    public void setSlotId(String slotId) { this.slotId = slotId; }
    
    public String getSlotNumber() { return slotNumber; }
    public void setSlotNumber(String slotNumber) { this.slotNumber = slotNumber; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
