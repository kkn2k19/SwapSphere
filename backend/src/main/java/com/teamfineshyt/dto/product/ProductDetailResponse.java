package com.teamfineshyt.dto.product;

import java.time.LocalDateTime;
import java.util.List;

import com.teamfineshyt.enums.ProductCondition;
import com.teamfineshyt.enums.ProductStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailResponse {
    private Long id;
    private String title;
    private String description;
    private String categoryName;
    private ProductCondition condition;
    private ProductStatus status;
    private Double price;
    private String ownerName;
    private LocalDateTime createdAt;
    private List<String> images;
}
