package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class StaffAssembler {
    public StaffDto assemble(Staff staff){
        return new StaffDto()
                .setDoctorId(staff.getUserId())
                .setPhoneNumber(staff.getPhoneNumber())
                .setEmail(staff.getEmail())
                .setFirstName(staff.getFirstName())
                .setLastName(staff.getLastName())
                .setBirthdate(staff.getBirthdate().toString())
                .setExperience(staff.getExperience())
                .setServices(staff.getServices());
    }

    public Staff disassemble(StaffRegistrationDto staffRegistrationDto){
        return disassembleInto(Staff.newInstance(), staffRegistrationDto);
    }

    public Staff disassembleInto(Staff staff, StaffRegistrationDto staffRegistrationDto){
        LocalDate date = LocalDate.parse(staffRegistrationDto.getBirthdate());


        return staff
                .setFirstName(staffRegistrationDto.getFirstName())
                .setLastName(staffRegistrationDto.getLastName())
                .setBirthdate(date)
                .setEmail(staffRegistrationDto.getEmail())
                .setPassword(staffRegistrationDto.getPassword())
                .setPhoneNumber(staffRegistrationDto.getPhoneNumber())
                .setExperience(staffRegistrationDto.getExperience())
                .setServices(staffRegistrationDto.getServices());
    }

}
