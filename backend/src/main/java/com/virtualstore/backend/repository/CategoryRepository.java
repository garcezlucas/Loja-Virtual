package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
