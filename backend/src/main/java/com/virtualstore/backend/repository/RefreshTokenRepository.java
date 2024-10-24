package com.virtualstore.backend.repository;

import com.virtualstore.backend.entity.RefreshToken;
import com.virtualstore.backend.entity.Person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);

    void deleteByPerson(Person person);
}
