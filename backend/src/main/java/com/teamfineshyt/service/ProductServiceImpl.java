package com.teamfineshyt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.teamfineshyt.dto.product.ProductRequest;
import com.teamfineshyt.enums.ProductStatus;
import com.teamfineshyt.dto.product.ProductCardResponse;
import com.teamfineshyt.dto.product.ProductDetailResponse;
import com.teamfineshyt.mapper.ProductMapper;
import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.ProductImage;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.CategoryRepository;
import com.teamfineshyt.repo.ProductImageRespository;
import com.teamfineshyt.repo.ProductRepository;
import com.teamfineshyt.repo.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
        private final UserRepository userRepository;
        private final CategoryRepository categoryRepository;
        private final ProductRepository productRepository;

        private final CloudinaryService cloudinaryService;
        private final ProductImageRespository productImageRespository;

        @Override
        public ProductCardResponse addProduct(ProductRequest request, String email) {
                User owner = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Category category = categoryRepository.findByNameIgnoreCase(request.getCategoryName())
                                .orElseGet(() -> {
                                        Category newCategory = Category.builder()
                                                        .name(request.getCategoryName().trim())
                                                        .build();
                                        return categoryRepository.save(newCategory);
                                });

                Product product = Product.builder()
                                .title(request.getTitle())
                                .description(request.getDescription())
                                .category(category)
                                .condition(request.getCondition())
                                .price(request.getPrice())
                                .status(ProductStatus.ACTIVE)
                                .owner(owner)
                                .build();

                return ProductMapper.toCardResponse(
                                productRepository.save(product));
        }

        @Override
        public ProductCardResponse updateProduct(Long id, ProductRequest request, String email) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("You are not allowed to update this this product");
                }

                Category category = categoryRepository.findByNameIgnoreCase(request.getCategoryName()).orElseGet(() -> {
                        Category newCategory = Category.builder()
                                        .name(request.getCategoryName())
                                        .build();
                        return categoryRepository.save(newCategory);
                });

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

                productRepository.delete(product);
        }

        @Override
        public ProductDetailResponse getProductById(Long id) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                return ProductMapper.toDetailResponse(product);
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
        public List<ProductCardResponse> getAllProducts() {
                return productRepository.findAll()
                                .stream()
                                .map(ProductMapper::toCardResponse)
                                .toList();
        }

        @Override
        public void uploadImages(Long productId, MultipartFile[] files, String email) {
                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("You are not allowed to upload images");
                }

                boolean hasThumbnail = product.getImages()
                                .stream()
                                .anyMatch(ProductImage::isThumbnail);

                for (MultipartFile file : files) {
                        Map uploadResult = cloudinaryService.upploadImage(file);

                        ProductImage image = new ProductImage();
                        image.setImageUrl(uploadResult.get("secure_url").toString());
                        image.setPublicId(uploadResult.get("public_id").toString());
                        image.setProduct(product);

                        if (!hasThumbnail) {
                                image.setThumbnail(true);
                                hasThumbnail = true;
                        }
                        product.getImages().add(image);
                }
                productRepository.save(product);
        }

        @Override
        public void deleteImage(Long imageId, String email) {
                ProductImage image = productImageRespository.findById(imageId)
                                .orElseThrow(() -> new RuntimeException("Image not found"));

                Product product = image.getProduct();

                if (!product.getOwner().getEmail().equals(email)) {
                        throw new RuntimeException("you are not allowed to delete this image");
                }

                cloudinaryService.deleteImage(image.getPublicId());

                boolean wasThumbnail = image.isThumbnail();

                product.getImages().remove(image);
                productImageRespository.delete(image);

                if (wasThumbnail && !product.getImages().isEmpty()) {
                        product.getImages().get(0).setThumbnail(true);
                }
                productRepository.save(product);
        }
}
