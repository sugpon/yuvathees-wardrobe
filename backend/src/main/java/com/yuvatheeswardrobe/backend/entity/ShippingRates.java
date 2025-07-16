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
    private Double cost_per_kg;
    @Column (nullable = false) // Jewelry surcharge cannot be null
    private Double jewelry_surcharge;

    public ShippingRates() {
    }

    public ShippingRates(String country, Double cost_per_kg, Double jewelry_surcharge) {
        this.country = country;
        this.cost_per_kg = cost_per_kg;
        this.jewelry_surcharge = jewelry_surcharge;
    }

    public int getId() {
        return id;
    }

    public String getCountry() {
        return country;
    }

    public Double getCost_per_kg() {
        return cost_per_kg;
    }

    public Double getJewelry_surcharge() {
        return jewelry_surcharge;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCost_per_kg(Double cost_per_kg) {
        this.cost_per_kg = cost_per_kg;
    }

    public void setJewelry_surcharge(Double jewelry_surcharge) {
        this.jewelry_surcharge = jewelry_surcharge;
    }
}
