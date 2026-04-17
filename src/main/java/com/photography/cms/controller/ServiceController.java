package com.photography.cms.controller;

import com.photography.cms.entity.Service;
import com.photography.cms.service.FileStorageService;
import com.photography.cms.service.ServiceEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceEntityService serviceEntityService;
    private final FileStorageService fileStorage;

    @GetMapping
    public List<Service> getAll() {
        return serviceEntityService.getAll();
    }

    @GetMapping("/{id}")
    public Service getById(@PathVariable Long id) {
        return serviceEntityService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Service> create(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam int order,
            @RequestParam(required = false) MultipartFile icon) {
        Service s = new Service();
        s.setTitle(title);
        s.setDescription(description);
        s.setOrder(order);
        if (icon != null && !icon.isEmpty()) {
            s.setIcon(fileStorage.store(icon, "services/icons"));
        }
        return ResponseEntity.ok(serviceEntityService.save(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam int order,
            @RequestParam(required = false) MultipartFile icon) {
        Service s = serviceEntityService.getById(id);
        s.setTitle(title);
        s.setDescription(description);
        s.setOrder(order);
        if (icon != null && !icon.isEmpty()) {
            s.setIcon(fileStorage.store(icon, "services/icons"));
        }
        return ResponseEntity.ok(serviceEntityService.save(s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceEntityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
