package com.teamfineshyt.mapper;

import com.teamfineshyt.dto.category.CategoryRequest;
import com.teamfineshyt.dto.category.CategoryResponse;
import com.teamfineshyt.model.Category;

public class CategoryMapper {
    public static Category toCategoryEntity(CategoryRequest request) {
        return Category.builder()
                .categoryName(request.getCategoryName().trim())
                .details(request.getDetails())
                .build();
    }

    public static CategoryResponse toCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .details(category.getDetails())
                .build();
    }
}
