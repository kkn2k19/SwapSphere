package com.teamfineshyt.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamfineshyt.dto.EmailVerifyRequest;
import com.teamfineshyt.dto.ForgotPassRequest;
import com.teamfineshyt.dto.JWTResponse;
import com.teamfineshyt.dto.LoginRequest;
import com.teamfineshyt.dto.RegisterRequest;
import com.teamfineshyt.dto.ResetPassRequest;
import com.teamfineshyt.model.User;
import com.teamfineshyt.model.UserRole;
import com.teamfineshyt.model.VerificationType;
import com.teamfineshyt.repo.UserRepository;
import com.teamfineshyt.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAuthService {
    private final UserRepository urepo;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    // register user
    public String register(RegisterRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Email and Password required.");
        }

        if (urepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }

        if (urepo.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone Number already registered.");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords didn't not match.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.valueOf(request.getRole().toUpperCase()));

        user.setLandmark(request.getLandmark());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());

        user.setEnabled(false); // login disable until email verified with otp -- true for verified account and
                                // false for not verified account
        urepo.save(user);

        return "User registered successfully";
    }

    // login user -- > token + role
    public JWTResponse login(LoginRequest request) {
        Optional<User> optional = urepo.findByEmail(request.getEmail());
        if (optional.isEmpty()) {
            throw new RuntimeException("Invalid Credentials");
        }
        User user = optional.get();
        if (!user.isEnabled()) {
            throw new RuntimeException("Please verify your email before logging in.");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return JWTResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .build();
    }

    // verify email with otp
    public String verifyEmail(EmailVerifyRequest request) {
        boolean isValidOtp = emailService.validateOtp(request.getEmail(), request.getOtp(), VerificationType.VERIFY);
        if (!isValidOtp) {
            throw new RuntimeException("Invalid/expired OTP");
        }

        User user = urepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));

        user.setEnabled(true);
        urepo.save(user);

        return "Email verified successfully. You can now login.";
    }

    // forgot password
    public String forgotPassword(ForgotPassRequest request) {
        Optional<User> userOptional = urepo.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("No user with given email");
        }
        emailService.createAndSendOtp(request.getEmail(), VerificationType.RESET);

        return "Password reset OTP sent to your email.";
    }

    // reset password with OTP
    public String resetPassword(ResetPassRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match.");
        }

        boolean isValidOtp = emailService.validateOtp(request.getEmail(), request.getOtp(), VerificationType.RESET);

        if (!isValidOtp) {
            throw new RuntimeException("Invalid/expired OTP");
        }

        User user = urepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        urepo.save(user);
        return "Password reset successful. You can now login with new password.";
    }
}
