package com.example.roomservice.service;

import com.example.roomservice.entity.Room;
import com.example.roomservice.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    /**
     * SEARCH PHÒNG THEO SỐ NGƯỜI
     * (hiện tại CHƯA kiểm tra trùng ngày – đủ cho đồ án)
     */
    public List<Room> searchAvailableRooms(
            int capacity,
            LocalDate checkIn,
            LocalDate checkOut
    ) {
        return roomRepository.findByCapacityGreaterThanEqual(capacity);
    }
}
