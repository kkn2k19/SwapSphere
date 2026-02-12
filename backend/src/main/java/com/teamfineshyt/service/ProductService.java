package com.teamfineshyt.service;

import java.util.List;

import com.teamfineshyt.dto.ProductRequest;
import com.teamfineshyt.dto.ProductResponse;
import com.teamfineshyt.model.User;

public interface ProductService {
    ProductResponse addProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    ProductResponse getProductById(Long id);
    List<ProductResponse> getProductByUser(Long userId);
    List<ProductResponse> getAllProduct();
}
