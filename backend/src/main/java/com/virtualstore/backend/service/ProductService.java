package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Brand;
import com.virtualstore.backend.entity.Category;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.repository.BrandRepository;
import com.virtualstore.backend.repository.CategoryRepository;
import com.virtualstore.backend.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product create(Product product) {
        Long brandId = product.getBrand().getId();

        Long categoryId = product.getCategory().getId();

        Optional<Brand> brandOpt = brandRepository.findById(brandId);

        Optional<Category> categoryOpt = categoryRepository.findById(categoryId);

        product.setCreationDate(new Date());
        Product newProduct = productRepository.saveAndFlush(product);

        Product returnProduct = newProduct;
        returnProduct.setBrand(brandOpt.get());
        returnProduct.setCategory(categoryOpt.get());

        return returnProduct;
    }

    public Product update(Product product) {
        product.setUpdateDate(new Date());

        Product updateProduct = productRepository.saveAndFlush(product);

        return updateProduct;
    }

    public void remove(Long id) {
        Product product = productRepository.findById(id).get();

        productRepository.delete(product);
    }
}
