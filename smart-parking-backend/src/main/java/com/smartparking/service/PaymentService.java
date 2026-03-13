package com.smartparking.service;

import com.smartparking.dto.PaymentRequest;
import com.smartparking.model.Booking;
import com.smartparking.model.Payment;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private StripeService stripeService;
    
    public Map<String, String> createPaymentIntent(PaymentRequest request) throws StripeException {
        // Create Stripe Payment Intent
        return stripeService.createPaymentIntent(
            request.getAmount(),
            "usd", // or get from request
            request.getBookingId()
        );
    }
    
    public Payment processPayment(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setBookingId(request.getBookingId());
        payment.setUserId(request.getUserId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");
        payment.setTransactionId(request.getTransactionId() != null ? request.getTransactionId() : "STRIPE_" + System.currentTimeMillis());
        payment.setPaymentTime(LocalDateTime.now());
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update booking with payment ID
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setPaymentId(savedPayment.getId());
        bookingRepository.save(booking);
        
        return savedPayment;
    }
    
    public List<Payment> getPaymentsByUserId(String userId) {
        return paymentRepository.findByUserId(userId);
    }
}
