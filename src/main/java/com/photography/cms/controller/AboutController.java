package com.photography.cms.controller;

import com.photography.cms.entity.About;
import com.photography.cms.service.AboutService;
import com.photography.cms.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {

    private final AboutService aboutService;
    private final FileStorageService fileStorage;

    @GetMapping
    public List<About> getAll() {
        return aboutService.getAll();
    }

    @GetMapping("/{id}")
    public About getById(@PathVariable Long id) {
        return aboutService.getById(id);
    }

    @PostMapping
    public ResponseEntity<About> create(
            @RequestParam String heading,
            @RequestParam String bodyText,
            @RequestParam(required = false) MultipartFile image) {
        About about = new About();
        about.setHeading(heading);
        about.setBodyText(bodyText);
        if (image != null && !image.isEmpty()) {
            about.setImage(fileStorage.store(image, "about"));
        }
        return ResponseEntity.ok(aboutService.save(about));
    }

    @PutMapping("/{id}")
    public ResponseEntity<About> update(
            @PathVariable Long id,
            @RequestParam String heading,
            @RequestParam String bodyText,
            @RequestParam(required = false) MultipartFile image) {
        About about = aboutService.getById(id);
        about.setHeading(heading);
        about.setBodyText(bodyText);
        if (image != null && !image.isEmpty()) {
            about.setImage(fileStorage.store(image, "about"));
        }
        return ResponseEntity.ok(aboutService.save(about));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        aboutService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
