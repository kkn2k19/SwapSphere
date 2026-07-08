package com.teamfineshyt.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.dto.auth.ChangePasswordRequest;
import com.teamfineshyt.dto.auth.EmailVerifyRequest;
import com.teamfineshyt.dto.auth.ForgotPassRequest;
import com.teamfineshyt.dto.auth.JWTResponse;
import com.teamfineshyt.dto.auth.LoginRequest;
import com.teamfineshyt.dto.auth.RegisterRequest;
import com.teamfineshyt.dto.auth.ResendOtpRequest;
import com.teamfineshyt.dto.auth.ResetPassRequest;
import com.teamfineshyt.dto.auth.UpdateProfileRequest;
import com.teamfineshyt.dto.auth.UserProfileDto;
import com.teamfineshyt.dto.user.PublicUserProfileDto;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.UserRepository;
import com.teamfineshyt.service.EmailService;
import com.teamfineshyt.service.UserAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {
    private final UserRepository urepo;
    // private final EmailService emailService;
    private final UserAuthService userAuthService;

    

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public UserProfileDto getMyProfile(Authentication auth) {
        User user = urepo.findByEmail(auth.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserProfileDto(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name(),
                user.getLandmark(),
                user.getCity(),
                user.getState(),
                user.getPincode());
    }

    @PutMapping("/update-profile")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request, Authentication auth) {
        userAuthService.updateProfile(auth.getName(), request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping("/change-password")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication auth) {
        userAuthService.changePassword(auth.getName(), request);
        return ResponseEntity.ok("Password changed successfully");
    }

    
}