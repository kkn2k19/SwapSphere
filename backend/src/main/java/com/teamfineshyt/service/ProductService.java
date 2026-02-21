package com.teamfineshyt.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.model.User;

public interface ProductService {
    ProductCardResponse addProduct(ProductRequest request, String email);

    ProductCardResponse updateProduct(Long id, ProductRequest request, String email);

    void deleteProduct(Long id, String email);

    ProductDetailResponse getProductById(Long id);

    List<ProductCardResponse> getProductByUser(String email);

    List<ProductCardResponse> getAllProducts();

    void uploadImages(Long productId, MultipartFile[] files, String email);

    void deleteImage(Long imageId, String email);
}
