package com.teamshyt.service;

import com.teamshyt.dto.CategoryRequest;
import com.teamshyt.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse updateCategory(Long id,CategoryRequest request);
    void deleteCategory(Long id);
    List<CategoryResponse> getAllCategory();
}
