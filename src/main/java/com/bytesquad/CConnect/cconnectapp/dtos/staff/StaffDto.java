package com.bytesquad.CConnect.cconnectapp.dtos.staff;


import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class StaffDto {
    private String userId;
    private String bio;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
