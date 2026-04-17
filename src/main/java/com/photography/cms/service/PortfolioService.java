package com.photography.cms.service;

import com.photography.cms.entity.Portfolio;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository repo;

    public List<Portfolio> getAll() {
        return repo.findAllByOrderByOrderAsc();
    }

    public List<Portfolio> getByCategory(String category) {
        return repo.findByCategoryOrderByOrderAsc(category);
    }

    public Portfolio getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Portfolio not found: " + id));
    }

    public Portfolio save(Portfolio portfolio) {
        return repo.save(portfolio);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
