package com.photography.cms.repository;

import com.photography.cms.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findByCategoryOrderByOrderAsc(String category);
    List<Portfolio> findAllByOrderByOrderAsc();
}
