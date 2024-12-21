package com.virtualstore.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.dto.AddProductRequestDTO;
import com.virtualstore.backend.dto.ShopCartRequestDTO;
import com.virtualstore.backend.dto.ShopCartReturnDTO;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.service.ShopCartService;

@RestController
@RequestMapping("/api/cart")
public class ShopCartController {

    @Autowired
    private ShopCartService shopCartService;

    @GetMapping("/")
    public List<ShopCart> getAllCarts() {
        return shopCartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public Optional<ShopCartReturnDTO> getShopCartByUser(@PathVariable("id") Long id) {
        return shopCartService.getShopCartByUser(id);
    }

    @PostMapping("/")
    public ShopCart createCart(@RequestBody Long userId) {
        return shopCartService.create(userId);
    }

    @PutMapping("/add")
    public ShopCart addProductToCart(@RequestBody AddProductRequestDTO request) {
        return shopCartService.addProductToCart(request.getCartId(), request.getProductId());
    }

    @PutMapping("/")
    public ShopCart updateCart(@RequestBody ShopCartRequestDTO request) {
        return shopCartService.update(request.getShopCart(), request.getProduct(), request.getQuantity());
    }

    @DeleteMapping("/{cartId}/{productCartId}")
    public ShopCart removeItemCart(@PathVariable("cartId") Long cartId, @PathVariable("productCartId") Long productCartId) {
        return shopCartService.removeItem(cartId, productCartId);
    }
}
