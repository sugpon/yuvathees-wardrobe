package com.yuvatheeswardrobe.backend.repository;

import com.yuvatheeswardrobe.backend.entity.ShippingRates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingRatesRepository extends JpaRepository<ShippingRates, Integer> {
    ShippingRates findByCountry(String country);
}
