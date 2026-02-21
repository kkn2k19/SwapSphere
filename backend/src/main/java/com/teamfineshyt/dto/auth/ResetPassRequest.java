package com.teamfineshyt.dto.auth;

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
