package com.teamfineshyt.controller.image;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ImageController {

    private final ProductService productService;

    // delete single image
    @DeleteMapping("/images/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteImage(
            @PathVariable Long id,
            Authentication auth) {
        productService.deleteImage(id, auth.getName());
        return ResponseEntity.ok("Image deleted successfully");
    }

    // add more images to existing product
    @PostMapping(value = "/{id}/images", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> uploadIamges(
            @PathVariable Long id,
            @RequestParam MultipartFile[] files,
            Authentication auth) {
        productService.uploadImages(id, files, auth.getName());
        return ResponseEntity.ok("Images uploaded successfully");
    }

    // set thumbnail
    @PutMapping("/images/{imageId}/thumbnail")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> setThumbnail(
            @PathVariable Long imageId,
            Authentication auth) {
        productService.setThumbnail(imageId, auth.getName());
        return ResponseEntity.ok("Thumbnail updated");
    }
}
