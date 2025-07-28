package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.SubCategory;
import com.yuvatheeswardrobe.backend.repository.SubCategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {

    private final SubCategoryRepository subCategoryRepository; // Repository for CRUD operations on SubCategory
    // Constructor injection for SubCategoryRepository
    // This allows Spring to inject the SubCategoryRepository dependency when creating an instance of SubCategory
    public SubCategoryController(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository; // Initializing the subCategoryRepository
    }

    @GetMapping
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable int id) {
        return subCategoryRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SubCategory postSubCategory(@RequestBody SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    @PutMapping("/{id}")
    public SubCategory updateSubCategory(@PathVariable int id, @RequestBody SubCategory subCategory) {
        subCategory.setId(id);
        return subCategoryRepository.save(subCategory);
    }

    @DeleteMapping("/{id}")
    public void deleteSubCategory(@PathVariable int id) {
        subCategoryRepository.deleteById(id);
    }
}
