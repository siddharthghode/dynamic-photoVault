package com.photography.cms.service;

import com.github.slugify.Slugify;
import com.photography.cms.entity.BlogPost;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogPostRepository repo;
    private final Slugify slugify = Slugify.builder().build();

    public List<BlogPost> getAll() {
        return repo.findAllByOrderByPublishedAtDesc();
    }

    public BlogPost getBySlug(String slug) {
        return repo.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Blog not found: " + slug));
    }

    public BlogPost getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Blog not found: " + id));
    }

    public BlogPost save(BlogPost post) {
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            post.setSlug(slugify.slugify(post.getTitle()));
        }
        return repo.save(post);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
