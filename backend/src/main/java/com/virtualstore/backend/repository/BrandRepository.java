package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

}
