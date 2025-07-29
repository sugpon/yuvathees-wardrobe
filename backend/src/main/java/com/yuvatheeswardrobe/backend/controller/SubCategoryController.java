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

    // GET all subcategories (open access)
    @GetMapping
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    // GET subcategory by ID (open access)
    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable int id) {
        Optional<SubCategory> subCategory = subCategoryRepository.findById(id);
        return subCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST new subcategory - requires Admin login
    @PostMapping
    public ResponseEntity<?> postSubCategory(@RequestBody SubCategory subCategory, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session); // Use inherited method from AdminAccessController
        if (authCheck != null) return authCheck;

        SubCategory savedSubCategory = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(savedSubCategory);
    }

    // PUT (update) subcategory - requires Admin login
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubCategory(@PathVariable int id, @RequestBody SubCategory subCategory, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        subCategory.setId(id);
        SubCategory updatedSubCategory = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(updatedSubCategory);
    }

    // DELETE subcategory - requires Admin login
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubCategory(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        subCategoryRepository.deleteById(id);
        return ResponseEntity.ok("SubCategory with ID " + id + " deleted successfully.");
    }
}
