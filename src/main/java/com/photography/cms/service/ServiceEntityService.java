package com.photography.cms.service;

import com.photography.cms.entity.Service;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceEntityService {
    private final ServiceRepository repo;
    public List<Service> getAll() { return repo.findAllByOrderByOrderAsc(); }
    public Service getById(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found: " + id)); }
    public Service save(Service s) { return repo.save(s); }
    public void delete(Long id) { repo.deleteById(id); }
}
