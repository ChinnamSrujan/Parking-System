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
        try {
            // Seed users if not exists
            if (userRepository.count() == 0) {
                seedUsers();
            }

            // Seed parking lots if not exists
            long lotCount = parkingLotRepository.count();
            if (lotCount == 0) {
                seedParkingLots();
            } else if (lotCount < 7) {
                parkingLotRepository.deleteAll();
                seedParkingLots();
            }
        } catch (Exception e) {
            System.err.println("⚠ DataSeeder skipped due to error: " + e.getMessage());
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
        // 1. Phoenix Marketcity Mall
        parkingLotRepository.save(createParkingLot(
            "Phoenix Marketcity Mall",
            "Whitefield Main Road, Mahadevapura, Bengaluru - 560048",
            60, 4.0, "B"
        ));

        // 2. Nexus Mall
        parkingLotRepository.save(createParkingLot(
            "Nexus Shantiniketan Mall",
            "ITPL Main Road, Whitefield, Bengaluru - 560066",
            50, 3.5, "C"
        ));

        // 3. Forum Mall
        parkingLotRepository.save(createParkingLot(
            "Forum Value Mall",
            "Whitefield Road, Mahadevapura, Bengaluru - 560048",
            45, 3.0, "D"
        ));

        // 4. PVR Cinemas
        parkingLotRepository.save(createParkingLot(
            "PVR Cinemas - Orion Mall",
            "Dr. Rajkumar Road, Rajajinagar, Bengaluru - 560010",
            40, 5.0, "E"
        ));

        // 5. INOX Multiplex
        parkingLotRepository.save(createParkingLot(
            "INOX Multiplex - Garuda Mall",
            "Magrath Road, Ashok Nagar, Bengaluru - 560025",
            35, 5.0, "F"
        ));

        // 6. Lulu Mall
        parkingLotRepository.save(createParkingLot(
            "Lulu Mall Parking",
            "Sarjapur Main Road, Bellandur, Bengaluru - 560103",
            70, 4.5, "G"
        ));

        // 7. Cinepolis - Elements Mall
        parkingLotRepository.save(createParkingLot(
            "Cinepolis - Elements Mall",
            "Thanisandra Main Road, Nagawara, Bengaluru - 560045",
            40, 4.0, "H"
        ));

        System.out.println("✓ Seeded 7 parking lots");
    }

    private ParkingLot createParkingLot(String name, String address, int totalSlots, double price, String prefix) {
        ParkingLot lot = new ParkingLot();
        lot.setLocationName(name);
        lot.setAddress(address);
        lot.setTotalSlots(totalSlots);
        lot.setAvailableSlots(totalSlots);
        lot.setPricePerHour(price);

        List<Slot> slots = new ArrayList<>();
        for (int i = 1; i <= totalSlots; i++) {
            Slot slot = new Slot();
            slot.setSlotId("slot-" + name.replaceAll("[^a-zA-Z0-9]", "-").toLowerCase() + "-" + i);
            slot.setSlotNumber(prefix + i);
            slot.setStatus("AVAILABLE");
            slots.add(slot);
        }
        lot.setSlots(slots);
        return lot;
    }
}
