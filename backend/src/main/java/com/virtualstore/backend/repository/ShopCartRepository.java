package com.virtualstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.ShopCart;

public interface ShopCartRepository extends JpaRepository<ShopCart, Long> {

    List<ShopCart> findBySituation(String situation);
}
