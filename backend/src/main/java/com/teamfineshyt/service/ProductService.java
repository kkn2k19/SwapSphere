package com.teamshyt.service;

import com.teamshyt.dto.ProductRequest;
import com.teamshyt.dto.ProductResponse;
import com.teamshyt.model.User;

import java.util.List;

public interface ProductService {
    ProductResponse addProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    ProductResponse getProductById(Long id);
    List<ProductResponse> getProductByUser(Long userId);
    List<ProductResponse> getAllProduct();
}
