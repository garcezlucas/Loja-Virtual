package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualstore.backend.dto.ShopCartReturnDTO;
import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductImage;
import com.virtualstore.backend.entity.ProductShopCart;
import com.virtualstore.backend.entity.ShopCart;
import com.virtualstore.backend.repository.PersonRepository;
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

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductImageService productImageService;

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

        products.forEach(productShopCart -> {
            Product product = productShopCart.getProduct();
            List<ProductImage> images = productImageService.getByProduct(product.getId());
            product.setImages(images);
        });

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

    public ShopCart create(Long userId) {
        Optional<ShopCart> optionalCart = shopCartRepository.findByPersonIdAndSituation(userId, "pending");

        if (optionalCart.isEmpty()) {
            ShopCart shopCart = new ShopCart();

            Person person = personRepository.findById(userId).get();

            shopCart.setPerson(person);
            shopCart.setSituation("pending");
            shopCart.setCreationDate(new Date());

            return shopCart;
        }

        return null;
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

    @Transactional
    public void removeItem(Long cartId, Long productCartId) {
        Optional<ProductShopCart> item = productShopCartRepository.findByIdAndCartId(productCartId, cartId);
        if (item.isPresent()) {
            productShopCartRepository.deleteByIdAndCartId(productCartId, cartId);
        } else {
            System.out.println("Item não encontrado com cartId: " + cartId + " e productCartId: " + productCartId);
        }
    }
}
