package com.teamfineshyt.mapper;

import com.teamfineshyt.dto.exchange.ExchangeResponse;
import com.teamfineshyt.model.Exchange;
import com.teamfineshyt.model.Product;

public class ExchangeMapper {
        public static ExchangeResponse toResponse(Exchange exchange, String currentUserEmail) {
                return ExchangeResponse.builder()
                                .id(exchange.getId())

                                .targetProductId(exchange.getTargetProduct().getId())
                                .targetProductTitle(exchange.getTargetProduct().getTitle())

                                .offeredProductsIds(
                                                exchange.getOfferedProducts()
                                                                .stream()
                                                                .map(Product::getId)
                                                                .toList())

                                .offeredProductTitles(
                                                exchange.getOfferedProducts()
                                                                .stream()
                                                                .map(Product::getTitle)
                                                                .toList())

                                .fromUser(exchange.getFromUser().getName())
                                .toUser(exchange.getToUser().getName())

                                .fromUserEmail(exchange.getFromUser().getEmail())
                                .toUserEmail(exchange.getToUser().getEmail())

                                .status(exchange.getStatus().name())

                                .offeredDate(exchange.getProposedAt())
                                .processedAt(exchange.getProcessedAt())

                                .isSender(exchange.getFromUser().getEmail().equals(currentUserEmail))
                                .isReceiver(exchange.getToUser().getEmail().equals(currentUserEmail))

                                .build();
        }
}
