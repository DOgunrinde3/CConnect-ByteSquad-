package com.bytesquad.CConnect.cconnectapp.dtos;

import com.bytesquad.CConnect.cconnectapp.enums.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class RegistrationDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private Gender gender;
}
