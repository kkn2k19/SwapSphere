package com.teamfineshyt.controller.admin;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.dto.exchange.ExchangeResponse;
import com.teamfineshyt.mapper.ExchangeMapper;
import com.teamfineshyt.model.Exchange;
import com.teamfineshyt.repo.ExchangeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/exchanges")
@PreAuthorize("hasRole('ADMIN')")
public class AdminExchangeController {
    private final ExchangeRepository exchangeRepository;

    @GetMapping
    public List<ExchangeResponse> getAllExchanges(Authentication auth) {
        return exchangeRepository.findAll()
                .stream()
                .map(e -> ExchangeMapper.toResponse(e, auth.getName()))
                .toList();
    }

    @GetMapping("/{id}")
    public ExchangeResponse getExchangeById(@PathVariable Long id, Authentication auth) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        return ExchangeMapper.toResponse(exchange, auth.getName());
    }
}
