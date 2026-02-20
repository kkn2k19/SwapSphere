package com.teamfineshyt.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String city;
    private String state;
    private String pincode;
}
