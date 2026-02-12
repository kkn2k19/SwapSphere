package com.teamshyt.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "category_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String categoryName;  //Products will be divided into categories like CLOTHES,ELECTRONICS,
    // SPORTS,SHOES etc (will be updated later with more details).

   private String details;
}
