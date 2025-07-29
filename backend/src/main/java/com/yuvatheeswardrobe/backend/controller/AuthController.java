package com.yuvatheeswardrobe.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${admin.username}")
    private String adminUsername; // Use @Value to inject admin credentials from properties file or environment variables

    @Value("${admin.password}")
    private String adminPassword; // Use @Value to inject admin credentials from properties file or environment variables

    private static boolean isLoggedIn = false;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            isLoggedIn = true;
            return ResponseEntity.ok(Map.of("message", "Welcome Admin!"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials/ Please Use Guest Mode!"));
    }

    // Logoff endpoint
    @PostMapping("/logoff")
    public ResponseEntity<?> logoff() {
        isLoggedIn = false;
        return ResponseEntity.ok(Map.of("message", "Logged off successfully"));
    }

    // Status check endpoint (optional)
    @GetMapping("/status")
    public ResponseEntity<?> status() {
        return ResponseEntity.ok(Map.of("isLoggedIn", isLoggedIn));
    }

    // Static method to expose login status for other controllers to check
    public static boolean isAdminLoggedIn() {
        return isLoggedIn;
    }
}
