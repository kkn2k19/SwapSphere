package com.teamshyt.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPassRequest {
    private String email;
    private String otp;
    private String newPassword;
    private String confirmPassword;
}
