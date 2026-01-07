package com.example.userservice.service;

import com.example.userservice.dto.UserCreateRequest;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ResourceAlreadyExistsException;
import com.example.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserCreateRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResourceAlreadyExistsException("Username already exists");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(), // sẽ hash ở Auth Service
                request.getRole()
        );

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
