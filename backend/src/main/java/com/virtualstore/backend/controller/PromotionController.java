package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Promotion;
import com.virtualstore.backend.service.PromotionService;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {
    
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/")
    public List<Promotion> getAllPromotions() {
        return promotionService.getAllCities();
    }

    @PostMapping("/")
    public Promotion createPromotion(@RequestBody Promotion promotion) {
        return promotionService.create(promotion);
    }

    @PutMapping("/")
    public Promotion updatePromotion(@RequestBody Promotion promotion) {
        return promotionService.update(promotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePromotion(@PathVariable("id") Long id) {
        promotionService.remove(id);
        return ResponseEntity.ok().build();
    }
}
