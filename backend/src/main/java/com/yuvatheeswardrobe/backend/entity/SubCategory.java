package com.yuvatheeswardrobe.backend.entity;
import jakarta.persistence.*; // Importing JPA annotations for entity mapping

@Entity  // Marks this class as a JPA entity, meaning Hibernate will map it to a table
public class SubCategory {

    @Id  // Marks this as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment behavior in MySQL
    private int id;

    @Column(nullable = false, length = 150)  // Column cannot be null and limits name to 150 characters
    private String name;

    @Column(columnDefinition = "TEXT")  // Stores longer strings like descriptions
    private String description;

    @Column(name = "image_url", length = 255)  // Maps to `image_url` column, for image path or URL
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category; // Establishes a many-to-one relationship with Category

    //Constructors

    public SubCategory() {
        // Default constructor is required by JPA
    }

    public SubCategory(String name, String description, String imageUrl, Category category) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
