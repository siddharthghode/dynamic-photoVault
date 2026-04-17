package com.photography.cms.controller;

import com.photography.cms.entity.Slider;
import com.photography.cms.service.FileStorageService;
import com.photography.cms.service.SliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sliders")
@RequiredArgsConstructor
public class SliderController {

    private final SliderService sliderService;
    private final FileStorageService fileStorage;

    // Public frontend gets only active sliders
    // Admin panel passes ?all=true to get everything
    @GetMapping
    public List<Slider> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return all ? sliderService.getAll() : sliderService.getActiveSliders();
    }

    @GetMapping("/{id}")
    public Slider getById(@PathVariable Long id) {
        return sliderService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Slider> create(
            @RequestParam String title,
            @RequestParam(required = false) String caption,
            @RequestParam int order,
            @RequestParam(defaultValue = "true") boolean active,
            @RequestParam(required = false) MultipartFile image) {
        Slider slider = new Slider();
        slider.setTitle(title);
        slider.setCaption(caption);
        slider.setOrder(order);
        slider.setActive(active);
        if (image != null && !image.isEmpty()) {
            slider.setImage(fileStorage.store(image, "sliders"));
        }
        return ResponseEntity.ok(sliderService.save(slider));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Slider> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String caption,
            @RequestParam int order,
            @RequestParam(defaultValue = "true") boolean active,
            @RequestParam(required = false) MultipartFile image) {
        Slider slider = sliderService.getById(id);
        slider.setTitle(title);
        slider.setCaption(caption);
        slider.setOrder(order);
        slider.setActive(active);
        if (image != null && !image.isEmpty()) {
            slider.setImage(fileStorage.store(image, "sliders"));
        }
        return ResponseEntity.ok(sliderService.save(slider));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sliderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
