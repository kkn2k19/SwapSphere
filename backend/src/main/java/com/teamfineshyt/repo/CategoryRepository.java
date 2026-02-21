package com.teamfineshyt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamfineshyt.model.Category;
import com.teamfineshyt.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Optional<Category> findByName(String name);
    boolean existsByCategoryName(String categoryName);

    Optional<Category> findByNameIgnoreCase(String categoryName);
}
