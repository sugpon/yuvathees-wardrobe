package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.Category;
import com.yuvatheeswardrobe.backend.repository.CategoryRepository;
import jakarta.servlet.http.HttpSession;
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

    // GET all categories - open for everyone (no session required)
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // GET category by ID - open for everyone (no session required)
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - admin only (requires session to check admin logged in)
    @PostMapping
    public ResponseEntity<?> postCategory(@RequestBody Category category, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(saved);
    }

    // PUT - admin only (requires session)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody Category category, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        category.setId(id);
        Category updated = categoryRepository.save(category);
        return ResponseEntity.ok(updated);
    }

    // DELETE - admin only (requires session)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id, HttpSession session) {
        ResponseEntity<?> authCheck = checkAdminLoggedIn(session);
        if (authCheck != null) return authCheck;

        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Category deleted successfully");
    }
}
