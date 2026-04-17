package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "testimonial")
@Data
public class Testimonial {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authorName;
    @Column(columnDefinition = "TEXT")
    private String quoteText;
    private Integer rating;
}
