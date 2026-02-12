package com.teamshyt.service;

import com.teamshyt.dto.ProductRequest;
import com.teamshyt.dto.ProductResponse;
import com.teamshyt.mapper.ProductMapper;
import com.teamshyt.model.Category;
import com.teamshyt.model.Product;
import com.teamshyt.model.User;
import com.teamshyt.repo.CategoryRepository;
import com.teamshyt.repo.ProductRepository;
import com.teamshyt.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public ProductResponse addProduct(ProductRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(
                ()-> new RuntimeException("User not found with Userid : "+ request.getUserId())
        );

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                ()-> new RuntimeException("Category Not found with categoryId: "+ request.getCategoryId())
        );

        Product product = ProductMapper.ToProductEntity(request,category,user);
        Product newProduct = productRepository.save(product);
        return ProductMapper.toProductResponse(newProduct);

    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Product Not found with id : "+id)
        );

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                ()-> new RuntimeException("Category not found with id : "+request.getCategoryId())
        );

        User user = userRepository.findById(request.getUserId()).orElseThrow(
                ()-> new RuntimeException("User not found with id : "+request.getUserId())
        );

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(category);
        product.setOwner(user);
        product.setListingDate(new Date());

        Product newProduct = productRepository.save(product);
        return ProductMapper.toProductResponse(newProduct);
    }

    @Override
    public void deleteProduct(Long id) {
       Product product = productRepository.findById(id).orElseThrow(
               ()-> new RuntimeException("Product not found with id : " +id)
       );
       productRepository.delete(product);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(
                ()->new RuntimeException("Product not found with id : "+id)
        );
        return ProductMapper.toProductResponse(product);
    }

    @Override
    public List<ProductResponse> getProductByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                ()-> new RuntimeException("User not found with id : "+userId)
        );
        List<Product>products = productRepository.findByOwner(user);
        return products.stream()
                .map(ProductMapper::toProductResponse)
                .toList();
    }

//    @Override
//    public List<ProductResponse> getProductByUser(User user) {
//
//        if(user == null)return List.of();
//
//        List<Product> products = productRepository.findByOwner(user);
//
//        if(products.isEmpty())return List.of();
//
//        return products.stream()
//                .map(ProductMapper::toProductResponse)
//                .toList();
//    }

    @Override
    public List<ProductResponse> getAllProduct() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toProductResponse)
                .collect(Collectors.toList());
    }
}
