package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.ShippingRates;
import com.yuvatheeswardrobe.backend.repository.ShippingRatesRepository;
import com.yuvatheeswardrobe.backend.service.ShippingCalculator;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shipping")
@CrossOrigin(origins = "http://localhost:5173") // Adjust as needed for your frontend
public class ShippingRatesController extends AdminAccessController {

    private final ShippingRatesRepository shippingRatesRepository;
    //private final ShippingCalculator shippingCalculator;

    public ShippingRatesController(ShippingRatesRepository shippingRatesRepository) {
        this.shippingRatesRepository = shippingRatesRepository;
        //this.shippingCalculator = shippingCalculator;
    }

    // GET all shipping rates - open for all
    @GetMapping("/rates")
    public ResponseEntity<List<ShippingRates>> getAllShippingRates() {
        return ResponseEntity.ok(shippingRatesRepository.findAll());
    }

    // GET shipping rate by ID - open for all
    @GetMapping("/rates/{id}")
    public ResponseEntity<ShippingRates> getShippingRateById(@PathVariable int id) {
        return shippingRatesRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - admin only
    @PostMapping("/rates")
    public ResponseEntity<?> createShippingRate(@RequestBody ShippingRates shippingRate, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        ShippingRates savedRate = shippingRatesRepository.save(shippingRate);
        return ResponseEntity.status(201).body(savedRate);
    }

    // PUT - admin only
    @PutMapping("/rates/{id}")
    public ResponseEntity<?> updateShippingRate(@PathVariable int id,
                                                @RequestBody ShippingRates updatedRate,
                                                HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        Optional<ShippingRates> optionalRate = shippingRatesRepository.findById(id);
        if (optionalRate.isPresent()) {
            ShippingRates existingRate = optionalRate.get();
            existingRate.setCountry(updatedRate.getCountry());
            existingRate.setCostPerKg(updatedRate.getCostPerKg());
            ShippingRates saved = shippingRatesRepository.save(existingRate);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - admin only
    @DeleteMapping("/rates/{id}")
    public ResponseEntity<?> deleteShippingRate(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        if (shippingRatesRepository.existsById(id)) {
            shippingRatesRepository.deleteById(id);
            return ResponseEntity.ok("Shipping rate deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    // POST /calculate - open for all, no auth needed
//    @PostMapping("/calculate")
//    public ResponseEntity<Double> calculateShippingCost(
//        @RequestParam String country,
//        @RequestParam double weight,
//        @RequestParam(required = false, defaultValue = "false") boolean hasJewelry
//    ) {
//    try {
//        double totalCost = shippingCalculator.calculateShipping(country, weight, hasJewelry);
//        return ResponseEntity.ok(totalCost);
//    } catch (IllegalArgumentException e) {
//        return ResponseEntity.badRequest().build();
//    }
//    }
}