package com.example.userservice.controller;

import com.example.userservice.dto.UserCreateRequest;
import com.example.userservice.entity.User;
import com.example.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // POST /users
    @PostMapping
    public User createUser(@Valid @RequestBody UserCreateRequest request) {
        return userService.createUser(request);
    }

    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
