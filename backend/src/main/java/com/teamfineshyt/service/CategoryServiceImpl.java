package com.teamfineshyt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.teamfineshyt.dto.category.CategoryRequest;
import com.teamfineshyt.dto.category.CategoryResponse;
import com.teamfineshyt.mapper.CategoryMapper;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.repo.CategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByCategoryNameIgnoreCase(request.getCategoryName())) {
            throw new RuntimeException("Category Already exists");
        }
        Category category = CategoryMapper.toCategoryEntity(request);
        Category newCategory = categoryRepository.save(category);
        return CategoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getCategoryName().equalsIgnoreCase(request.getCategoryName())
                && categoryRepository.existsByCategoryNameIgnoreCase(request.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        category.setCategoryName(request.getCategoryName().trim());
        category.setDetails(request.getDetails());

        Category newCategory = categoryRepository.save(category);
        return CategoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Safe delete
        if (category.getProducts() != null && !category.getProducts().isEmpty()) {
            throw new RuntimeException("Cannot delete category with existing products");
        }

        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryResponse> getAllCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toCategoryResponse)
                .toList();
    }
}
