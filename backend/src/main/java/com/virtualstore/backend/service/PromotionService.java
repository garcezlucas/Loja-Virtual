package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductImage;
import com.virtualstore.backend.entity.Promotion;
import com.virtualstore.backend.repository.ProductRepository;
import com.virtualstore.backend.repository.PromotionRepository;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageService productImageService;

    public List<Promotion> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();

        promotions.forEach(promotion -> {
            List<ProductImage> images = productImageService.getByProduct(promotion.getProduct().getId());
            promotion.getProduct().setImages(images);
        });

        return promotions;
    }

    public Promotion create(Promotion promotion) {
        Long productId = promotion.getProduct().getId();

        Product productOpt = productRepository.findById(productId).get();

        promotion.setCreationDate(new Date());

        Promotion newPromotion = promotionRepository.saveAndFlush(promotion);

        Promotion returnPromotion = newPromotion;
        returnPromotion.setProduct(productOpt);

        return returnPromotion;
    }

    public Promotion update(Promotion promotion) {
        Promotion existingPromotion = promotionRepository.findById(promotion.getId())
                .orElseThrow(() -> new IllegalArgumentException("Promoção inválida!"));
        Date createDate = existingPromotion.getCreationDate();

        promotion.setCreationDate(createDate);
        promotion.setUpdateDate(new Date());

        Promotion updatePromotion = promotionRepository.saveAndFlush(promotion);

        return updatePromotion;
    }

    public void remove(Long id) {
        Promotion promotion = promotionRepository.findById(id).get();

        promotionRepository.delete(promotion);
    }
}
