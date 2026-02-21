package com.teamfineshyt.dto.product;

import com.teamfineshyt.enums.ProductCondition;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String categoryName; // user sends category name only

    private ProductCondition condition;
    private Double price;
}
