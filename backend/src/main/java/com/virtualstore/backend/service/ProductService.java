package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Brand;
import com.virtualstore.backend.entity.Category;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.entity.ProductImage;
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

    @Autowired
    private ProductImageService productImageService;

    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();

        products.forEach(product -> {
            List<ProductImage> images = productImageService.getByProduct(product.getId());
            product.setImages(images);
        });

        return products;
    }

    public List<Product> getAllProductsByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);

        products.forEach(product -> {
            List<ProductImage> images = productImageService.getByProduct(product.getId());
            product.setImages(images);
        });

        return products;
    }

    public Product getProduct(Long id) {
        Product product = productRepository.findById(id).get();

        List<ProductImage> images = productImageService.getByProduct(product.getId());
        product.setImages(images);

        return product;
    }

    public List<Product> getProductsWithDiscount() {
        List<Product> products = productRepository.findWithDiscount();

        products.forEach(product -> {
            List<ProductImage> images = productImageService.getByProduct(product.getId());
            product.setImages(images);
        });

        return products;
    }

    public List<Product> getProductsWithoutDiscount() {
        List<Product> products = productRepository.findWithoutDiscount();

        products.forEach(product -> {
            List<ProductImage> images = productImageService.getByProduct(product.getId());
            product.setImages(images);
        });
        
        return products;
    }

    public Product create(Product product) {
        Long brandId = product.getBrand().getId();

        Long categoryId = product.getCategory().getId();

        Brand brandOpt = brandRepository.findById(brandId).get();

        Category categoryOpt = categoryRepository.findById(categoryId).get();

        product.setCreationDate(new Date());
        Product newProduct = productRepository.saveAndFlush(product);

        Product returnProduct = newProduct;
        returnProduct.setBrand(brandOpt);
        returnProduct.setCategory(categoryOpt);

        return returnProduct;
    }

    public Product update(Product product) {
        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new IllegalArgumentException("Produto inválido!"));
        Date createDate = existingProduct.getCreationDate();

        product.setCreationDate(createDate);
        product.setUpdateDate(new Date());

        Product updateProduct = productRepository.saveAndFlush(product);

        return updateProduct;
    }

    public Product updateDiscount(Product product) {
        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new IllegalArgumentException("Produto inválido!"));

        Date createDate = existingProduct.getCreationDate();
        String shortDescription = existingProduct.getShortDescription();
        String description = existingProduct.getDescription();
        Brand brand = existingProduct.getBrand();
        Category category = existingProduct.getCategory();
        Double expense = existingProduct.getExpense();
        Double price = existingProduct.getPrice();

        product.setCreationDate(createDate);
        product.setUpdateDate(new Date());
        product.setShortDescription(shortDescription);
        product.setDescription(description);
        product.setCategory(category);
        product.setBrand(brand);
        product.setPrice(price);
        product.setExpense(expense);
        product.setCategory(category);

        Product updateProduct = productRepository.saveAndFlush(product);

        return updateProduct;
    }

    public void remove(Long id) {
        Product product = productRepository.findById(id).get();

        productRepository.delete(product);
    }
}
