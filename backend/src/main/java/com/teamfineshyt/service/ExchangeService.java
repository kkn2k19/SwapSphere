package com.teamfineshyt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamfineshyt.dto.exchange.ExchangeRequest;
import com.teamfineshyt.dto.exchange.ExchangeResponse;

public interface ExchangeService {
    ExchangeResponse sendRequest(ExchangeRequest request, String email);

    List<ExchangeResponse> sentRequests(String email);

    List<ExchangeResponse> receivedRequests(String email);

    void acceptExchange(Long id, String email);

    void rejectExchange(Long id, String email);

    void cancelExchange(Long id, String email);

    ExchangeResponse getExchangeById(Long id, String name);
}