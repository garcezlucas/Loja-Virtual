package com.virtualstore.backend.dto;

import lombok.Data;

@Data
public class AddProductRequestDTO {
    private Long cartId;

    private Long productId;
}
