package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findByEmail(String email);

    Person findByEmailAndRecoverPasswordCode(String email, String recoverPasswordCode);

    boolean existsByEmail(String email);
    
    boolean existsByCpf(String cpf);
}
