package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
import java.util.Random;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class Company {

    private static final int MIN_NUMBER = 10000;
    private static final int MAX_NUMBER = 99999;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer companyCode;
    private String companyName;
    private List<UnregisteredUser> unregisteredUsers;

    public static Company newInstance(String companyName) {
        Company newInstance = new Company();
        newInstance.companyCode = generateCompanyCode();
        newInstance.companyName = companyName;
        return newInstance;
    }

    public static Integer generateCompanyCode() {
        Random random = new Random();
        return random.nextInt(MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER;

    }

}
