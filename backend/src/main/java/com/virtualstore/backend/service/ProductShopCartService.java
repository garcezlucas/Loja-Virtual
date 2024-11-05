package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductShopCart;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.repository.ProductShopCartRepository;
import com.virtualstore.backend.repository.ShopCartRepository;

@Service
public class ProductShopCartService {

    @Autowired
    private ProductShopCartRepository productShopCartRepository;

    @Autowired
    private ShopCartRepository shopCartRepository;

    public void linkProductShopCart(ShopCart shopCart, Product product, Double quantity) {

        List<ShopCart> shopCartList = shopCartRepository.findBySituation("pending");

        ShopCart cart = shopCartList.stream()
                .filter(c -> c.getId().equals(shopCart.getId()))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Cart with ID " + shopCart.getId() + " not found"));

        if (cart != null) {
            ProductShopCart productShopCart = new ProductShopCart();
            productShopCart.setProduct(product);
            productShopCart.setCart(cart);
            productShopCart.setPrice(product.getPrice());
            productShopCart.setQuantity(quantity);
            productShopCart.setObservation(cart.getObservation());
            productShopCart.setCreationDate(new Date());

            productShopCartRepository.saveAndFlush(productShopCart);
        }
    }
}
