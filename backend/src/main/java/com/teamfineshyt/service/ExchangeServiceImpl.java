package com.teamfineshyt.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamfineshyt.dto.exchange.ExchangeRequest;
import com.teamfineshyt.dto.exchange.ExchangeResponse;
import com.teamfineshyt.enums.OfferStatus;
import com.teamfineshyt.enums.ProductStatus;
import com.teamfineshyt.mapper.ExchangeMapper;
import com.teamfineshyt.model.Exchange;
import com.teamfineshyt.model.Product;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.ExchangeRepository;
import com.teamfineshyt.repo.ProductRepository;
import com.teamfineshyt.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ExchangeServiceImpl implements ExchangeService {
    private final ExchangeRepository exchangeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public ExchangeResponse sendRequest(ExchangeRequest request, String email) {
        User sender = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Product targetProduct = productRepository.findById(request.getTargetProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (targetProduct.getOwner().getEmail().equals(email)) {
            throw new RuntimeException("You cannot exchange your own product");
        }

        if (exchangeRepository.existsByTargetProductAndFromUser(targetProduct, sender)) {
            throw new RuntimeException("You already sent an exchange request for this product");
        }

        if (targetProduct.getStatus() != ProductStatus.ACTIVE) {
            throw new RuntimeException("Product not available for exchange");
        }

        List<Product> offeredProducts = productRepository.findAllById(request.getOfferedProductIds());

        if (offeredProducts.isEmpty()) {
            throw new RuntimeException("No offered products selected");
        }

        // validate offered products
        for (Product p : offeredProducts) {
            if (!p.getOwner().getEmail().equals(email)) {
                throw new RuntimeException("You can only offer your own products");
            }

            if (p.getStatus() != ProductStatus.ACTIVE) {
                throw new RuntimeException("Product already unavailable");
            }
        }

        Exchange exchange = Exchange.builder()
                .targetProduct(targetProduct)
                .offeredProducts(offeredProducts)
                .fromUser(sender)
                .toUser(targetProduct.getOwner())
                .status(OfferStatus.PENDING)
                .build();

        exchangeRepository.save(exchange);
        return ExchangeMapper.toResponse(exchange);
    }

    @Override
    public List<ExchangeResponse> sentRequests(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return exchangeRepository.findByFromUser(user)
                .stream()
                .map(ExchangeMapper::toResponse)
                .toList();
    }

    @Override
    public List<ExchangeResponse> receivedRequests(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return exchangeRepository.findByToUser(user)
                .stream()
                .map(ExchangeMapper::toResponse)
                .toList();
    }

    @Override
    public void acceptExchange(Long id, String email) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        if (!exchange.getToUser().getEmail().equals(email)) {
            throw new RuntimeException("Not allowed");
        }
        if (exchange.getStatus() != OfferStatus.PENDING) {
            throw new RuntimeException("Exchange already processed");
        }

        // Product target = exchange.getTargetProduct();
        Product target = productRepository.findById(
                exchange.getTargetProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if (target.getStatus() != ProductStatus.ACTIVE) {
            throw new RuntimeException("Product already exchanged");
        }

        // accept this exchange
        exchange.setStatus(OfferStatus.ACCEPTED);
        exchange.setProcessedAt(LocalDateTime.now());
        target.setStatus(ProductStatus.EXCHANGED);
        exchange.getOfferedProducts()
                .forEach(product -> product.setStatus(ProductStatus.EXCHANGED));

        // reject all other pending exchanges
        List<Exchange> others = exchangeRepository.findByTargetProductAndStatus(target, OfferStatus.PENDING);

        for (Exchange e : others) {
            if (!e.getId().equals(exchange.getId())) {
                e.setStatus(OfferStatus.REJECTED);
                e.setProcessedAt(LocalDateTime.now());
            }
        }

        exchangeRepository.save(exchange);
    }

    @Override
    public void rejectExchange(Long id, String email) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        if (!exchange.getToUser().getEmail().equals(email)) {
            throw new RuntimeException("Not allowed");
        }
        if (exchange.getStatus() != OfferStatus.PENDING) {
            throw new RuntimeException("Exchange already processed");
        }
        exchange.setStatus(OfferStatus.REJECTED);

        exchange.setProcessedAt(LocalDateTime.now());

        exchangeRepository.save(exchange);
    }

    @Override
    public void cancelExchange(Long id, String email) {
        Exchange exchange = exchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exchange not found"));

        if (!exchange.getFromUser().getEmail().equals(email)) {
            throw new RuntimeException("You cannot cancel this exchange");
        }

        if (exchange.getStatus() != OfferStatus.PENDING) {
            throw new RuntimeException("Only pending exchanges can be cancelled");
        }

        exchange.setStatus(OfferStatus.CANCELLED);
        exchange.setProcessedAt(LocalDateTime.now());

        exchangeRepository.save(exchange);
    }

}
