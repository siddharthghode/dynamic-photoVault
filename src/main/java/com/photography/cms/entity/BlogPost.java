package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_post")
@Data
public class BlogPost {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(unique = true)
    private String slug;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String image;
    @CreationTimestamp
    private LocalDateTime publishedAt;
}
