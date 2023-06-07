package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class UserAssembler {


    public UserInformationDto assemble(User user){
        return new UserInformationDto()
                .setUserId(user.getUserId())
                .setBio(user.getBio())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName());
    }

    public User disassemble(UserRegistrationDto userRegistrationDto){
        return disassembleInto(User.newInstance(), userRegistrationDto);
    }

    public User disassembleInto(User user, UserRegistrationDto userRegistrationDto){

        String username = generateUsername(
                userRegistrationDto.getFirstName(), userRegistrationDto.getLastName()
        );

        return user
                .setUsername(username)
                .setFirstName(userRegistrationDto.getFirstName())
                .setLastName(userRegistrationDto.getLastName())
                .setBio(userRegistrationDto.getBio())
                .setEmail(userRegistrationDto.getEmail())
                .setPassword(userRegistrationDto.getPassword())
                .setIsAdmin(userRegistrationDto.getIsAdmin())
                .setPhoneNumber(userRegistrationDto.getPhoneNumber())
                .setCompanyCode(userRegistrationDto.getCompanyCode())
                .setCompletedRegistration(true);
    }

    private static String generateUsername(String firstName, String lastName) {
        String firstLetter = firstName.substring(0, 1).toLowerCase();
        String generatedName = firstLetter + lastName.toLowerCase();
        String randomDigits = String.format("%02d", new Random().nextInt(100));
        generatedName += randomDigits;
        return generatedName;
    }
}
