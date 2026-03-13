package com.smartparking.config;

import com.smartparking.model.ParkingLot;
import com.smartparking.model.Slot;
import com.smartparking.model.User;
import com.smartparking.repository.ParkingLotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ParkingLotRepository parkingLotRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Seed users if not exists
        if (userRepository.count() == 0) {
            seedUsers();
        }
        
        // Seed parking lots if not exists
        if (parkingLotRepository.count() == 0) {
            seedParkingLots();
        }
    }
    
    private void seedUsers() {
        // Create admin user
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@smartparking.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setPhone("1234567890");
        admin.setRole("ADMIN");
        admin.setCreatedAt(LocalDateTime.now());
        userRepository.save(admin);
        
        // Create test user
        User user = new User();
        user.setName("Test User");
        user.setEmail("user@smartparking.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setPhone("0987654321");
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        System.out.println("✓ Seeded users");
    }
    
    private void seedParkingLots() {
        // Downtown Parking
        ParkingLot downtown = createParkingLot(
            "Downtown Parking Plaza",
            "123 Main Street, Downtown",
            30,
            5.0
        );
        parkingLotRepository.save(downtown);
        
        // Airport Parking
        ParkingLot airport = createParkingLot(
            "Airport Long-term Parking",
            "Airport Road, Terminal 2",
            50,
            3.5
        );
        parkingLotRepository.save(airport);
        
        // Mall Parking
        ParkingLot mall = createParkingLot(
            "City Mall Parking",
            "456 Shopping Boulevard",
            40,
            4.0
        );
        parkingLotRepository.save(mall);
        
        System.out.println("✓ Seeded parking lots");
    }
    
    private ParkingLot createParkingLot(String name, String address, int totalSlots, double price) {
        ParkingLot lot = new ParkingLot();
        lot.setLocationName(name);
        lot.setAddress(address);
        lot.setTotalSlots(totalSlots);
        lot.setAvailableSlots(totalSlots);
        lot.setPricePerHour(price);
        
        List<Slot> slots = new ArrayList<>();
        for (int i = 1; i <= totalSlots; i++) {
            Slot slot = new Slot();
            slot.setSlotId("slot-" + name.replaceAll(" ", "-").toLowerCase() + "-" + i);
            slot.setSlotNumber("A" + i);
            slot.setStatus("AVAILABLE");
            slots.add(slot);
        }
        lot.setSlots(slots);
        
        return lot;
    }
}
