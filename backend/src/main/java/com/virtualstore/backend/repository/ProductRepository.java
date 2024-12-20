package com.virtualstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.virtualstore.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.discount IS NOT NULL")
    List<Product> findWithDiscount();

    @Query("SELECT p FROM Product p WHERE p.discount IS NULL")
    List<Product> findWithoutDiscount();

}
