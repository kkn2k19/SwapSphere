package com.teamfineshyt.dto.admin;

import com.teamfineshyt.enums.ProductStatus;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminProductResponse {
    private Long id;
    private String title;
    private String category;
    private Double price;
    private String ownerEmail;
    private ProductStatus status;
}
