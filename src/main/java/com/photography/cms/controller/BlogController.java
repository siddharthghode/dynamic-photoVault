package com.photography.cms.controller;

import com.photography.cms.entity.BlogPost;
import com.photography.cms.service.BlogService;
import com.photography.cms.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final FileStorageService fileStorage;

    @GetMapping
    public List<BlogPost> getAll() {
        return blogService.getAll();
    }

    @GetMapping("/{slug}")
    public BlogPost getBySlug(@PathVariable String slug) {
        return blogService.getBySlug(slug);
    }

    @PostMapping
    public ResponseEntity<BlogPost> create(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) MultipartFile image) {
        BlogPost post = new BlogPost();
        post.setTitle(title);
        post.setContent(content);
        post.setSlug(slug);
        if (image != null && !image.isEmpty()) {
            post.setImage(fileStorage.store(image, "blogs"));
        }
        return ResponseEntity.ok(blogService.save(post));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) MultipartFile image) {
        BlogPost post = blogService.getById(id);
        post.setTitle(title);
        post.setContent(content);
        if (slug != null && !slug.isBlank()) post.setSlug(slug);
        if (image != null && !image.isEmpty()) {
            post.setImage(fileStorage.store(image, "blogs"));
        }
        return ResponseEntity.ok(blogService.save(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
