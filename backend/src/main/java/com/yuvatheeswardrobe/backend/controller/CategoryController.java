package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.Category;
import com.yuvatheeswardrobe.backend.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController extends AdminAccessController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // GET all categories - open for everyone
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // GET category by ID - open for everyone
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // Return 404 if category not found
    }

    // POST - admin only
    @PostMapping
    public ResponseEntity<?> postCategory(@RequestBody Category category) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn();
        if (authCheck != null) return authCheck; // Check if admin is logged in

        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(saved);
    }

    // PUT - admin only
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody Category category) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn();
        if (authCheck != null) return authCheck;

        category.setId(id);
        Category updated = categoryRepository.save(category);
        return ResponseEntity.ok(updated);
    }

    // DELETE - admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn();
        if (authCheck != null) return authCheck;

        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Category deleted successfully");
    }
}
