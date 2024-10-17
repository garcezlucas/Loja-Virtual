package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

}
