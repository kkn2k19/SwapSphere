package com.teamfineshyt.dto.exchange;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRequest {
    private Long targetProductId;
    private List<Long> offeredProductIds;
}
