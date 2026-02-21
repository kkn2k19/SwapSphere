package com.teamfineshyt.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDto {
    private String name;
    private String email;
    private String phone;
    private String role;
    private String landmark;
    private String city;
    private String state;
    private String pincode;
}
