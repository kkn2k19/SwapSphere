package com.teamfineshyt.mapper;

import com.teamfineshyt.dto.CategoryRequest;
import com.teamfineshyt.dto.CategoryResponse;
import com.teamfineshyt.model.Category;

public class CategoryMapper {
    public static Category toCategoryEntity(CategoryRequest request){
        return Category.builder()
                .categoryName(request.getName())
                .details(request.getDetails())
                .build();
    }

    public static CategoryResponse toCategoryResponse(Category category){
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getCategoryName())
                .details(category.getDetails())
                .build();
    }
}
