package com.yuvatheeswardrobe.backend.controller;

import com.yuvatheeswardrobe.backend.entity.Category; // Importing the Category entity
import com.yuvatheeswardrobe.backend.repository.CategoryRepository; // Importing the CategoryRepository for CRUD operations
import org.springframework.web.bind.annotation.*; // Importing necessary Spring annotations for RESTful web services
import java.util.List; // Importing List for returning multiple categories

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    // Constructor injection for CategoryRepository
    public CategoryController(CategoryRepository categoryRepository) { // Constructor to inject the CategoryRepository dependency
        this.categoryRepository = categoryRepository; // Initializing the categoryRepository
    }

    //GET all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //GET a single category by ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable int id) {
        return categoryRepository.findById(id).orElse(null); // Fetching a category by its ID, returning null if not found
    }

    //POST - create new category
    @PostMapping
    public Category postCategory(@RequestBody Category category) {
        return categoryRepository.save(category); // Saving the new category to the repository
    }

    //PUT - update category by ID
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable int id, @RequestBody Category category) {
        category.setId(id); // force the ID to be what's in the path
        return categoryRepository.save(category); // Saving the updated category to the repository
    }

    //DELETE category by ID
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable int id) {
        categoryRepository.deleteById(id); // Deleting the category by its ID from the repository
    }
}

