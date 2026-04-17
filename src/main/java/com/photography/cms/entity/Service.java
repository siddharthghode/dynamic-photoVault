package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "service")
@Data
public class Service {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String icon;
    @Column(name = "sort_order")
    private int order;
}
