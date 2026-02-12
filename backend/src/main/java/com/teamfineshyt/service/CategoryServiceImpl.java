package com.teamshyt.service;

import com.teamshyt.dto.CategoryRequest;
import com.teamshyt.dto.CategoryResponse;
import com.teamshyt.mapper.CategoryMapper;
import com.teamshyt.model.Category;
import com.teamshyt.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if(categoryRepository.existsByCategoryName(request.getName())){
            throw new RuntimeException("Category Already exist with name"+ request.getName());
        }
        Category category = CategoryMapper.toCategoryEntity(request);
        Category newCategory = categoryRepository.save(category);
        return CategoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(()->
                new RuntimeException("Category not found with ID : "+id));
        category.setCategoryName(request.getName());
        category.setDetails(request.getDetails());

        Category newCategory = categoryRepository.save(category);
        return CategoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(()->
                new RuntimeException("Category not found with id : "+id));
        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryResponse> getAllCategory() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toCategoryResponse)
                .collect(Collectors.toList());
    }
}
