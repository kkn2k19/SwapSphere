package com.teamfineshyt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
   List<Product> findByOwner(User owner);

   @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.images")
   List<Product> findAllWithImages();

   @Query("""
         SELECT p FROM Product p
         LEFT JOIN FETCH p.images
         LEFT JOIN FETCH p.category
         LEFT JOIN FETCH p.owner
         WHERE p.id = :id
         """)
   Optional<Product> findByIdWithImages(@Param("id") Long id);
}
