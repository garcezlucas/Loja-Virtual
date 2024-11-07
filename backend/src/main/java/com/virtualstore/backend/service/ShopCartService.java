package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.dto.ShopCartReturnDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductShopCart;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.repository.ProductShopCartRepository;
import com.virtualstore.backend.repository.ShopCartRepository;

@Service
public class ShopCartService {

    @Autowired
    private ShopCartRepository shopCartRepository;

    @Autowired
    private ProductShopCartRepository productShopCartRepository;

    @Autowired
    private ProductShopCartService productShopCartService;

    public List<ShopCart> getAllCarts() {
        return shopCartRepository.findAll();
    }

    public Optional<ShopCartReturnDTO> getShopCartByUser(Long userId) {
        Optional<ShopCart> optionalCart = shopCartRepository.findByPersonIdAndSituation(userId, "pending");

        if (optionalCart.isEmpty()) {
            return Optional.empty();
        }

        ShopCart cart = optionalCart.get();

        List<ProductShopCart> products = productShopCartRepository.findByCartIdAndCreationDateAfter(
                cart.getId(), cart.getCreationDate());

        ShopCartReturnDTO shopCartDto = new ShopCartReturnDTO();
        shopCartDto.setId(cart.getId());
        shopCartDto.setPersonId(cart.getPerson().getId());
        shopCartDto.setObservation(cart.getObservation());
        shopCartDto.setSituation(cart.getSituation());
        shopCartDto.setCreationDate(cart.getCreationDate());
        shopCartDto.setUpdateDate(cart.getUpdateDate());
        shopCartDto.setProducts(products);

        return Optional.of(shopCartDto);
    }

    public ShopCart create(ShopCart shopCart, Product product, Double quantity) {
        Long productId = product.getId();

        shopCart.setCreationDate(new Date());
        ShopCart newShopCart = shopCartRepository.saveAndFlush(shopCart);

        productShopCartService.linkProductShopCart(shopCart, productId, quantity);

        return newShopCart;
    }

    public ShopCart update(ShopCart shopCart, Product product, Double quantity) {
        Long productId = product.getId();

        ShopCart existingShopCart = shopCartRepository.findById(shopCart.getId())
                .orElseThrow(() -> new IllegalArgumentException("Carrinho inválido!"));
        Date createDate = existingShopCart.getCreationDate();

        shopCart.setCreationDate(createDate);
        shopCart.setUpdateDate(new Date());

        ShopCart updateShopCart = shopCartRepository.saveAndFlush(shopCart);

        productShopCartService.linkProductShopCart(shopCart, productId, quantity);

        return updateShopCart;
    }

    public void remove(Long id) {
        ShopCart shopCart = shopCartRepository.findById(id).get();
        shopCartRepository.delete(shopCart);

    }
}
