package com.yuvatheeswardrobe.backend.controller;

import org.springframework.beans.factory.annotation.Value; // Importing Value for injecting properties
import org.springframework.http.HttpStatus; // Importing HttpStatus for HTTP status codes
import org.springframework.http.ResponseEntity; // Importing ResponseEntity for HTTP responses
import org.springframework.web.bind.annotation.*; // Importing necessary annotations for REST controller

import java.util.Map; // Importing Map for handling request bodies

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${admin.username}")
    private String adminUsername; // Use @Value to inject admin credentials from properties file or environment variables

    @Value("${admin.password}")
    private String adminPassword; // Use @Value to inject admin credentials from properties file or environment variables

    private static boolean isLoggedIn = false; // Static variable to track login status

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username"); // Extract username from request body
        String password = credentials.get("password"); // Extract password from request body

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            isLoggedIn = true; // Set login status to true
            return ResponseEntity.ok(Map.of("message", "Welcome Admin!")); // Return success message for valid credentials
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials/ Please Use Guest Mode!")); // Return unauthorized status for invalid credentials
    }

    // Static method to expose login status for other controllers to check
    public static boolean isAdminLoggedIn() {
        return isLoggedIn; // Return the current login status
    }
}