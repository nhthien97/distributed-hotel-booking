package com.example.userservice.service;

import com.example.userservice.dto.UserCreateRequest;
import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE USER (REGISTER)
    public User createUser(UserCreateRequest request) {

    // ✅ check email trùng
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already exists");
    }

    // ✅ check username trùng
    if (userRepository.findAll().stream()
            .anyMatch(u -> u.getUsername().equals(request.getUsername()))) {
        throw new RuntimeException("Username already exists");
    }

    String encodedPassword = passwordEncoder.encode(request.getPassword());

    User user = new User(
            request.getUsername(),
            request.getEmail(),
            encodedPassword,
            "CUSTOMER"
    );

    return userRepository.save(user);
}


    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY EMAIL (FOR AUTH-SERVICE)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
