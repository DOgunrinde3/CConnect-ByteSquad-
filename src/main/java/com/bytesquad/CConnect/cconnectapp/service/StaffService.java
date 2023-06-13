package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StaffService {

    private final MongoTemplate mongoTemplate;

    private final StaffRepository staffRepository;

    private final StaffAssembler staffAssembler;

    private LocalDate minYear = LocalDate.now().minusYears(18);
    public StaffDto login(LoginDto staffLoginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(staffLoginDto.getUsername()));

        Staff staff = mongoTemplate.find(query, Staff.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        if (mongoTemplate.find(query, Staff.class).size() > 1){
            throw new IllegalStateException("found duplicate username" + staffLoginDto.getUsername());
        }

        if (!staff.getPassword().equals(staffLoginDto.getPassword())){
            throw new NotFoundException("Invalid username or password");

        }

        return loginUser(staff);

    }

    private StaffDto loginUser(Staff staff){
        return staffAssembler.assemble(staff);
    }

    public StaffDto register(RegistrationDto registrationDto){
        Staff staff = staffAssembler.disassemble(registrationDto);
        if(staff.getBirthdate().isAfter(minYear) || staff.getBirthdate().isEqual(minYear) ){
            throw new RuntimeException("User is too young");
        }
        staffRepository.insert(staff);
        return loginUser(staff);

    }

    public StaffDto getStaff(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
