package com.photography.cms.repository;

import com.photography.cms.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    Optional<BlogPost> findBySlug(String slug);
    List<BlogPost> findAllByOrderByPublishedAtDesc();
}
