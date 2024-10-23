package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.virtualstore.backend.entity.ProductImage;
import com.virtualstore.backend.service.ProductImageService;

@RestController
@RequestMapping("/api/image")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @GetMapping("/")
    public List<ProductImage> getAllImages() {
        return productImageService.getAllImages();
    }

    @GetMapping("/product/{id}")
    public List<ProductImage> getProductImages(@PathVariable("id") Long id) {
        return productImageService.getByProduct(id);
    }

    @PostMapping("/")
    public ProductImage createImage(@RequestParam("productId") Long productId,
            @RequestParam("file") MultipartFile file) {
        return productImageService.create(productId, file);
    }

    @PutMapping("/")
    public ProductImage updateImage(@RequestBody ProductImage image) {
        return productImageService.update(image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeImage(@PathVariable("id") Long id) {
        productImageService.remove(id);
        return ResponseEntity.ok().build();
    }
}
