package com.virtualstore.backend.dto;

import lombok.Data;

@Data
public class ShopCartRequestDTO {
    private Long cartId;

    private Long productId;

    private Double quantity;

}
