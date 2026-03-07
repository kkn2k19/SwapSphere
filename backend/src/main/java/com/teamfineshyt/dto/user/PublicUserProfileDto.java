package com.teamfineshyt.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PublicUserProfileDto {
    private String name;
    private String email;
    private String phone;
    private String city;
    private String state;
}
