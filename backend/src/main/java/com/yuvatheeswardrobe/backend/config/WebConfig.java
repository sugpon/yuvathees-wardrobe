package com.yuvatheeswardrobe.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all API endpoints
                .allowedOrigins("http://localhost:5173") // your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE") // allowed HTTP methods
                .allowCredentials(true); // if you're using cookies, etc.
    }
}