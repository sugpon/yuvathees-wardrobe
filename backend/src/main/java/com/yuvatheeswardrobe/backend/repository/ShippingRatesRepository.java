package com.yuvatheeswardrobe.backend.repository;

import com.yuvatheeswardrobe.backend.entity.ShippingRates; // Importing the ShippingRates entity
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface ShippingRatesRepository extends JpaRepository<ShippingRates, Integer>{ // Extending JpaRepository to provide CRUD operations for ShippingRates entity
    // Additional query methods can be defined here if needed
    ShippingRates findByCountry(String country); // Custom method to find shipping rates by country
}
