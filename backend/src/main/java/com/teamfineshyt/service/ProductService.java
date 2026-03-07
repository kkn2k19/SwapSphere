package com.teamfineshyt.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.enums.ProductCondition;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.model.User;

public interface ProductService {
    ProductCardResponse updateProduct(Long id, ProductRequest request, String email);

    void deleteProduct(Long id, String email);

    ProductDetailResponse getProductById(Long id);

    List<ProductCardResponse> getProductByUser(String email);

    List<ProductCardResponse> getAllProducts();

    void uploadImages(Long productId, MultipartFile[] files, String email);

    void deleteImage(Long imageId, String email);

    ProductCardResponse addProductWithImages(String title, String description, String categoryName,
            ProductCondition condition, Double price, MultipartFile[] files, String email);

    void setThumbnail(Long imageId, String email);

    List<ProductCardResponse> getProductByCategory(String categoryName);
}
