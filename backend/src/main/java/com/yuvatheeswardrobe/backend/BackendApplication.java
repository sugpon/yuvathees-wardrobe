package com.yuvatheeswardrobe.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.yuvatheeswardrobe.backend.config.AdminCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner{
	private final AdminCredentials adminCredentials;

	// ✅ Constructor injection
	public BackendApplication(AdminCredentials adminCredentials) {
		this.adminCredentials = adminCredentials;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		System.out.println("🟢 Admin username from environment: " + adminCredentials.getUsername());
	}
}
