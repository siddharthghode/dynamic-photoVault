package com.photography.cms.controller;

import com.photography.cms.entity.Testimonial;
import com.photography.cms.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    @GetMapping
    public List<Testimonial> getAll() {
        return testimonialService.getAll();
    }

    @GetMapping("/{id}")
    public Testimonial getById(@PathVariable Long id) {
        return testimonialService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Testimonial> create(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialService.save(testimonial));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> update(@PathVariable Long id, @RequestBody Testimonial updated) {
        Testimonial t = testimonialService.getById(id);
        t.setAuthorName(updated.getAuthorName());
        t.setQuoteText(updated.getQuoteText());
        t.setRating(updated.getRating());
        return ResponseEntity.ok(testimonialService.save(t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
