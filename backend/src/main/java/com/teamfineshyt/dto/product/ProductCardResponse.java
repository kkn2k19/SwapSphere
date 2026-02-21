package com.teamfineshyt.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCardResponse {
    private Long id;
    private String title;
    private Double price;
    private String categoryName;
    private String thumbnailUrl;
}
