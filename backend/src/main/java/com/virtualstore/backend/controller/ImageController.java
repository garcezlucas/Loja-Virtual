package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Image;
import com.virtualstore.backend.service.ImageService;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/")
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @PostMapping("/")
    public Image createImage(@RequestBody Image image) {
        return imageService.create(image);
    }

    @PutMapping("/")
    public Image updateImage(@RequestBody Image image) {
        return imageService.update(image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeImage(@PathVariable("id") Long id) {
        imageService.remove(id);
        return ResponseEntity.ok().build();
    }
}
