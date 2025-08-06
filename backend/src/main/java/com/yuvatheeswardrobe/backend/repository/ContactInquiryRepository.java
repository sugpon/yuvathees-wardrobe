package com.yuvatheeswardrobe.backend.repository;

import com.yuvatheeswardrobe.backend.entity.ContactInquiry; // Importing the ContactInquiry entity class
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository for CRUD operations

public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Integer> { // Extending JpaRepository to provide CRUD operations for ContactInquiry entity

}
