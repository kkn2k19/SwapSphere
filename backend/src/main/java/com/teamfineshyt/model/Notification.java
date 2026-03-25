package com.teamfineshyt.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private String type;// EXCHANGE, PRODUCT, etc
    private Long referenceId; // exchangeId or productId

    @Builder.Default
    @Column(name = "is_read")
    private boolean read = false;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
