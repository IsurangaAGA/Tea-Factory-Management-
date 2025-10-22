package com.teafactory.app.service.registration;

import com.teafactory.app.exception.UserAlreadyExistsException;
import com.teafactory.app.model.User;
import com.teafactory.app.repository.UserRepository;
import com.teafactory.app.validator.UserValidator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService implements IRegistrationService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final UserValidator validator;

    public RegistrationService(UserRepository repo, PasswordEncoder encoder, UserValidator validator) {
        this.repo = repo;
        this.encoder = encoder;
        this.validator = validator;
    }

    @Override
    public User register(User user) {
        validator.validate(user);

        if (repo.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }
}

