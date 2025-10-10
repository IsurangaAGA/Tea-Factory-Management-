package com.teafactory.app.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {}) // Enable CORS
                .csrf(csrf -> csrf.disable()) // Keep CSRF disabled (Essential for Postman/Frontend POST)
                .authorizeHttpRequests(auth -> auth

                        // CRITICAL FIX: Explicitly permit POST to the exact path
                        .requestMatchers(HttpMethod.POST, "/api/intakes").permitAll()

                        // Permit all other /api/intakes paths and methods (like GET, DELETE/{id})
                        .requestMatchers("/api/intakes/**").permitAll()

                        // Permit user registration/login
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()

                        // Permit preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // All other requests must be authenticated
                        .anyRequest().authenticated()
                )
                // If the client (Postman) doesn't provide a session, ensure no challenge is sent
                .httpBasic(basic -> basic.disable())
                .formLogin(form -> form.disable());

        return http.build();
    }

    // Global CORS configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // allow session cookies
            }
        };
    }
}
