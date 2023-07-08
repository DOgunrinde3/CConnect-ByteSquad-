package com.bytesquad.CConnect.cconnectapp.entity;

import com.bytesquad.CConnect.cconnectapp.enums.Gender;
import lombok.*;

import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    @Indexed(unique=true)
    private String email;
    private Gender gender;
    private LocalDate birthdate;
    private String password;

    public static User newInstance(){
        User newInstance = new User();
        newInstance.userId = UUID.randomUUID().toString();
        return newInstance;
    }

    public static UserDetails build(User user){

        List<GrantedAuthority> authorities =
                usuario.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol.name())).collect(Collectors.toList());

        return new UserDetails(user.getPassword(), user.getEmail(), authorithies);
    }


}
