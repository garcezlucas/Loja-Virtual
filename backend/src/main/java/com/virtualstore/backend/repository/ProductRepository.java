package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
