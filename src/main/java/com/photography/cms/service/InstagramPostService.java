package com.photography.cms.service;

import com.photography.cms.entity.InstagramPost;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.InstagramPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstagramPostService {
    private final InstagramPostRepository repo;
    public List<InstagramPost> getAll() { return repo.findAll(); }
    public InstagramPost getById(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstagramPost not found: " + id)); }
    public InstagramPost save(InstagramPost p) { return repo.save(p); }
    public void delete(Long id) { repo.deleteById(id); }
}
