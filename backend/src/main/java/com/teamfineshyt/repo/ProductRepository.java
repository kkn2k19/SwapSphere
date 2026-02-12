package com.teamfineshyt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
   List<Product>findByOwner(User owner);
}
