package com.teamfineshyt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.model.User;
import com.teamfineshyt.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProductCardResponse> addProduct(
            @RequestBody ProductRequest request,
            Authentication auth) {
        return ResponseEntity.ok(
                productService.addProduct(request, auth.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProductCardResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request,
            Authentication auth) {
        return ResponseEntity.ok(
                productService.updateProduct(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id,
            Authentication auth) {
        productService.deleteProduct(id, auth.getName());
        return ResponseEntity.ok("Deletetion successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ProductCardResponse>> myProducts(Authentication auth) {
        return ResponseEntity.ok(
                productService.getProductByUser(auth.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ProductCardResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping("/{id}/images")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> uploadImages(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files,
            Authentication auth) {
        productService.uploadImages(id, files, auth.getName());
        return ResponseEntity.ok("Image uploaded successfully");

    }

    @DeleteMapping("/images/{imageId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteImage(
            @PathVariable Long id,
            Authentication auth) {
        productService.deleteImage(id, auth.getName());
        return ResponseEntity.ok("Image deleted successfully");
    }
}
