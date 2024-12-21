package com.virtualstore.backend.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductShopCart;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.repository.ProductRepository;
import com.virtualstore.backend.repository.ProductShopCartRepository;
import com.virtualstore.backend.repository.ShopCartRepository;

@Service
public class ProductShopCartService {

    @Autowired
    private ProductShopCartRepository productShopCartRepository;

    @Autowired
    private ShopCartRepository shopCartRepository;

    @Autowired
    private ProductRepository productRepository;

    public void linkProductShopCart(ShopCart shopCart, Long productId, Double quantity) {

        List<ShopCart> shopCartList = shopCartRepository.findBySituation("pending");

        ShopCart cart = shopCartList.stream()
                .filter(c -> c.getId().equals(shopCart.getId()))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Cart with ID " + shopCart.getId() + " not found"));

        Product product = productRepository.findById(productId).get();

        Optional<ProductShopCart> existingProductShopCart = productShopCartRepository
                .findByCartIdAndProductId(cart.getId(), productId);

        if (existingProductShopCart.isPresent()) {
            ProductShopCart productShopCart = existingProductShopCart.get();
            productShopCart.setQuantity(quantity);
            productShopCart.setObservation(cart.getObservation());
            productShopCart.setUpdateDate(new Date());
            productShopCartRepository.saveAndFlush(productShopCart);

        } else {
            ProductShopCart productShopCart = new ProductShopCart();

            Double price = (product.getDiscount() != null && product.getDiscount().compareTo(BigDecimal.ZERO) > 0)
                    ? product.getPrice() * (1 - product.getDiscount().doubleValue())
                    : product.getPrice();

            productShopCart.setProduct(product);
            productShopCart.setCart(cart);
            productShopCart.setPrice(price);
            productShopCart.setQuantity(quantity);
            productShopCart.setObservation(cart.getObservation());
            productShopCart.setCreationDate(new Date());
            productShopCartRepository.saveAndFlush(productShopCart);
        }
    }
}
