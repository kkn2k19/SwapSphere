package com.teamfineshyt.service;

import com.teamfineshyt.repo.ExchangeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.enums.ProductCondition;
import com.teamfineshyt.enums.ProductStatus;
import com.teamfineshyt.mapper.ProductMapper;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.ProductImage;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.CategoryRepository;
import com.teamfineshyt.repo.ProductImageRespository;
import com.teamfineshyt.repo.ProductRepository;
import com.teamfineshyt.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
        private final ExchangeRepository exchangeRepository;
        private final UserRepository userRepository;
        private final CategoryRepository categoryRepository;
        private final ProductRepository productRepository;
        private final ProductImageRespository productImageRepository;
        private final CloudinaryService cloudinaryService;

        @Override
        public ProductCardResponse addProductWithImages(String title,
                        String description,
                        String categoryName,
                        ProductCondition condition,
                        Double price,
                        MultipartFile[] files,
                        String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Category category = categoryRepository.findByCategoryNameIgnoreCase(categoryName)
                                .orElseThrow(() -> new RuntimeException("Category not found"));

                Product product = Product.builder()
                                .title(title)
                                .description(description)
                                .category(category)
                                .condition(condition)
                                .status(ProductStatus.ACTIVE)
                                .price(price)
                                .owner(user)
                                .build();

                productRepository.save(product);

                product.setImages(new ArrayList<>());

                if (files != null && files.length > 0) {
                        for (int i = 0; i < files.length; i++) {
                                Map upload = cloudinaryService.uploadFile(files[i]);

                                ProductImage image = new ProductImage();
                                image.setImageUrl(upload.get("secure_url").toString());
                                image.setPublicId(upload.get("public_id").toString());
                                image.setProduct(product);

                                if (i == 0) {
                                        image.setThumbnail(true);
                                }
                                productImageRepository.save(image);

                                product.getImages().add(image);
                        }
                }
                return ProductMapper.toCardResponse(product);
        }

        @Override
        public List<ProductCardResponse> getAllProducts() {
                return productRepository.findAllWithImages()
                                .stream()
                                .map(ProductMapper::toCardResponse)
                                .toList();
        }

        @Override
        public ProductDetailResponse getProductById(Long id) {
                Product product = productRepository.findByIdWithImages(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                return ProductMapper.toDetailResponse(product);
        }

        @Override
        public ProductCardResponse updateProduct(Long id, ProductRequest request, String email) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("You are not allowed to update this this product");
                }

                if (product.getStatus() != ProductStatus.ACTIVE) {
                        throw new RuntimeException("Only active products can be edited");
                }

                Category category = categoryRepository
                                .findByCategoryNameIgnoreCase(request.getCategoryName())
                                .orElseThrow(() -> new RuntimeException("Category not found"));

                product.setTitle(request.getTitle());
                product.setDescription(request.getDescription());
                product.setCategory(category);
                product.setCondition(request.getCondition());
                product.setPrice(request.getPrice());

                return ProductMapper.toCardResponse(
                                productRepository.save(product));
        }

        @Override
        public void deleteProduct(Long id, String email) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("You are not allowed to delete this product");
                }
                if (exchangeRepository.existsByTargetProduct(product)) {
                        throw new RuntimeException("Cannot delete product involved in exchange");
                }
                // delete images from cloudinary first
                for (ProductImage image : product.getImages()) {
                        cloudinaryService.deleteImage(image.getPublicId());
                }

                productRepository.delete(product);
        }

        @Override
        public List<ProductCardResponse> getProductByUser(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return productRepository.findByOwner(user)
                                .stream()
                                .map(ProductMapper::toCardResponse)
                                .toList();
        }

        @Override
        public void uploadImages(Long productId, MultipartFile[] files, String email) {
                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                if (product.getImages().size() + files.length > 5) {
                        throw new RuntimeException("Maximum 5 images allowed per products");
                }

                if (files.length > 5) {
                        throw new RuntimeException("Maximum 5 images allowed");
                }

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("You are not allowed to upload images");
                }

                boolean hasThumbnail = product.getImages()
                                .stream()
                                .anyMatch(ProductImage::isThumbnail);

                for (MultipartFile file : files) {
                        Map uploadResult = cloudinaryService.uploadFile(file);

                        ProductImage image = new ProductImage();
                        image.setImageUrl(uploadResult.get("secure_url").toString());
                        image.setPublicId(uploadResult.get("public_id").toString());
                        image.setProduct(product);

                        if (!hasThumbnail) {
                                image.setThumbnail(true);
                                hasThumbnail = true;
                        }
                        productImageRepository.save(image);
                        product.getImages().add(image);
                }
                productRepository.save(product);
        }

        @Override
        public void deleteImage(Long imageId, String email) {
                ProductImage image = productImageRepository.findById(imageId)
                                .orElseThrow(() -> new RuntimeException("Image not found"));

                Product product = image.getProduct();

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("you are not allowed to delete this image");
                }

                cloudinaryService.deleteImage(image.getPublicId());

                boolean wasThumbnail = image.isThumbnail();

                product.getImages().remove(image);
                productImageRepository.delete(image);

                if (wasThumbnail && !product.getImages().isEmpty()) {
                        product.getImages().get(0).setThumbnail(true);
                }
                productRepository.save(product);
        }

        @Override
        public void setThumbnail(Long imageId, String email) {
                ProductImage image = productImageRepository.findById(imageId)
                                .orElseThrow(() -> new RuntimeException("Image not found"));
                Product product = image.getProduct();
                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("Not allowed");
                }

                // remove old thumbnail
                product.getImages().forEach(img -> img.setThumbnail(false));

                // set new thumbnail
                image.setThumbnail(true);

                productRepository.save(product);
        }

        @Override
        public List<ProductCardResponse> getProductByCategory(String categoryName) {
                return productRepository.findByCategory_CategoryNameIgnoreCase(categoryName)
                                .stream()
                                .map(ProductMapper::toCardResponse)
                                .toList();
        }

        @Override
        public List<ProductCardResponse> searchProducts(String keyword) {
                return productRepository
                                .searchProducts(keyword)
                                .stream()
                                .map(ProductMapper::toCardResponse)
                                .toList();
        }
}
