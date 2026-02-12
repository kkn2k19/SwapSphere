package com.teamshyt.mapper;

import com.teamshyt.dto.CategoryRequest;
import com.teamshyt.dto.CategoryResponse;
import com.teamshyt.model.Category;

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
