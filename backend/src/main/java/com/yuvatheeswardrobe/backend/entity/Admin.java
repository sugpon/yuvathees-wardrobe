package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*; // Importing JPA annotations

@Entity
public class Admin {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (nullable = false, unique = true, length = 50) // Username cannot be null, must be unique, and limited to 50 characters
    private String username;
    @Column (nullable = false, length = 100) // Password cannot be null and limited to 100 characters
    private String password;
    @Column (nullable = false, length = 250) // Email cannot be null, must be unique, and limited to 100 characters
    private String email;


    public Admin() {
        // Default constructor is required by JPA
    }

    public Admin(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
