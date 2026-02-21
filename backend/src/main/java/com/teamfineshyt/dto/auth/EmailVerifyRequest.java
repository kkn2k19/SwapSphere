package com.teamfineshyt.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailVerifyRequest {
    private String email;
    private String otp;
}
