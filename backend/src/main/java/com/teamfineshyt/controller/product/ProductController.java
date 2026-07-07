package com.teamfineshyt.controller.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.enums.ProductCondition;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.service.ProductService;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // add product with images
    @PostMapping(value = "/add", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProductCardResponse> addProduct(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String categoryName,
            @RequestParam ProductCondition condition,
            @RequestParam Double price,
            @RequestParam MultipartFile[] files,
            Authentication auth) {

        return ResponseEntity.ok(
                productService.addProductWithImages(
                        title,
                        description,
                        categoryName,
                        condition,
                        price,
                        files,
                        auth.getName()));
    }

    // update product details (not images)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProductCardResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request,
            Authentication auth) {
        return ResponseEntity.ok(
                productService.updateProduct(id, request, auth.getName()));
    }

    // delete product
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id,
            Authentication auth) {
        productService.deleteProduct(id, auth.getName());
        return ResponseEntity.ok("Product deleted successfully");
    }

    // get my products - user own added/listed products
    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ProductCardResponse>> myProducts(Authentication auth) {
        return ResponseEntity.ok(
                productService.getProductByUser(auth.getName()));
    }

    // get product details by id
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // get all products (homepage)
    @GetMapping
    public ResponseEntity<List<ProductCardResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // get category values - form enums
    @GetMapping("/productConditions")
    public ProductCondition[] getConditions() {
        return ProductCondition.values();
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<?> getProductByCategory(
            @PathVariable String categoryName) {
        List<ProductCardResponse> products = productService.getProductByCategory(categoryName);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/user/{ownerEmail}")
    public ResponseEntity<List<ProductCardResponse>> getProductsByOwnerEmail(
            @PathVariable String ownerEmail) {
        return ResponseEntity.ok(productService.getProductByUser(ownerEmail));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductCardResponse>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }

}