package com.photography.cms.service;

import com.photography.cms.entity.ContactMessage;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repo;

    public ContactMessage create(ContactMessage msg) {
        return repo.save(msg);
    }

    public List<ContactMessage> getAll() {
        return repo.findAll();
    }

    public ContactMessage getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
