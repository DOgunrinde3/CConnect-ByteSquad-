package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class UserAssembler {

    private final MongoTemplate mongoTemplate;


    public UserDto assemble(User user){
        return new UserDto()
                .setUserId(user.getUserId())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setBirthDate(user.getBirthdate().toString());
    }

    public User disassemble(UserRegistrationDto userRegistrationDto){
        return disassembleInto(User.newInstance(), userRegistrationDto);
    }



    public User disassembleInto(User user, UserRegistrationDto userRegistrationDto){

        LocalDate date = LocalDate.parse(userRegistrationDto.getBirthdate());

        return user
                .setFirstName(userRegistrationDto.getFirstName())
                .setLastName(userRegistrationDto.getLastName())
                .setBirthdate(date)
                .setEmail(userRegistrationDto.getEmail())
                .setPassword(userRegistrationDto.getPassword())
                .setPhoneNumber(userRegistrationDto.getPhoneNumber());
    }



    public String getUserName(String patientId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(patientId));

        User user = mongoTemplate.findOne(query, User.class);

        if(user == null){
            throw new NotFoundException("Staff Not Found");
        }

        return String.format(user.getFirstName() + " " + user.getLastName());
    }

    public String getUserId(String patientName){
        String[] nameParts = patientName.split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[1];
        Query query = new Query();
        query.addCriteria(Criteria.where("firstName").is(firstName));
        query.addCriteria(Criteria.where("lastName").is(lastName));

        User user = mongoTemplate.findOne(query, User.class);

        if(user == null){
            throw new NotFoundException("Staff Not Found");
        }


        return user.getUserId();
    }




}
