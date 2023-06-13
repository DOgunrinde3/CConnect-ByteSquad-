package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserLoginDto;
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
    public StaffInformationDto login(UserLoginDto staffLoginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(userLoginDto.getUsername()));

        Staff staff = mongoTemplate.find(query, Staff.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        if (mongoTemplate.find(query, Staff.class).size() > 1){
            throw new IllegalStateException("found duplicate username" + userLoginDto.getUsername());
        }

        if (!staff.getPassword().equals(userLoginDto.getPassword())){
            throw new NotFoundException("Invalid username or password");

        }

        return loginUser(staff);

    }

    private StaffInformationDto loginUser(Staff staff){
        return staffAssembler.assemble(staff);
    }

    public StaffInformationDto register(RegistrationDto registrationDto){
        Staff staff = staffAssembler.disassemble(registrationDto);
        if(staff.getBirthdate().isAfter(minYear) || staff.getBirthdate().isEqual(minYear) ){
            throw new RuntimeException("User is too young");
        }
        staffRepository.insert(user);
        return loginUser(staff);

    }

    public UserLoginDto getUser(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
