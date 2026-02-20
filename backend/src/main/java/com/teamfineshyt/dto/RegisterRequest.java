package com.teamfineshyt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @JsonProperty("role")
    private String role; // "USER" or "ADMIN"

    private String name;
    private String email;
    private String phone;
    private String password;
    private String confirmPassword;

    private String landmark;
    private String city;
    private String state;
    private String pincode;
}
