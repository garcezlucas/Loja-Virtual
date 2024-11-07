package com.virtualstore.backend.dto;

import java.util.Date;
import java.util.List;

import com.virtualstore.backend.entity.ProductShopCart;

import lombok.Data;

@Data
public class ShopCartReturnDTO {

    private Long id;
    
    private String observation;

    private String situation;

    private Long personId;

    private Date creationDate;

    private Date updateDate;

    private List<ProductShopCart> products;
}
