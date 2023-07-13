package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class StaffAssembler {

    private final MongoTemplate mongoTemplate;

    public StaffDto assemble(Staff staff){
        return new StaffDto()
                .setUserId(staff.getUserId())
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

    public Staff disassembleInto(Staff staff, StaffDto staffDto){
        LocalDate date = LocalDate.parse(staffDto.getBirthdate());


        return staff
                .setFirstName(staffDto.getFirstName())
                .setLastName(staffDto.getLastName())
                .setBirthdate(date)
                .setEmail(staffDto.getEmail())
                .setPhoneNumber(staffDto.getPhoneNumber())
                .setExperience(staffDto.getExperience())
                .setServices(staffDto.getServices());
    }


    public String getStaffId(String doctorName){
        String[] nameParts = doctorName.split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[1];
        Query query = new Query();
        query.addCriteria(Criteria.where("firstName").is(firstName));
        query.addCriteria(Criteria.where("lastName").is(lastName));

        Staff staff = mongoTemplate.findOne(query, Staff.class);
        if(staff == null){
            throw new NotFoundException("Staff Not Found");
        }

        return staff.getUserId();
    }

    public String getStaffName(String doctorId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(doctorId));

        Staff staff = mongoTemplate.findOne(query, Staff.class);
        if(staff == null){
            throw new NotFoundException("Staff Not Found");
        }

        return String.format(staff.getFirstName() + " " + staff.getLastName());
    }


}
