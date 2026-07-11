package com.teamfineshyt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Modifying
    @Query(value = """
            DELETE eop
            FROM exchange_offer_products eop
            JOIN exchange_offers eo
            ON eo.id = eop.exchange_id
            WHERE eo.from_user_id = :id
            OR eo.to_user_id = :id
            """, nativeQuery = true)
    void deleteExchangeOfferProductsByUser(@Param("id") Long id);

    @Transactional
    void deleteByFromUser(User user);

    @Transactional
    void deleteByToUser(User user);
}
