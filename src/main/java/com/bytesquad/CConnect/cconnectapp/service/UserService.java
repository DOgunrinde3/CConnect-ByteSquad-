package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import javax.ws.rs.NotFoundException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

  private final MongoTemplate mongoTemplate;

  private final UserRepository userRepository;

    private final UserAssembler userAssembler;
    public UserInformationDto login(UserLoginDto userLoginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(userLoginDto.getUsername()));

        User user = mongoTemplate.find(query, User.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        if (mongoTemplate.find(query, User.class).size() > 1){
            throw new IllegalStateException("found duplicate username" + userLoginDto.getUsername());
        }

        if (!user.getPassword().equals(userLoginDto.getPassword()) || !user.getCompanyCode().equals(userLoginDto.getCompanyCode())){
            throw new NotFoundException("Invalid username or password");

        }

        return loginUser(user);

    }

    private UserInformationDto loginUser(User user){
        return userAssembler.assemble(user);
    }

    public UserInformationDto register(UserLoginDto userLoginDto){
        //we need to get the company code the user inputed and check the company database table to see if this exists.
        //if it exists, we then need to check the list of unregisteredUsers on the Company Entity and check to see if a user with the same first name and last name exists
        // if the user exists, then we want to assemble that as the user Login
         User user = userAssembler.disassemble(userLoginDto);
            userRepository.insert(user);

       return loginUser(user);

    }

    public UserLoginDto getUser(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
