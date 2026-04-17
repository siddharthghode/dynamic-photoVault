package com.photography.cms.service;

import com.photography.cms.entity.User;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAll() { return repo.findAll(); }

    public User getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    public User create(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return repo.save(user);
    }

    public User update(Long id, User updated) {
        User existing = getById(id);
        existing.setUsername(updated.getUsername());
        existing.setEmail(updated.getEmail());
        existing.setAdmin(updated.isAdmin());
        existing.setActive(updated.isActive());
        if (updated.getPasswordHash() != null && !updated.getPasswordHash().isBlank()) {
            existing.setPasswordHash(passwordEncoder.encode(updated.getPasswordHash()));
        }
        return repo.save(existing);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
