package com.teamfineshyt.dto.admin;

import com.teamfineshyt.enums.ProductStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminProductResponse {
    private Long id;
    private String title;
    private String category;
    private Double price;
    private String OwnerEmail;
    private ProductStatus status;
}
