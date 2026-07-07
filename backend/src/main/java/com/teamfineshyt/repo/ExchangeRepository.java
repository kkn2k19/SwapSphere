package com.teamfineshyt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamfineshyt.enums.OfferStatus;
import com.teamfineshyt.model.Exchange;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
    List<Exchange> findByFromUser(User user);

    List<Exchange> findByToUser(User user);

    List<Exchange> findByTargetProductAndStatus(Product product, OfferStatus status);

    boolean existsByTargetProductAndStatus(Product product, OfferStatus status);

    boolean existsByTargetProduct(Product product);

    // boolean existsByTargetProductAndFromUser(Product product, User user);
    boolean existsByTargetProductAndFromUserAndStatus(Product product, User user, OfferStatus status);
}
