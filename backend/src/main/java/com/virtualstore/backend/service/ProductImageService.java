package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.virtualstore.backend.entity.ProductImage;
import com.virtualstore.backend.entity.Product;
import com.virtualstore.backend.repository.ProductImageRepository;
import com.virtualstore.backend.repository.ProductRepository;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<ProductImage> getAllImages() {
        return productImageRepository.findAll();
    }

    public ProductImage create(Long productId, MultipartFile file) {
        Product product = productRepository.findById(productId).get();

        ProductImage newImage = new ProductImage();

        try {
            if (!file.isEmpty()) {
                byte[] bytes = file.getBytes();
                String NameImage = String.valueOf(product.getId()) + file.getOriginalFilename();
                Path path = Paths
                        .get("/home/lucasgarcez/Desktop/Portifolio/Projetos/Loja-Virtual/imagens/" + NameImage);
                Files.write(path, bytes);

                newImage.setName(NameImage);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        newImage.setProduct(product);
        newImage.setCreationDate(new Date());
        newImage = productImageRepository.saveAndFlush(newImage);

        return newImage;
    }

    public ProductImage update(ProductImage image) {
        Long imageId = image.getId();
        String newName = image.getName();

        ProductImage oldImage = productImageRepository.findById(imageId).get();

        Path oldPath = Paths
                .get("/home/lucasgarcez/Desktop/Portifolio/Projetos/Loja-Virtual/imagens/" + oldImage.getName());

        String newFileName = newName;
        Path newPath = Paths.get("/home/lucasgarcez/Desktop/Portifolio/Projetos/Loja-Virtual/imagens/" + newFileName);

        try {
            Files.move(oldPath, newPath, StandardCopyOption.REPLACE_EXISTING);

            oldImage.setName(newFileName);
            oldImage.setUpdateDate(new Date());

            oldImage = productImageRepository.saveAndFlush(oldImage);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return oldImage;
    }

    public void remove(Long id) {
        ProductImage image = productImageRepository.findById(id).get();

        Path imagePath = Paths
                .get("/home/lucasgarcez/Desktop/Portifolio/Projetos/Loja-Virtual/imagens/" + image.getName());

        try {
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            } else {
                System.out.println("Arquivo de imagem não encontrado: " + image.getName());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        productImageRepository.delete(image);

    }
}
