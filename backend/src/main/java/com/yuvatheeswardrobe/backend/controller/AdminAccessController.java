package com.yuvatheeswardrobe.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus; // Importing HttpStatus for HTTP status codes
import org.springframework.http.ResponseEntity; // Importing ResponseEntity for HTTP responses

public abstract class AdminAccessController {

    protected ResponseEntity<?> checkAdminLoggedIn(HttpSession session) {
        if (!AuthController.isAdminLoggedIn()) { // Check if the admin is logged in using the static method from AuthController
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Admin login required"); // Return an unauthorized response if admin is not logged in
        }
        return null; // means admin is logged in, proceed
    }
}