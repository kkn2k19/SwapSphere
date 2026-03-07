package com.teamfineshyt.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public Map uploadFile(MultipartFile file) {
        try {
            // Map uploadResult = cloudinary.uploader().upload(
            // file.getBytes(),
            // ObjectUtils.asMap("folder", "foodapp"));
            // return uploadResult;

            return cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", "swapsphere"));
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Image deletion failed: " + e.getMessage());
        }
    }
}