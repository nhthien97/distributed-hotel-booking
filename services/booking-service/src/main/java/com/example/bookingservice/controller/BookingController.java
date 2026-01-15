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

    // ✅ TẠO BOOKING
    @PostMapping(consumes = "application/json")
public Booking createBooking(@RequestBody Booking booking) {

    booking.setStatus("CONFIRMED");

    // ⚠️ TẠM THỜI GÁN USER (vì chưa decode JWT)
    if (booking.getUserEmail() == null) {
        booking.setUserEmail("demo@user.com");
    }

    return bookingRepository.save(booking);
}

    // ✅ ADMIN: XEM TẤT CẢ BOOKING
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ USER: XEM BOOKING THEO EMAIL
    @GetMapping("/user")
    public List<Booking> getBookingsByUser(@RequestParam String email) {
        return bookingRepository.findByUserEmail(email);
    }
    // ❌ USER HỦY BOOKING
@PutMapping("/{id}/cancel")
public Booking cancelBooking(@PathVariable Long id) {

    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    booking.setStatus("CANCELLED");
    return bookingRepository.save(booking);
}

}
