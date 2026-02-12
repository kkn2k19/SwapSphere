package com.teamfineshyt.dto;

import com.teamfineshyt.model.VerificationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequest {
    private String email;
    private VerificationType type;
}
