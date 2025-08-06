package com.yuvatheeswardrobe.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties; // Importing ConfigurationProperties to bind properties from application.properties or application.yml
import org.springframework.stereotype.Component; // Importing Component to register this class as a Spring bean

@Component
@ConfigurationProperties(prefix = "admin")
public class AdminCredentials {

    private String username;
    private String password;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
