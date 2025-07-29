package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.SubCategory;
import com.yuvatheeswardrobe.backend.repository.SubCategoryRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subcategory")
public class SubCategoryController extends AdminAccessController {

    private final SubCategoryRepository subCategoryRepository;

    // Constructor-based dependency injection
    public SubCategoryController(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    // GET all subcategories
    @GetMapping
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    // GET subcategory by ID
    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable int id) {
        Optional<SubCategory> subCategory = subCategoryRepository.findById(id);
        return subCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST new subcategory - requires Admin login
    @PostMapping
    public ResponseEntity<?> postSubCategory(@RequestBody SubCategory subCategory, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(); // Check if admin is logged in using the method from AdminAccessController
        if (authCheck != null) return authCheck; // Check if admin is logged in
        SubCategory savedSubCategory = subCategoryRepository.save(subCategory); // Save the new subcategory
        return ResponseEntity.ok(savedSubCategory); // Return the saved subcategory
    }

    // PUT (update) subcategory - requires Admin login
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubCategory(@PathVariable int id, @RequestBody SubCategory subCategory, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(); // Check if admin is logged in using the method from AdminAccessController
        if (authCheck != null) return authCheck; // Check if admin is logged in
        subCategory.setId(id); // Set the ID of the subcategory to update
        SubCategory updatedSubCategory = subCategoryRepository.save(subCategory); // Save the updated subcategory
        return ResponseEntity.ok(updatedSubCategory); // Return the updated subcategory
    }

    // DELETE subcategory - requires Admin login
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubCategory(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(); // Check if admin is logged in using the method from AdminAccessController
        if (authCheck != null) return authCheck; // Check if admin is logged in
        subCategoryRepository.deleteById(id); // Delete the subcategory by ID
        return ResponseEntity.ok("SubCategory with ID " + id + " deleted successfully."); // Return a success message
    }
}
