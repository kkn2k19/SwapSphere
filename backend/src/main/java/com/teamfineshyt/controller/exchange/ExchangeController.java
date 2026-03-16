package com.teamfineshyt.controller.exchange;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.dto.exchange.ExchangeRequest;
import com.teamfineshyt.dto.exchange.ExchangeResponse;
import com.teamfineshyt.service.ExchangeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/exchanges")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class ExchangeController {
    private final ExchangeService exchangeService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ExchangeResponse sendExchange(
            @RequestBody ExchangeRequest request,
            Authentication auth) {
        return exchangeService.sendRequest(request, auth.getName());
    }

    @GetMapping("/sent")
    public List<ExchangeResponse> sent(Authentication auth) {
        return exchangeService.sentRequests(auth.getName());
    }

    @GetMapping("/received")
    public List<ExchangeResponse> received(Authentication auth) {
        return exchangeService.receivedRequests(auth.getName());
    }

    @PutMapping("/{id}/accept")
    public String accept(@PathVariable Long id, Authentication auth) {

        exchangeService.acceptExchange(id, auth.getName());
        return "Exchange accepted";
    }

    @PutMapping("/{id}/reject")
    public String reject(@PathVariable Long id, Authentication auth) {

        exchangeService.rejectExchange(id, auth.getName());
        return "Exchange rejected";
    }

    @DeleteMapping("/{id}")
    public String cancel(@PathVariable Long id, Authentication auth) {
        exchangeService.cancelExchange(id, auth.getName());
        return "Exchange Cancelled";
    }
}
