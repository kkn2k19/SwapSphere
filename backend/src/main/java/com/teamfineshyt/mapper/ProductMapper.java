package com.teamfineshyt.mapper;

import java.util.Date;

import com.teamfineshyt.dto.ProductRequest;
import com.teamfineshyt.dto.ProductResponse;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;

public class ProductMapper {
    public static Product ToProductEntity(ProductRequest request, Category category, User user){
        if(category == null || request == null || user == null) return null;

        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(category)
                .owner(user)
                .listingDate(new Date())
                .build();

    }
    public static ProductResponse toProductResponse(Product product){
        return ProductResponse.builder()
                .id(product.getProductId())
                .name(product.getName())
                .userId(product.getOwner().getId())
                .categoryName(product.getCategory().getCategoryName())
                .listedDate(product.getListingDate())
                .build();
    }
}
