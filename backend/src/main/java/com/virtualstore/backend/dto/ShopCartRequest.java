package com.virtualstore.backend.dto;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ShopCart;

public class ShopCartRequest {
    private ShopCart shopCart;
    private Product product;
    private Double quantity;

    public ShopCart getShopCart() {
        return shopCart;
    }

    public void setShopCart(ShopCart shopCart) {
        this.shopCart = shopCart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
