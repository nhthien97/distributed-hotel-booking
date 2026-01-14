package com.example.bookingservice.controller;

import com.example.bookingservice.entity.Booking;
import com.example.bookingservice.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(
    origins = "https://ominous-trout-v67rqxvv9j4v2w7rr-5500.app.github.dev",
    allowedHeaders = "*"
)
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping(consumes = "application/json")
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
