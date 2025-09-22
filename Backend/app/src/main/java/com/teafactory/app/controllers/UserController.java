package com.teafactory.app.controllers;

import com.teafactory.app.model.User;
import com.teafactory.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // React app runs on 5173
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword()) &&
                existingUser.getRole().equals(user.getRole())) {
            return ResponseEntity.ok("Login successful");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

}
