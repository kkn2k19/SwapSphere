package com.teamfineshyt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailOTPSendService {
    @Value("${brevo_api_key}")
    private String apiKey;

    @Value("${app.otp.expiry.minutes}")
    private int otpExpiryMinutes;

    @Value("${mail_from}")
    private String mailFrom;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendOtp(String to, String subject, String otp) {
        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        Map<String, Object> body = Map.of(
                "sender",
                Map.of(
                        "name", "SwapSphere",
                        "email", mailFrom),
                "to",
                List.of(
                        Map.of("email", to)),
                "subject", subject,
                "textContent",
                "Your Verification Code is : "
                        + otp
                        + "\n\nThis OTP is valid for "
                        + otpExpiryMinutes
                        + " minutes.");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException(response.getBody());
        }
    }

    public void sendCustomEmail(String to, String subject, String body) {
        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        Map<String, Object> payload = Map.of(
                "sender",
                Map.of(
                        "name", "SwapSphere",
                        "email", mailFrom),
                "to",
                List.of(
                        Map.of("email", to)),
                "subject", subject,
                "textContent",
                body);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        restTemplate.postForEntity(url, entity, String.class);
    }
}

// package com.teamfineshyt.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailOTPSendService {
// private final JavaMailSender javaMailSender;

// @Value("${app.otp.expiry.minutes}")
// private int otpExpiryMinutes;

// @Value("${mail_from}")
// private String mailFrom;

// public EmailOTPSendService(JavaMailSender javaMailSender) {
// this.javaMailSender = javaMailSender;
// }

// public void sendOtp(String to, String subject, String otp) {
// try {
// SimpleMailMessage msg = new SimpleMailMessage();

// msg.setFrom(mailFrom);

// msg.setTo(to);
// msg.setSubject(subject);
// msg.setText("Your Verification code is : " + otp + "\nThis code is valid for
// " + otpExpiryMinutes
// + " minutes only.");

// System.out.println("MAIL FROM = " + mailFrom);
// System.out.println("MAIL USER = " + System.getenv("MAIL_USERNAME"));
// System.out.println("MAIL HOST = " + System.getenv("MAIL_HOST"));
// System.out.println("MAIL PORT = " + System.getenv("MAIL_PORT"));

// javaMailSender.send(msg);
// } catch (Exception e) {

// System.out.println("============== MAIL ERROR ==============");
// e.printStackTrace();
// System.out.println("Host : " + System.getProperty("spring.mail.host"));
// System.out.println("========================================");

// throw new RuntimeException("Failed to send OTP email: " + e.getMessage());
// }
// }

// public JavaMailSender getJavaMailSender() {
// return javaMailSender;
// }
// }
