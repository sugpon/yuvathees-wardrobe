package com.yuvatheeswardrobe.backend.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*; // Importing JPA annotations for entity mapping

import java.util.List;

@Entity  // Marks this class as a JPA entity, meaning Hibernate will map it to a table
public class Category {

    @Id  // Marks this as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment behavior in MySQL
    private int id;
    @Column(nullable = false, length = 150)  // Column cannot be null and limits name to 150 characters
    private String name;
    @Column(columnDefinition = "TEXT")  // Stores longer strings like descriptions
    private String description;
    @Column(name = "image_url", length = 255)  // Maps to `image_url` column, for image path or URL
    private String imageUrl;

    @OneToMany (mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true) // Establishes a one-to-many relationship with SubCategory
    @JsonManagedReference
    private List<SubCategory> subCategories; // List of subcategories associated with this category

    //Constructors
    public Category() {
        // Default constructor is required by JPA
    }

    public Category(String name, String description, String imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    //Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<SubCategory> getSubCategories() { // Returns the list of subcategories associated with this category
        return subCategories;
    }

    public void setSubCategories(List<SubCategory> subCategories) { // Sets the list of subcategories for this category
        this.subCategories = subCategories;
    }
}
