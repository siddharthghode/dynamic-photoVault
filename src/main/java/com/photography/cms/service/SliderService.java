package com.photography.cms.service;

import com.photography.cms.entity.Slider;
import com.photography.cms.exception.ResourceNotFoundException;
import com.photography.cms.repository.SliderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SliderService {

    private final SliderRepository repo;

    public List<Slider> getActiveSliders() {
        return repo.findByActiveTrueOrderByOrderAsc();
    }

    public List<Slider> getAll() {
        return repo.findAll();
    }

    public Slider getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Slider not found: " + id));
    }

    public Slider save(Slider slider) {
        return repo.save(slider);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
