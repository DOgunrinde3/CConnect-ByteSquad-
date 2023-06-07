package com.bytesquad.CConnect.cconnectapp.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserRegistrationDto {
    private String bio;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
    private String phoneNumber;
    private String email;
    private String password;
    private Integer companyCode;
}
