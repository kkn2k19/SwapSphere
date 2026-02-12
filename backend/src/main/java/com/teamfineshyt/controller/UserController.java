package com.teamfineshyt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.dto.EmailVerifyRequest;
import com.teamfineshyt.dto.ForgotPassRequest;
import com.teamfineshyt.dto.JWTResponse;
import com.teamfineshyt.dto.LoginRequest;
import com.teamfineshyt.dto.RegisterRequest;
import com.teamfineshyt.dto.ResendOtpRequest;
import com.teamfineshyt.dto.ResetPassRequest;
import com.teamfineshyt.service.EmailService;
import com.teamfineshyt.service.UserAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final EmailService emailService;
    private final UserAuthService userAuthService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String msg = userAuthService.register(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            JWTResponse response = userAuthService.login(request);
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody EmailVerifyRequest request) {
        try {
            String msg = userAuthService.verifyEmail(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPassRequest request) {
        try {
            String msg = userAuthService.forgotPassword(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassRequest request) {
        try {
            String msg = userAuthService.resetPassword(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody ResendOtpRequest request) {
        try {
            String msg = "OTP resent successfully.";
            emailService.resendOtp(request.getEmail(), request.getType());
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}