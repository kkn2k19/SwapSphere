package com.teamshyt.dto;

import com.teamshyt.model.VerificationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequest {
    private String email;
    private VerificationType type;
}
