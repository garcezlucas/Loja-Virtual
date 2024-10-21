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
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.Brand;
import com.virtualstore.backend.service.BrandService;

@RestController
@RequestMapping("/api/brand")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @PostMapping("/")
    public Brand createBrand(@RequestBody Brand brand) {
        return brandService.create(brand);
    }

    @PutMapping("/")
    public Brand updateBrand(@RequestBody Brand brand) {
        return brandService.update(brand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeBrand(@PathVariable("id") Long id) {
        brandService.remove(id);
        return ResponseEntity.ok().build();
    }
}
