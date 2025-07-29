package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*;

@Entity
public class ShippingRates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing primary key
    private int id;
    @Column (nullable = false, length = 100) // Country cannot be null and limits to 100 characters
    private String country;
    @Column (nullable = false) // Cost per kg cannot be null
    private Double costPerKg;

    public ShippingRates() {
    }

    public ShippingRates(String country, Double costPerKg) {
        this.country = country;
        this.costPerKg = costPerKg;
    }

    public int getId() {
        return id;
    }

    public String getCountry() {
        return country;
    }

    public Double getCostPerKg() {
        return costPerKg;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCostPerKg(Double costPerKg) {
        this.costPerKg = costPerKg;
    }
}
