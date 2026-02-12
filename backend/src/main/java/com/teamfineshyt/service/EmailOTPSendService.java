package com.teamfineshyt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailOTPSendService {
    private final JavaMailSender javaMailSender;

    @Value("${app.otp.expiry.minutes}")
    private int otpExpiryMinutes;

    public EmailOTPSendService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendOtp(String to, String subject, String otp) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText("Your Verification code is : " + otp + "\nThis code is valid for " + otpExpiryMinutes
                    + " minutes only.");
            javaMailSender.send(msg);
        } catch (RuntimeException e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
}
