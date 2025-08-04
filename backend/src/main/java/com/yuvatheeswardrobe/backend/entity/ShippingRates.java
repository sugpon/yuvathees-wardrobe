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
    @Column
    private Double jewelrySurcharge;

    public ShippingRates() {
    }

    public ShippingRates(String country, Double costPerKg, Double jewelrySurcharge) {
        this.country = country;
        this.costPerKg = costPerKg;
        this.jewelrySurcharge = jewelrySurcharge; // Default value, can be set later
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

    public Double getJewelrySurcharge() {
        return jewelrySurcharge;
    }

    public void setJewelrySurcharge(Double jewelrySurcharge) {
        this.jewelrySurcharge = jewelrySurcharge;
    }
}