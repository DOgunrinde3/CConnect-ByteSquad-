package com.bytesquad.CConnect.cconnectapp.dtos.doctor;


import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class StaffInformationDto {
    private String Id;
    private String bio;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
