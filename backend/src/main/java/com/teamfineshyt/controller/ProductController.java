package com.teamshyt.controller;

import com.teamshyt.dto.ProductRequest;
import com.teamshyt.dto.ProductResponse;
import com.teamshyt.model.User;
import com.teamshyt.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest request){
        return ResponseEntity.ok(productService.addProduct(request));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,
                                                          @RequestBody ProductRequest request){
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.ok("Deletetion successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<List<ProductResponse>> getProductByUser(@PathVariable Long userId){
        return ResponseEntity.ok(productService.getProductByUser(userId));
    }

    @GetMapping("/get")
    public ResponseEntity<List<ProductResponse>> getAllProduct(){
        return ResponseEntity.ok(productService.getAllProduct());
    }
}
