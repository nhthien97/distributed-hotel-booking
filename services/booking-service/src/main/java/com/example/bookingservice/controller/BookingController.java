package com.example.bookingservice.controller;

import com.example.bookingservice.entity.Booking;
import com.example.bookingservice.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        // 🔒 Distributed Lock (PSEUDO – Redis)
        // Key: room:{roomId}:{checkIn}
        // if exists -> reject
        // else -> save booking -> release lock

        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }

    // ✅ API CHO ADMIN XEM TẤT CẢ BOOKING
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
