package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.City;

public interface CityRepository extends JpaRepository<City, Long> {

}
