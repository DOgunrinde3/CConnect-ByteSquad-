package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.jwt.JwtProvider;
import com.bytesquad.CConnect.cconnectapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import com.api.rest.v1.security.dto.JwtDTO;
//import repository.UserRepository;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class UserService {

  private final MongoTemplate mongoTemplate;

  private final UserRepository userRepository;

  private final JwtProvider jwtProvider;

   private final AuthenticationManager authenticationManager;

    private final UserAssembler userAssembler;

    private LocalDate minYear = LocalDate.now().minusYears(18);


    public ResponseEntity<?> login(LoginDto loginDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(loginDto.getEmail()));


            User user = mongoTemplate.findOne(query, User.class);
            if(user == null){
                return new ResponseEntity<String>("User doesnt exist",
                        HttpStatus.BAD_REQUEST);
            }
            else if (!user.getPassword().equals(loginDto.getPassword())){
                return new ResponseEntity<String>("Invalid Password",
                        HttpStatus.FORBIDDEN);
            }

        return loginUser(user);


    }

    private ResponseEntity<?> loginUser(User user){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        JwtDTO jwtDto = new JwtDTO(jwt);

        return new ResponseEntity<JwtDTO>(jwtDto, HttpStatus.OK);

    }

//    public UserDto register(UserRegistrationDto userRegistrationDto){
////         User user = userAssembler.disassemble(userRegistrationDto);
////         if(user.getBirthdate().isAfter(minYear) || user.getBirthdate().isEqual(minYear) ){
////             throw new RuntimeException("User is too young");
////         }
////            userRepository.insert(user);
////       return loginUser(user);
//
//    }

    public UserDto getUser(String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));

        User user = mongoTemplate.find(query, User.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        return userAssembler.assemble(user);
    }

    public User getByEmail(String email){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));

        User user = mongoTemplate.find(query, User.class)
                .stream()
                .findFirst()
                .orElseThrow(NotFoundException::new);

        return user;
    }
}
