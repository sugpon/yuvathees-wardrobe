package com.yuvatheeswardrobe.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; // Importing Configuration to define a configuration class
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
// This class configures CORS (Cross-Origin Resource Sharing) for the Spring Boot application
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all API endpoints
                .allowedOrigins("http://localhost:5173") // your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE") // allowed HTTP methods
                .allowCredentials(true); // if you're using cookies, etc.
    }
}