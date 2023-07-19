package com.bytesquad.CConnect.cconnectapp.dtos.user;


import lombok.Data;
import lombok.experimental.Accessors;


@Data
@Accessors(chain = true)
public class UserDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String birthDate;
    private String email;
}
