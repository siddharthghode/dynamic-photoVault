package com.photography.cms.controller;

import com.photography.cms.entity.ContactMessage;
import com.photography.cms.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactMessage> create(@RequestBody ContactMessage message) {
        return ResponseEntity.ok(contactService.create(message));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactMessage> getAll() {
        return contactService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessage getById(@PathVariable Long id) {
        return contactService.getById(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
