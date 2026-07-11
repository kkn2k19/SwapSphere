package com.teamfineshyt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.teamfineshyt.enums.ProductStatus;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;

import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
      List<Product> findByOwner(User owner);

      // @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.images")
      // List<Product> findAllWithImages();

      @Query("""
                  SELECT DISTINCT p
                  FROM Product p
                  LEFT JOIN FETCH p.images
                  WHERE p.status = com.teamfineshyt.enums.ProductStatus.ACTIVE
                  ORDER BY p.createdAt DESC
                  """)
      List<Product> findAllActiveWithImages();

      @Query("""
                  SELECT p FROM Product p
                  LEFT JOIN FETCH p.images
                  LEFT JOIN FETCH p.category
                  LEFT JOIN FETCH p.owner
                  WHERE p.id = :id
                  """)
      Optional<Product> findByIdWithImages(@Param("id") Long id);

      // List<Product> findByCategory_CategoryNameIgnoreCase(String categoryName);
      List<Product> findByCategory_CategoryNameIgnoreCaseAndStatus(String categoryName, ProductStatus status);

      @Lock(LockModeType.PESSIMISTIC_WRITE)
      @Query("SELECT p FROM Product p WHERE p.id = :id")
      Optional<Product> findByIdForUpdate(@Param("id") Long id);

      @Query("""
                              SELECT p
                              FROM Product p
                              JOIN p.category c
                              WHERE
                              p.status = com.teamfineshyt.enums.ProductStatus.ACTIVE
                              AND (
                              LOWER(p.title)
                              LIKE LOWER(CONCAT('%',:keyword,'%'))
                              OR
                              LOWER(p.description)
                              LIKE LOWER(CONCAT('%',:keyword,'%'))
                              OR
                              LOWER(c.categoryName)
                              LIKE LOWER(CONCAT('%',:keyword,'%'))
                  )
                              ORDER BY p.createdAt DESC
                              """)
      List<Product> searchProducts(
                  @Param("keyword") String keyword);

      @Transactional
      void deleteByOwner(User owner);
}
