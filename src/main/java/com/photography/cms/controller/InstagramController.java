package com.photography.cms.controller;

import com.photography.cms.entity.InstagramPost;
import com.photography.cms.service.FileStorageService;
import com.photography.cms.service.InstagramPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/instagram")
@RequiredArgsConstructor
public class InstagramController {

    private final InstagramPostService instagramPostService;
    private final FileStorageService fileStorage;

    @GetMapping
    public List<InstagramPost> getAll() {
        return instagramPostService.getAll();
    }

    @GetMapping("/{id}")
    public InstagramPost getById(@PathVariable Long id) {
        return instagramPostService.getById(id);
    }

    @PostMapping
    public ResponseEntity<InstagramPost> create(
            @RequestParam(required = false) String caption,
            @RequestParam(required = false) String postUrl,
            @RequestParam(required = false) MultipartFile image) {
        InstagramPost post = new InstagramPost();
        post.setCaption(caption);
        post.setPostUrl(postUrl);
        if (image != null && !image.isEmpty()) {
            post.setImage(fileStorage.store(image, "instagram"));
        }
        return ResponseEntity.ok(instagramPostService.save(post));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstagramPost> update(
            @PathVariable Long id,
            @RequestParam(required = false) String caption,
            @RequestParam(required = false) String postUrl,
            @RequestParam(required = false) MultipartFile image) {
        InstagramPost post = instagramPostService.getById(id);
        post.setCaption(caption);
        post.setPostUrl(postUrl);
        if (image != null && !image.isEmpty()) {
            post.setImage(fileStorage.store(image, "instagram"));
        }
        return ResponseEntity.ok(instagramPostService.save(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        instagramPostService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
