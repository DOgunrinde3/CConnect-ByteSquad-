package com.bytesquad.CConnect.cconnectapp.dtos;


import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CompanyRegistrationDto {
    private String companyName;
    private UserLoginDto companyAdmin;
}
