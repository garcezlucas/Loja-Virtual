package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.ProductShopCart;

public interface ProductShopCartRepository extends JpaRepository<ProductShopCart, Long>{
    
}
