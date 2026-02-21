package com.teamfineshyt.dto.auth;

import com.teamfineshyt.enums.VerificationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequest {
    private String email;
    private VerificationType type;
}
