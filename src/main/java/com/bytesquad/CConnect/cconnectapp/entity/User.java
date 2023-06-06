package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.Random;
import java.util.UUID;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String bio;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
    private String phoneNumber;
    private String email;
    @Indexed(unique=true)
    private String username;
    private String password;
    private Integer companyCode;

    public static User newInstance(){
        User newInstance = new User();
        newInstance.userId = UUID.randomUUID().toString();
        newInstance.setUsername(generateUsername(newInstance().getFirstName(), newInstance.getLastName()));
        return newInstance;
    }

    private static String generateUsername(String firstName, String lastName) {
        String firstLetter = firstName.substring(0, 1).toLowerCase();
        String generatedName = firstLetter + lastName.toLowerCase();
        String randomDigits = String.format("%02d", new Random().nextInt(100));
        generatedName += randomDigits;
        return generatedName;
    }
}
