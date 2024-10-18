package com.virtualstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.Person;

public interface PersonClientRepository extends JpaRepository<Person, Long> {

}
