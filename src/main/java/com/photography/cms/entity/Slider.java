package com.photography.cms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "slider")
@Getter
@Setter
public class Slider {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String caption;
    private String image;
    @Column(name = "sort_order")
    private int order;
    @Column(name = "is_active")
    private boolean active = true;
}
