package com.virtualstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);
}
