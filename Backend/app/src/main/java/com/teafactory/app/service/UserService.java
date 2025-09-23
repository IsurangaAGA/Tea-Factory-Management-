package com.teafactory.app.service;
import com.teafactory.app.model.User;
import com.teafactory.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User login(User user) {
        User existingUser = repo.findByUsername(user.getUsername());

        if (existingUser != null && encoder.matches(user.getPassword(), existingUser.getPassword())) {
            return existingUser;
        }

        return null; // Return null on failure
    }
}
