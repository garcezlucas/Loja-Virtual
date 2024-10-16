package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.State;

public interface StateRepository extends JpaRepository<State, Long>{
    
    
}
