package com.example.paymentservice.dto;

public class BookingResponse {

    private Long id;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {   // ✅ THÊM
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) { // ✅ THÊM
        this.status = status;
    }
}
