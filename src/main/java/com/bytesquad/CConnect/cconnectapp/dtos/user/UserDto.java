package com.bytesquad.CConnect.cconnectapp.dtos.user;


import com.bytesquad.CConnect.cconnectapp.enums.Gender;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDate;


@Data
@Accessors(chain = true)
public class UserDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String birthDate;
    private String email;
    private Gender gender;
}
