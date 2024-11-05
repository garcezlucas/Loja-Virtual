package com.virtualstore.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.ProductShopCart;

public interface ProductShopCartRepository extends JpaRepository<ProductShopCart, Long>{
    
    Optional<ProductShopCart> findByCartIdAndProductId(Long cartId, Long productId);
}
