package com.example.paymentservice.controller;

import com.example.paymentservice.entity.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import com.example.paymentservice.dto.BookingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final RestTemplate restTemplate;
    private final Random random = new Random();

    public PaymentController(
            PaymentRepository paymentRepository,
            RestTemplate restTemplate
    ) {
        this.paymentRepository = paymentRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public ResponseEntity<?> pay(@RequestBody Payment payment) {

        // 1️⃣ LẤY BOOKING
        String bookingUrl =
    "http://localhost:8088/api/bookings/" + payment.getBookingId();


        BookingResponse booking;

        try {
            booking = restTemplate
                    .getForObject(bookingUrl, BookingResponse.class);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("❌ Booking không tồn tại");
        }

        // 2️⃣ CHECK TRẠNG THÁI BOOKING
        if ("CANCELLED".equals(booking.getStatus())) {
            return ResponseEntity
                    .badRequest()
                    .body("❌ Booking đã bị huỷ, không thể thanh toán");
        }

        if (!"PENDING_PAYMENT".equals(booking.getStatus())) {
            return ResponseEntity
                    .badRequest()
                    .body("❌ Booking không hợp lệ để thanh toán");
        }

        // 3️⃣ GIẢ LẬP THANH TOÁN
        boolean success = random.nextInt(10) < 7;
        payment.setStatus(success ? "SUCCESS" : "FAILED");

        Payment savedPayment = paymentRepository.save(payment);

        // 4️⃣ CẬP NHẬT BOOKING
        if (success) {
            restTemplate.put(bookingUrl + "/confirm", null);
        } else {
            restTemplate.put(bookingUrl + "/fail", null);
        }

        return ResponseEntity.ok(savedPayment);
    }
}
