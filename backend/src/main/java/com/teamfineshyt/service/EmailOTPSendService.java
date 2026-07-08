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

    @Value("${mail_from}")
    private String mailFrom;

    public EmailOTPSendService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendOtp(String to, String subject, String otp) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();

            msg.setFrom(mailFrom);

            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText("Your Verification code is : " + otp + "\nThis code is valid for " + otpExpiryMinutes
                    + " minutes only.");

            System.out.println("MAIL FROM = " + mailFrom);
            System.out.println("MAIL USER = " + System.getenv("MAIL_USERNAME"));
            System.out.println("MAIL HOST = " + System.getenv("MAIL_HOST"));
            System.out.println("MAIL PORT = " + System.getenv("MAIL_PORT"));

            javaMailSender.send(msg);
        } catch (Exception e) {

            System.out.println("============== MAIL ERROR ==============");
            e.printStackTrace();
            System.out.println("Host : " + System.getProperty("spring.mail.host"));
            System.out.println("========================================");

            throw new RuntimeException("Failed to send OTP email: " + e.getMessage());
        }
    }

    public JavaMailSender getJavaMailSender() {
        return javaMailSender;
    }
}
