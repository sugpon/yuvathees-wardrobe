package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.ContactInquiry;
import com.yuvatheeswardrobe.backend.repository.ContactInquiryRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contactinquiry")
public class ContactInquiryController extends AdminAccessController {

    private final ContactInquiryRepository contactInquiryRepository;

    public ContactInquiryController(ContactInquiryRepository contactInquiryRepository) {
        this.contactInquiryRepository = contactInquiryRepository;
    }

    // POST - submit inquiry (open for guests)
    @PostMapping
    public ResponseEntity<ContactInquiry> submitInquiry(@RequestBody ContactInquiry inquiry) {
        ContactInquiry saved = contactInquiryRepository.save(inquiry);
        return ResponseEntity.ok(saved);
    }

    // GET all inquiries - admin only
    @GetMapping
    public ResponseEntity<?> getAllInquiries(HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        List<ContactInquiry> inquiries = contactInquiryRepository.findAll();
        return ResponseEntity.ok(inquiries);
    }

    // GET inquiry by ID - admin only
    @GetMapping("/{id}")
    public ResponseEntity<?> getInquiryById(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        Optional<ContactInquiry> inquiry = contactInquiryRepository.findById(id);
        return inquiry.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT - admin only (update inquiry)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInquiry(@PathVariable int id, @RequestBody ContactInquiry inquiry, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        inquiry.setId(id);
        ContactInquiry updated = contactInquiryRepository.save(inquiry);
        return ResponseEntity.ok(updated);
    }

    // DELETE inquiry by ID - admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInquiry(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        if (contactInquiryRepository.existsById(id)) {
            contactInquiryRepository.deleteById(id);
            return ResponseEntity.ok("Contact inquiry deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
