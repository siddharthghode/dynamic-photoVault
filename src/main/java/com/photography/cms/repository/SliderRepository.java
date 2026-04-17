package com.photography.cms.repository;

import com.photography.cms.entity.Slider;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SliderRepository extends JpaRepository<Slider, Long> {
    List<Slider> findByActiveTrueOrderByOrderAsc();
}
