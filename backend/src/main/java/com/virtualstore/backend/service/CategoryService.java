package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.Category;
import com.virtualstore.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category create(Category category) {
        category.setCreationDate(new Date());
        Category newCategory = categoryRepository.saveAndFlush(category);
        return newCategory;
    }

    public Category update(Category category) {
        Category existingCategory = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria inválida!"));
        Date createDate = existingCategory.getCreationDate();

        category.setCreationDate(createDate);
        category.setUpdateDate(new Date());
        Category updateCategory = categoryRepository.saveAndFlush(category);
        return updateCategory;
    }

    public void remove(Long id) {
        Category category = categoryRepository.findById(id).get();
        categoryRepository.delete(category);
    }

}
