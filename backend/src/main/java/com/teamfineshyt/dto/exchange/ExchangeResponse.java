package com.teamfineshyt.dto.exchange;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import com.teamfineshyt.enums.OfferStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExchangeResponse {
    private Long id;

    private Long targetProductId;
    private String targetProductTitle;

    private List<Long> offeredProductsIds;
    private List<String> offeredProductTitles;

    private String fromUser;
    private String toUser;

    private String fromUserEmail;
    private String toUserEmail;

    private String status;

    private LocalDateTime offeredDate;
    private LocalDateTime processedAt;
}
