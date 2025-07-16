package com.yuvatheeswardrobe.backend.repository;
import com.yuvatheeswardrobe.backend.entity.Category; // Importing the Category entity
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface CategoryRepository extends JpaRepository<Category, Integer> { // Extending JpaRepository to provide CRUD operations for Category entity

}
