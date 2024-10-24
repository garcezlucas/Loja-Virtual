package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.service.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/")
    public Product createProduct(@RequestBody Product product) {
        return productService.create(product);
    }

    @PutMapping("/")
    public Product updateProduct(@RequestBody Product product) {
        return productService.update(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> removeProduct(@PathVariable("id") Long id) {
        productService.remove(id);

        return ResponseEntity.ok().build();
    }
}
