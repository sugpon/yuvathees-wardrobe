package com.yuvatheeswardrobe.backend.service;

import com.yuvatheeswardrobe.backend.entity.ShippingRates;
import com.yuvatheeswardrobe.backend.repository.ShippingRatesRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ShippingCalculator {

    private final ShippingRatesRepository shippingRatesRepository;

    @Value("${app.jewelry.surcharge}")
    private double jewelrySurcharge;

    public ShippingCalculator(ShippingRatesRepository shippingRatesRepository) {
        this.shippingRatesRepository = shippingRatesRepository;
    }

    public double calculateShipping(String country, double weight, boolean hasJewelry) {
        if("India".equalsIgnoreCase(country)) {
            // For India, no shipping charges
            return 0.0;
        }

        if (weight <= 0) {
            throw new IllegalArgumentException("Weight must be greater than zero.");
        }

        ShippingRates rate = shippingRatesRepository.findByCountry(country);
        if (rate == null) {
            throw new IllegalArgumentException("Shipping rate not found for country: " + country);
        }

        double total = rate.getCostPerKg() * weight;
        if (hasJewelry) {
            total += jewelrySurcharge;
        }

        return total;
    }
}
