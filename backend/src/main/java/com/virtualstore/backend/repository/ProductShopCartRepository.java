package com.virtualstore.backend.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualstore.backend.entity.ProductShopCart;

public interface ProductShopCartRepository extends JpaRepository<ProductShopCart, Long>{
    
    Optional<ProductShopCart> findByCartIdAndProductId(Long cartId, Long productId);

    Optional<ProductShopCart> findByIdAndCartId(Long id, Long cartId);

    List<ProductShopCart> findByCartIdAndCreationDateAfter(Long cartId, Date creationDate);

    void deleteByIdAndCartId(Long id, Long cartId);
}
