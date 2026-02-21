package com.teamfineshyt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.teamfineshyt.enums.OffereStatus;

@Entity
@Table(name = "exchange_offers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "targetProduct_id", nullable = false)
    private Product targetProduct;

    @ManyToOne
    @JoinColumn(name = "offeredProduct_id",nullable = false)
    private Product offeredProduct;

    @ManyToOne
    @JoinColumn(name = "fromUser_id",nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "toUser_id",nullable = false)
    private User toUser;

    @Enumerated(EnumType.STRING)
    private OffereStatus status;

    private Date proposedAt;

}
