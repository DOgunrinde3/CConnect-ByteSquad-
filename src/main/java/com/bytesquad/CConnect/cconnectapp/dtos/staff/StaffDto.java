package com.bytesquad.CConnect.cconnectapp.dtos.staff;


import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;

import java.sql.Time;
import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class StaffDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String birthdate;


}
