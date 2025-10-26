package com.teafactory.app.services.login;

import com.teafactory.app.exception.InvalidCredentialsException;
import com.teafactory.app.model.User;
import com.teafactory.app.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements ILoginService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public LoginService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public User login(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()
                || user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new InvalidCredentialsException("Username and password are required");
        }

        User existingUser = repo.findByUsername(user.getUsername());

        if (existingUser != null && encoder.matches(user.getPassword(), existingUser.getPassword())) {
            return existingUser;
        }

        throw new InvalidCredentialsException("Invalid credentials");
    }
}

