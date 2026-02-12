package com.teamshyt.mapper;

import com.teamshyt.dto.ProductRequest;
import com.teamshyt.dto.ProductResponse;
import com.teamshyt.model.Category;
import com.teamshyt.model.Product;
import com.teamshyt.model.User;

import java.util.Date;

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
