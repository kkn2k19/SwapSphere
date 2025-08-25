package com.teamshyt.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamshyt.model.Email;
import com.teamshyt.model.VerificationType;
import com.teamshyt.repo.EmailRepository;

@Service
public class EmailService {
    private final EmailOTPSendService emailOTPSendService;
    private final EmailRepository emailRepository;
    private final Random random = new Random();

    public EmailService(EmailOTPSendService emailOTPSendService, EmailRepository emailRepository) {
        this.emailOTPSendService = emailOTPSendService;
        this.emailRepository = emailRepository;
    }

    @Value("${OTP_LENGTH}")
    private int otpLength;

    @Value("${OTP_EXPIRY}")
    private int otpExpiryMinutes;

    @Value("${OTP_RESEND_GAP_IN_SECONDS}")
    private long otpResendGapinSeconds;

    public String generateOtp() {
        int lowValue = (int) Math.pow(10, Math.max(1, otpLength - 1));
        int maxValue = (int) Math.pow(10, otpLength) - 1;
        int n = lowValue + random.nextInt(maxValue - lowValue + 1);
        return String.valueOf(n);
    }

    @Transactional
    public void createAndSendOtp(String email, VerificationType type) {
        String otp = generateOtp();
        Email emailObject = new Email();
        emailObject.setEmail(email);
        emailObject.setOtp(otp);
        emailObject.setType(type);
        emailObject.setExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        emailObject.setConsumed(false);
        emailObject.setCreatedAt(LocalDateTime.now()); // from now otp will have creation time for tracking

        emailRepository.save(emailObject);

        String subject = (type == VerificationType.VERIFY) ? "Verify Your Email" : "Password reset code";
        emailOTPSendService.sendOtp(email, subject, otp);
    }

    @Transactional
    public boolean validateOtp(String email, String otp, VerificationType type) {
        Optional<Email> optional = emailRepository.findFirstByEmailAndTypeOrderByExpiryTimeDesc(email, type);

        if (optional.isEmpty())
            return false;

        Email emailObject = optional.get();
        if (emailObject.isConsumed())
            return false;
        if (emailObject.getExpiryTime().isBefore(LocalDateTime.now()))
            return false;
        if (!emailObject.getOtp().equals(otp))
            return false;
        emailObject.setConsumed(true); // mark consumed - otp used
        emailRepository.save(emailObject);
        return true;
    }

    @Transactional
    public void resendOtp(String email, VerificationType type) {
        // adding check to time gap between otps 
        Optional<Email> latestOtp = emailRepository.findFirstByEmailAndTypeOrderByExpiryTimeDesc(email, type);
        if (latestOtp.isPresent()) {
            LocalDateTime lastRequestedTime = latestOtp.get().getCreatedAt();

            if (lastRequestedTime.isAfter(LocalDateTime.now().minusSeconds(otpResendGapinSeconds))) {
                throw new RuntimeException("Please wait before requesting a new OTP. Try again after " + otpResendGapinSeconds + " seconds.");
            }
        }

        // it will delete the old otps of the email with the type of request -- VERIFY
        // OR RESET
        // here if a user requests 2 or more otps within a small time then there may be
        // multiple active otps so this method will make sure that there exist only one
        // valid so it will first delelte the current otp for this email and then create
        // a new one and send
        emailRepository.deleteByEmailAndType(email, type);

        // now just create a new otp and sent to email just like the previous method -
        // createAndSendOtp - just call it with email and type
        createAndSendOtp(email, type);

        // now deleting the used ones - it is like cleaning the DB by removing all useds
        // or expired otps of any types
        // here it uses a defined query from EmailRepository - deleteExpiredorConsumed()
        emailRepository.deleteExpiredorConsumed(LocalDateTime.now());
        // agar otp ka expiry time abhi ke time se pehle ka h to wo delete hoga

        // here the first method will just delete the current type otps whcih means if a
        // request type is not requested from so long then its old used and expired otps
        // may be present in the DB
        // so this 2nd delete method ensure that all useds or expired otps will be
        // globally cleanedUp keeping DB light and clean.
    }
}
