package com.teamshyt.dto;

import com.teamshyt.model.OffereStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
