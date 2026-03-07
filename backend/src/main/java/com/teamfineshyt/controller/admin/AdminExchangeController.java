package com.teamfineshyt.controller.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/exchanges")
@PreAuthorize("hasRole('ADMIN')")
public class AdminExchangeController {
    @GetMapping
    public String getAllExchanges() {
        return "All exchanges";
    }
}
