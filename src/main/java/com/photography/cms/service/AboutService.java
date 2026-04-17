package com.photography.cms.service;

import com.photography.cms.entity.About;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.AboutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AboutService {
    private final AboutRepository repo;
    public List<About> getAll() { return repo.findAll(); }
    public About getById(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("About not found: " + id)); }
    public About save(About about) { return repo.save(about); }
    public void delete(Long id) { repo.deleteById(id); }
}
