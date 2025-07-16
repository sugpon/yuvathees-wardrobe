package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*; // Importing JPA annotations for entity mapping
import org.hibernate.annotations.CreationTimestamp; // Importing Hibernate annotations for automatic timestamping

import java.time.LocalDateTime;

@Entity
public class Subscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @CreationTimestamp
    @Column(name = "subscribed_at", updatable = false)
    private LocalDateTime subscribedAt;


    //Constructors
    public Subscriber() {
        // Default constructor is required by JPA
    }

    public Subscriber(Long id, String email, LocalDateTime subscribedAt) {
        this.id = id;
        this.email = email;
        this.subscribedAt = subscribedAt;
    }

    //Getters and Setters
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSubscribedAt(LocalDateTime subscribedAt) {
        this.subscribedAt = subscribedAt;
    }
}
