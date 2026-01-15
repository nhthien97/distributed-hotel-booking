package com.example.paymentservice.controller;

import com.example.paymentservice.entity.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final RestTemplate restTemplate;
    private final Random random = new Random();

    public PaymentController(PaymentRepository paymentRepository,
                             RestTemplate restTemplate) {
        this.paymentRepository = paymentRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public Payment pay(@RequestBody Payment payment) {

        boolean success = random.nextInt(10) < 7;

        if (success) {
            payment.setStatus("SUCCESS");
        } else {
            payment.setStatus("FAILED");
        }

        Payment savedPayment = paymentRepository.save(payment);

        // 🔗 GỌI BOOKING SERVICE
        String bookingServiceUrl = "http://localhost:8082/bookings/"
                + payment.getBookingId();

        if ("SUCCESS".equals(payment.getStatus())) {
            restTemplate.put(bookingServiceUrl + "/confirm", null);
        } else {
            restTemplate.put(bookingServiceUrl + "/fail", null);
        }

        return savedPayment;
    }
}
