package com.teamfineshyt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.teamfineshyt.enums.OfferStatus;

@Entity
@Table(name = "exchange_offers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "target_product_id", nullable = false)
    private Product targetProduct;

    @ManyToMany
    @JoinTable(name = "exchange_offer_products", joinColumns = @JoinColumn(name = "exchange_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> offeredProducts;

    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private User toUser;

    @Enumerated(EnumType.STRING)
    private OfferStatus status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime proposedAt;

    private LocalDateTime processedAt;

}
