package com.inventory.management.services;

import com.inventory.management.models.User;
import com.inventory.management.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered";
        }
        userRepository.save(user);
        return "Registered successfully";
    }

    public String loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return "Login successful";
        }
        return "Invalid credentials";
    }

    public String getNameByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getName)
                .orElse("User");
    }

}
