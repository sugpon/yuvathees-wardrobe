package com.yuvatheeswardrobe.backend.repository;
import com.yuvatheeswardrobe.backend.entity.Admin; // Importing the Admin entity class
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface AdminRepository extends JpaRepository<Admin, Integer> {
        // Additional query methods can be defined here if needed
    }
