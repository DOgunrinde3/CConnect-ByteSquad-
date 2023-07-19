package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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


    public StaffDto
    update(String userId, StaffDto staff)
    {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));

        Update update = new Update()
                .set("firstName", staff.getFirstName())
                .set("lastName", staff.getLastName())
                .set("email", staff.getEmail())
                .set("phoneNumber", staff.getPhoneNumber())
                .set("experience", staff.getExperience())
                .set("services", staff.getServices());

        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        Staff updatedStaff = mongoTemplate.findAndModify(query, update, options, Staff.class);
        return staffAssembler.assemble(updatedStaff);
    }


}
