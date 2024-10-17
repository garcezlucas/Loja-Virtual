package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

    boolean existsByEmail(String email);
    
    boolean existsByCpf(String cpf);
}
