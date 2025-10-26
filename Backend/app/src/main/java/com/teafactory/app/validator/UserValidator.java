package com.teafactory.app.validator;

import com.teafactory.app.entities.User;
import com.teafactory.app.exception.ValidationException;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {

    public void validate(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new ValidationException("Username is required");
        }
        if (user.getUsername().length() < 3 || user.getUsername().length() > 30) {
            throw new ValidationException("Username must be between 3–30 characters");
        }

        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new ValidationException("Email is required");
        }
        if (!user.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new ValidationException("Invalid email format");
        }

        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new ValidationException("Password must be at least 6 characters");
        }

        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            throw new ValidationException("Role is required");
        }
    }
}

