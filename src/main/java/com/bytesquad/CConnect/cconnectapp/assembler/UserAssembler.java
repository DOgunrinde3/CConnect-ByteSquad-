package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Random;

@Component
public class UserAssembler {


    public UserDto assemble(User user){
        return new UserDto()
                .setUserId(user.getUserId())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setBirthDate(user.getBirthdate())
                .setGender(user.getGender());
    }

    public User disassemble(RegistrationDto registrationDto){
        return disassembleInto(User.newInstance(), registrationDto);
    }

    public User disassembleInto(User user, RegistrationDto registrationDto){

        LocalDate date = LocalDate.parse(registrationDto.getBirthdate());


        return user
                .setFirstName(registrationDto.getFirstName())
                .setLastName(registrationDto.getLastName())
                .setBirthdate(date)
                .setEmail(registrationDto.getEmail())
                .setPassword(registrationDto.getPassword())
                .setPhoneNumber(registrationDto.getPhoneNumber());
    }


}
