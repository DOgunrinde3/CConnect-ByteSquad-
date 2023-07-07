package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserAssembler {


    public UserDto assemble(User user){
        return new UserDto()
                .setUserId(user.getUserId())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setBirthDate(user.getBirthdate().toString())
                .setGender(user.getGender());
    }

    public User disassemble(UserRegistrationDto userRegistrationDto){
        return disassembleInto(User.newInstance(), userRegistrationDto);
    }



    public User disassembleInto(User user, UserRegistrationDto userRegistrationDto){

        LocalDate date = LocalDate.parse(userRegistrationDto.getBirthdate());

        return user
                .setFirstName(userRegistrationDto.getFirstName())
                .setLastName(userRegistrationDto.getLastName())
                .setBirthdate(date)
                .setEmail(userRegistrationDto.getEmail())
                .setPassword(userRegistrationDto.getPassword())
                .setPhoneNumber(userRegistrationDto.getPhoneNumber());
    }


}
