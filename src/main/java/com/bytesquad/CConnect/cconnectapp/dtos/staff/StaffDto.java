package com.bytesquad.CConnect.cconnectapp.dtos.staff;


import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class StaffDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String birthdate;
    private Integer experience;
    private List<String> services;



}
