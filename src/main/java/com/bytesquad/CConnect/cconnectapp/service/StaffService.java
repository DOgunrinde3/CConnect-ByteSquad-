package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StaffService {

    private final MongoTemplate mongoTemplate;

    private final StaffRepository staffRepository;

    private final StaffAssembler staffAssembler;

    private LocalDate minYear = LocalDate.now().minusYears(18);
    public StaffDto login(LoginDto staffLoginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(staffLoginDto.getEmail()));

        Staff staff = mongoTemplate.find(query, Staff.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        if (mongoTemplate.find(query, Staff.class).size() > 1){
            throw new IllegalStateException("found duplicate username" + staffLoginDto.getEmail());
        }

        if (!staff.getPassword().equals(staffLoginDto.getPassword())){
            throw new NotFoundException("Invalid username or password");

        }

        return loginUser(staff);

    }

    private StaffDto loginUser(Staff staff){
        return staffAssembler.assemble(staff);
    }

    public StaffDto register(StaffRegistrationDto staffRegistrationDto){
        Staff staff = staffAssembler.disassemble(staffRegistrationDto);
        if(staff.getBirthdate().isAfter(minYear) || staff.getBirthdate().isEqual(minYear) ){
            throw new RuntimeException("User is too young");
        }
        staffRepository.insert(staff);
        return loginUser(staff);

    }

    public StaffDto getStaff(String userId){
        Staff staff = staffRepository.findById(userId).orElseThrow();
        return staffAssembler.assemble(staff);
    }

    public String getStaffName(String doctorId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(doctorId));

        Staff staff = mongoTemplate.find(query, Staff.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        return String.format(staff.getFirstName() + " " + staff.getLastName());
    }

    public String getStaffId(String doctorName){
        String[] nameParts = doctorName.split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[1];
        Query query = new Query();
        query.addCriteria(Criteria.where("firstName").is(firstName));
        query.addCriteria(Criteria.where("lastName").is(lastName));

        Staff staff = mongoTemplate.find(query, Staff.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        return staff.getUserId();
    }

    public List<StaffDto> getAllStaff(){
        List<Staff> allStaff = staffRepository.findAll();
        return allStaff.stream()
                .map(staffAssembler::assemble)
                .collect(Collectors.toList());

    }


}
