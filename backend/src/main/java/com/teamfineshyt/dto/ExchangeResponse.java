package com.teamfineshyt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.teamfineshyt.enums.OffereStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExchangeResponse {
    private Long id;
    private Long targetProduct;
    private Long offeredProduct;
    private Long fromUser;
    private Long toUser;
    private OffereStatus status;
    private Date offeredDate;
}
