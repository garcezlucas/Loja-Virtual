package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    
}
