package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class UserService {

  private final MongoTemplate mongoTemplate;

  private final UserRepository userRepository;

    private final UserAssembler userAssembler;

    private LocalDate minYear = LocalDate.now().minusYears(18);
    public UserDto login(LoginDto loginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(loginDto.getEmail()));

        User user = mongoTemplate.find(query, User.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        if (mongoTemplate.find(query, User.class).size() > 1){
            throw new IllegalStateException("found duplicate email" + loginDto.getEmail());
        }

        if (!user.getPassword().equals(loginDto.getPassword())){
            throw new NotFoundException("Invalid email or password");

        }

        return loginUser(user);

    }

    private UserDto loginUser(User user){
        return userAssembler.assemble(user);
    }

    public UserDto register(UserRegistrationDto userRegistrationDto){
         User user = userAssembler.disassemble(userRegistrationDto);
         if(user.getBirthdate().isAfter(minYear) || user.getBirthdate().isEqual(minYear) ){
             throw new RuntimeException("User is too young");
         }
            userRepository.insert(user);
       return loginUser(user);

    }

    public UserDto getUser(String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));

        User user = mongoTemplate.find(query, User.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        return userAssembler.assemble(user);
    }
}
