package com.teamfineshyt.mapper;

import java.util.Date;
import java.util.List;

import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.ProductImage;
import com.teamfineshyt.model.User;

public class ProductMapper {
        public static ProductCardResponse toCardResponse(Product product) {
                String thumbnail = product.getImages()
                                .stream()
                                .filter(ProductImage::isThumbnail)
                                .map(ProductImage::getImageUrl)
                                .findFirst()
                                .orElse(null);

                return ProductCardResponse.builder()
                                .id(product.getId())
                                .title(product.getTitle())
                                .price(product.getPrice())
                                .categoryName(product.getCategory().getCategoryName())
                                .thumbnailUrl(thumbnail)
                                .build();
        }

        public static ProductDetailResponse toDetailResponse(Product product) {
                List<String> images = product.getImages()
                                .stream()
                                .map(ProductImage::getImageUrl)
                                .toList();

                return ProductDetailResponse.builder()
                                .id(product.getId())
                                .title(product.getTitle())
                                .description(product.getDescription())
                                .categoryName(product.getCategory().getCategoryName())
                                .condition(product.getCondition())
                                .status(product.getStatus())
                                .price(product.getPrice())
                                .ownerName(product.getOwner().getName())
                                .createdAt(product.getCreatedAt())
                                .images(images)
                                .build();
        }
}
