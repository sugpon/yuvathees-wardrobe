package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ContactInquiry {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY) // Auto-incrementing primary key
    private int id;
    @Column (nullable = false, length = 100) // Name cannot be null and limits to 100 characters
    private String name;
    @Column (nullable = false, length = 250) // Email cannot be null, limits to 255 characters
    private String email;
    @Column (nullable = false, length = 150) // Subject cannot be null and limits to 150 characters
    private String subject;
    @Column (columnDefinition = "TEXT") // Allows for longer messages
    private String message;
    @Column (name = "received_at", updatable = false) // Column for the timestamp when the inquiry was received
    private LocalDateTime received_at;

    public ContactInquiry() {
    }

    public ContactInquiry(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.received_at = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getReceived_at() {
        return received_at;
    }

    public void setId(int id) { this.id = id;}

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @PrePersist
    protected void onCreate() {
        if (this.received_at == null) {
            this.received_at = LocalDateTime.now();
        }
    }

}
