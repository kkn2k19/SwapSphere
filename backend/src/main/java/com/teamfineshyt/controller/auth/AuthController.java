package com.teamfineshyt.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.dto.auth.EmailVerifyRequest;
import com.teamfineshyt.dto.auth.ForgotPassRequest;
import com.teamfineshyt.dto.auth.JWTResponse;
import com.teamfineshyt.dto.auth.LoginRequest;
import com.teamfineshyt.dto.auth.RegisterRequest;
import com.teamfineshyt.dto.auth.ResendOtpRequest;
import com.teamfineshyt.dto.auth.ResetPassRequest;
import com.teamfineshyt.dto.user.PublicUserProfileDto;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.UserRepository;
import com.teamfineshyt.service.EmailService;
import com.teamfineshyt.service.UserAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository urepo;
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

    // check email verified or not
    @PostMapping("/check-email-status")
    public ResponseEntity<?> checkEmailStatus(@RequestBody EmailVerifyRequest request) {
        try {
            String status = userAuthService.checkEmailStatus(request.getEmail());
            return ResponseEntity.ok().body(status);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // email present or not in db
    @PostMapping("/check-email-present")
    public ResponseEntity<?> checkEmailPresent(@RequestBody EmailVerifyRequest request) {
        try {
            boolean isPresent = userAuthService.isEmailPresent(request.getEmail());
            return ResponseEntity.ok().body(isPresent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/public/{email}")
    public PublicUserProfileDto getPublicProfile(
            @PathVariable String email) {
        User user = urepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return new PublicUserProfileDto(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getCity(),
                user.getState());
    }
}
