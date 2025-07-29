package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.ShippingRates;
import com.yuvatheeswardrobe.backend.repository.ShippingRatesRepository;
import com.yuvatheeswardrobe.backend.service.ShippingCalculator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shipping")
@CrossOrigin(origins = "*")
public class ShippingRatesController {

    private final ShippingRatesRepository shippingRatesRepository;
    private final ShippingCalculator shippingCalculator;

    public ShippingRatesController(ShippingRatesRepository shippingRatesRepository,
                                   ShippingCalculator shippingCalculator) {
        this.shippingRatesRepository = shippingRatesRepository;
        this.shippingCalculator = shippingCalculator;
    }

    @PostMapping("/rates")
    public ResponseEntity<ShippingRates> createShippingRate(@RequestBody ShippingRates shippingRate) {
        ShippingRates savedRate = shippingRatesRepository.save(shippingRate);
        return ResponseEntity.status(201).body(savedRate);
    }

    @GetMapping("/rates")
    public ResponseEntity<List<ShippingRates>> getAllShippingRates() {
        return ResponseEntity.ok(shippingRatesRepository.findAll());
    }

    @GetMapping("/rates/{id}")
    public ResponseEntity<ShippingRates> getShippingRateById(@PathVariable int id) {
        return shippingRatesRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/rates/{id}")
    public ResponseEntity<ShippingRates> updateShippingRate(@PathVariable int id, @RequestBody ShippingRates updatedRate) {
        Optional<ShippingRates> optionalRate = shippingRatesRepository.findById(id);
        if (optionalRate.isPresent()) {
            ShippingRates existingRate = optionalRate.get();
            existingRate.setCountry(updatedRate.getCountry());
            existingRate.setCostPerKg(updatedRate.getCostPerKg());
            return ResponseEntity.ok(shippingRatesRepository.save(existingRate));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/rates/{id}")
    public ResponseEntity<Void> deleteShippingRate(@PathVariable int id) {
        if (shippingRatesRepository.existsById(id)) {
            shippingRatesRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/calculate")
    public ResponseEntity<Double> calculateShippingCost(
            @RequestParam String country,
            @RequestParam double weight,
            @RequestParam boolean hasJewelry
    ) {
        try {
            double totalCost = shippingCalculator.calculateShipping(country, weight, hasJewelry);
            return ResponseEntity.ok(totalCost);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
