package com.inventory.management.controllers;

import com.inventory.management.models.User;
import com.inventory.management.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if the email already exists
        String result = userService.registerUser(user);
        if (result.equals("Email already exists")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String result = userService.loginUser(user.getEmail(), user.getPassword());
        if (result.equals("Invalid credentials")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
        return ResponseEntity.ok(result);
    }

    // Fetch username by email
    @GetMapping("/username")
    public ResponseEntity<String> getUsername(@RequestParam String email) {
        System.out.println("Email: "+ email);
        String username = userService.getNameByEmail(email);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(username);
    }
}
