package com.teamshyt.backend_swapsphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication(scanBasePackages = "com.teamshyt")
@EnableJpaRepositories(basePackages = "com.teamshyt")
@EntityScan(basePackages = "com.teamshyt")
@EnableMethodSecurity
public class BackendSwapsphereApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendSwapsphereApplication.class, args);
	}

}
