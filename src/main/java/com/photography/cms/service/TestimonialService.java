package com.photography.cms.service;

import com.photography.cms.entity.Testimonial;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {
    private final TestimonialRepository repo;
    public List<Testimonial> getAll() { return repo.findAll(); }
    public Testimonial getById(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Testimonial not found: " + id)); }
    public Testimonial save(Testimonial t) { return repo.save(t); }
    public void delete(Long id) { repo.deleteById(id); }
}
