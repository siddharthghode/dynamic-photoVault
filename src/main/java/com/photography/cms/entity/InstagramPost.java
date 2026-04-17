package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "instagram_post")
@Data
public class InstagramPost {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String caption;
    private String postUrl;
}
