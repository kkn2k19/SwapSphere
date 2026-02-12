package com.teamfineshyt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRequest {
    private Long targetProduct;
    private Long offeredProduct;
    private Long fromUser;
    private Long toUser;
}
