package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class StaffAssembler {


    public StaffDto assemble(Staff staff){
        return new StaffDto()
                .setUserId(staff.getUserId())
                .setPhoneNumber(staff.getPhoneNumber())
                .setEmail(staff.getEmail())
                .setFirstName(staff.getFirstName())
                .setLastName(staff.getLastName());
    }

    public Staff disassemble(RegistrationDto registrationDto){
        return disassembleInto(Staff.newInstance(), registrationDto);
    }

    public Staff disassembleInto(Staff staff, RegistrationDto registrationDto){

        String username = generateUsername(
                registrationDto.getFirstName(), registrationDto.getLastName()
        );

        return staff
                .setUsername(username)
                .setFirstName(registrationDto.getFirstName())
                .setLastName(registrationDto.getLastName())

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
