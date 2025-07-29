package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.Subscriber;
import com.yuvatheeswardrobe.backend.repository.SubscriberRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subscriber")
public class SubscriberController extends AdminAccessController {

    private final SubscriberRepository subscriberRepository;

    public SubscriberController(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    // GET all subscribers - admin only
    @GetMapping
    public ResponseEntity<?> getAllSubscribers(HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        List<Subscriber> subscribers = subscriberRepository.findAll();
        return ResponseEntity.ok(subscribers);
    }

    // GET subscriber by ID - admin only
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubscriberById(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        Optional<Subscriber> subscriber = subscriberRepository.findById(id);
        return subscriber.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT or POST new subscriber - open for guests (no admin check)
    @PutMapping
    public ResponseEntity<Subscriber> saveOrUpdateSubscriber(@RequestBody Subscriber subscriber) {
        Subscriber saved = subscriberRepository.save(subscriber);
        return ResponseEntity.ok(saved);
    }

    // DELETE subscriber by ID - admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscriber(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        if (subscriberRepository.existsById(id)) {
            subscriberRepository.deleteById(id);
            return ResponseEntity.ok("Subscriber deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
