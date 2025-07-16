package com.yuvatheeswardrobe.backend.repository;

import com.yuvatheeswardrobe.backend.entity.SubCategory; // Importing the SubCategory entity
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> { // Extending JpaRepository to provide CRUD operations for SubCategory entity

    // Additional query methods can be defined here if needed
}
