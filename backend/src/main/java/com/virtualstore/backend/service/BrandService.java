package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Brand;
import com.virtualstore.backend.repository.BrandRepository;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Brand create(Brand brand) {
        brand.setCreationDate(new Date());
        Brand newBrand = brandRepository.saveAndFlush(brand);
        return newBrand;
    }

    public Brand update(Brand brand) {
        Brand existingBrand = brandRepository.findById(brand.getId())
                .orElseThrow(() -> new IllegalArgumentException("Marca inválida!"));
        Date createDate = existingBrand.getCreationDate();

        brand.setCreationDate(createDate);
        brand.setUpdateDate(new Date());
        Brand updateBrand = brandRepository.saveAndFlush(brand);
        return updateBrand;
    }

    public void remove(Long id) {
        Brand brand = brandRepository.findById(id).get();
        brandRepository.delete(brand);

    }
}
