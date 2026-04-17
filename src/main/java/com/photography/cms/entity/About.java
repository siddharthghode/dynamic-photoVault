package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "about")
@Data
public class About {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String heading;
    @Column(columnDefinition = "TEXT")
    private String bodyText;
    private String image;
}
