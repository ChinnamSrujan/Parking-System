package com.smartparking.repository;

import com.smartparking.model.ParkingLot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingLotRepository extends MongoRepository<ParkingLot, String> {
    List<ParkingLot> findByLocationNameContainingIgnoreCase(String locationName);
}
