package com.bytesquad.CConnect.cconnectapp.entity;

import com.bytesquad.CConnect.cconnectapp.enums.Gender;
import lombok.*;

import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private Gender gender;
    private LocalDate birthdate;
    @Indexed(unique=true)
    private String username;
    private String password;

    public static Staff newInstance(){
        Staff newInstance = new Staff();
        newInstance.userId = UUID.randomUUID().toString();
        return newInstance;
    }


}
