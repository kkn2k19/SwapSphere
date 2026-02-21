package com.teamfineshyt.service;

import java.util.List;

import com.teamfineshyt.dto.category.CategoryRequest;
import com.teamfineshyt.dto.category.CategoryResponse;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);

    List<CategoryResponse> getAllCategory();
}
