package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Random;

@Component
public class StaffAssembler {
    public StaffDto assemble(Staff staff){
        return new StaffDto()
                .setUserId(staff.getUserId())
                .setPhoneNumber(staff.getPhoneNumber())
                .setEmail(staff.getEmail())
                .setFirstName(staff.getFirstName())
                .setLastName(staff.getLastName())
                .setBirthdate(staff.getBirthdate().toString());
    }

    public Staff disassemble(RegistrationDto registrationDto){
        return disassembleInto(Staff.newInstance(), registrationDto);
    }

    public Staff disassembleInto(Staff staff, RegistrationDto registrationDto){
        LocalDate date = LocalDate.parse(registrationDto.getBirthdate());


        return staff
                .setFirstName(registrationDto.getFirstName())
                .setLastName(registrationDto.getLastName())
                .setBirthdate(date)
                .setEmail(registrationDto.getEmail())
                .setPassword(registrationDto.getPassword())
                .setPhoneNumber(registrationDto.getPhoneNumber());
    }

}
