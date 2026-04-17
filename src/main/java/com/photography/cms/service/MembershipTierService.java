package com.photography.cms.service;

import com.photography.cms.entity.MembershipTier;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.MembershipTierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MembershipTierService {
    private final MembershipTierRepository repo;
    public List<MembershipTier> getAll() { return repo.findAll(); }
    public MembershipTier getById(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("MembershipTier not found: " + id)); }
    public MembershipTier save(MembershipTier m) { return repo.save(m); }
    public void delete(Long id) { repo.deleteById(id); }
}
