package com.example.bookingservice.dto;

public class RoomResponse {

    private Long id;
    private String name;
    private int capacity;
    private double price;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public double getPrice() {
        return price;
    }
}
