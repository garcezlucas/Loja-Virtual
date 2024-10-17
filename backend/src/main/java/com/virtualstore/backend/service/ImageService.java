package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.virtualstore.backend.entity.Image;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.repository.ImageRepository;
import com.virtualstore.backend.repository.ProductRepository;

public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image create(Image image) {
        Long productId = image.getProduct().getId();

        Optional<Product> productOpt = productRepository.findById(productId);

        image.setCreationDate(new Date());
        Image newImage = imageRepository.saveAndFlush(image);

        Image returnImage = newImage;
        returnImage.setProduct(productOpt.get());

        return returnImage;
    }

    public Image update(Image image) {
        image.setUpdateDate(new Date());

        Image updateImage = imageRepository.saveAndFlush(image);

        return updateImage;
    }

    public void remove(Long id) {
        Image image = imageRepository.findById(id).get();
        
        imageRepository.delete(image);

    }
}
