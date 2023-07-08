package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.*;

import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
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
    @Indexed(unique=true)
    private String email;
    private LocalDate birthdate;
    private String password;
    private Integer experience;
    private List<String> services;




    public static Staff newInstance(){
        Staff newInstance = new Staff();
        newInstance.userId = UUID.randomUUID().toString();
        return newInstance;
    }


}
