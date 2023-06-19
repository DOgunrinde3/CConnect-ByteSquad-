package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class UserAssembler {


    public UserDto assemble(User user){
        return new UserDto()
                .setUserId(user.getUserId())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName());
    }

    public User disassemble(RegistrationDto registrationDto){
        return disassembleInto(User.newInstance(), registrationDto);
    }

    public User disassembleInto(User user, RegistrationDto registrationDto){

        String username = generateUsername(
                registrationDto.getFirstName(), registrationDto.getLastName()
        );

        return user
                .setUsername(username)
                .setFirstName(registrationDto.getFirstName())
                .setLastName(registrationDto.getLastName())
                .setBirthdate(registrationDto.getBirthDate())
                .setEmail(registrationDto.getEmail())
                .setPassword(registrationDto.getPassword())
                .setPhoneNumber(registrationDto.getPhoneNumber());
    }

    private static String generateUsername(String firstName, String lastName) {
        String firstLetter = firstName.substring(0, 1).toLowerCase();
        String generatedName = firstLetter + lastName.toLowerCase();
        String randomDigits = String.format("%02d", new Random().nextInt(100));
        generatedName += randomDigits;
        return generatedName;
    }
}
