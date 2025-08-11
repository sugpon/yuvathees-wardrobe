package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*; // Importing JPA annotations for entity mapping
import org.hibernate.annotations.CreationTimestamp; // Importing Hibernate annotations for automatic timestamping

import java.time.LocalDateTime;

@Entity
public class Subscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String email;

    @CreationTimestamp // Automatically sets the timestamp when the entity is created
    @Column(name = "subscribed_at", updatable = false)
    private LocalDateTime subscribedAt;


    //Constructors
    public Subscriber() {
        // Default constructor is required by JPA
    }

    public Subscriber(String email, LocalDateTime subscribedAt) {
        this.email = email;
        this.subscribedAt = subscribedAt;
    }

    //Getters and Setters
    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSubscribedAt(LocalDateTime subscribedAt) {
        this.subscribedAt = subscribedAt;
    }
}
