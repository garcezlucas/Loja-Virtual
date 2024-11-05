package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.repository.ShopCartRepository;

@Service
public class ShopCartService {

    @Autowired
    private ShopCartRepository shopCartRepository;

    @Autowired
    private ProductShopCartService productShopCartService;

    public List<ShopCart> getAllCarts() {
        return shopCartRepository.findAll();
    }

    public ShopCart create(ShopCart shopCart, Product product, Double quantity) {
        shopCart.setCreationDate(new Date());
        ShopCart newShopCart = shopCartRepository.saveAndFlush(shopCart);
        productShopCartService.linkProductShopCart(shopCart, product, quantity);
        return newShopCart;
    }

    public ShopCart update(ShopCart shopCart, Product product, Double quantity) {
        ShopCart existingShopCart = shopCartRepository.findById(shopCart.getId())
                .orElseThrow(() -> new IllegalArgumentException("Carrinho inválido!"));
        Date createDate = existingShopCart.getCreationDate();

        shopCart.setCreationDate(createDate);
        shopCart.setUpdateDate(new Date());
        ShopCart updateShopCart = shopCartRepository.saveAndFlush(shopCart);

        productShopCartService.linkProductShopCart(shopCart, product, quantity);
        return updateShopCart;
    }

    public void remove(Long id) {
        ShopCart shopCart = shopCartRepository.findById(id).get();
        shopCartRepository.delete(shopCart);

    }
}
