package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
