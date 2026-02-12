package com.teamfineshyt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
private Long id;
private String name;
private Long userId;
private String categoryName;
private Date listedDate;
}
