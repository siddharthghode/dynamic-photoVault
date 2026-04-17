package com.photography.cms.controller;

import com.photography.cms.entity.Portfolio;
import com.photography.cms.service.FileStorageService;
import com.photography.cms.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final FileStorageService fileStorage;

    @GetMapping
    public List<Portfolio> getAll(@RequestParam(required = false) String category) {
        return category != null ? portfolioService.getByCategory(category) : portfolioService.getAll();
    }

    @GetMapping("/{id}")
    public Portfolio getById(@PathVariable Long id) {
        return portfolioService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Portfolio> create(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String category,
            @RequestParam int order,
            @RequestParam(required = false) MultipartFile image) {
        Portfolio p = new Portfolio();
        p.setTitle(title);
        p.setDescription(description);
        p.setCategory(category);
        p.setOrder(order);
        if (image != null && !image.isEmpty()) {
            p.setImage(fileStorage.store(image, "portfolio"));
        }
        return ResponseEntity.ok(portfolioService.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String category,
            @RequestParam int order,
            @RequestParam(required = false) MultipartFile image) {
        Portfolio p = portfolioService.getById(id);
        p.setTitle(title);
        p.setDescription(description);
        p.setCategory(category);
        p.setOrder(order);
        if (image != null && !image.isEmpty()) {
            p.setImage(fileStorage.store(image, "portfolio"));
        }
        return ResponseEntity.ok(portfolioService.save(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        portfolioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
