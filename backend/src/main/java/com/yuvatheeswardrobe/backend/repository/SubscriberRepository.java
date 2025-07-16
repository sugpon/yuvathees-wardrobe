package com.yuvatheeswardrobe.backend.repository;

import com.yuvatheeswardrobe.backend.entity.Subscriber; // Importing the Subscriber entity class
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface SubscriberRepository extends JpaRepository<Subscriber, Integer> { // Extending JpaRepository to provide CRUD operations for Subscriber entity

    // Additional query methods can be defined here if needed
}
