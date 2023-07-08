package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.configuration.JwtResponse;
import com.bytesquad.CConnect.cconnectapp.configuration.JwtTokenUtil;
import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.UserRepository;
import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class UserService {

  private final MongoTemplate mongoTemplate;

  private final UserRepository userRepository;

    private final StaffAssembler staffAssembler;

    private final UserAssembler userAssembler;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;

    private String ROLE_USER = "ROLE_USER";
    private String ROLE_STAFF = "ROLE_STAFF";




    private LocalDate minYear = LocalDate.now().minusYears(18);



    public ResponseEntity<?> login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());

            String token = jwtTokenUtil.generateToken(userDetails, false);

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }



    public ResponseEntity<?> register(UserRegistrationDto userRegistrationDto){
         User user = userAssembler.disassemble(userRegistrationDto);
         if(user.getBirthdate().isAfter(minYear) || user.getBirthdate().isEqual(minYear) ){
             ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is too young");
         }

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        try {
            userRepository.insert(user);
        } catch (DuplicateKeyException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

            LoginDto login = new LoginDto().setEmail(user.getEmail()).setPassword(user.getPassword());

       return login(login);

    }

    public ResponseEntity<?> getUser(String email, String role){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));

        if(role.equals(ROLE_USER)){
            User user = mongoTemplate.findOne(query, User.class);
            return ResponseEntity.ok(userAssembler.assemble(user));
        }

        else if(role.equals(ROLE_STAFF)){
            Staff staff = mongoTemplate.findOne(query, Staff.class);
            return ResponseEntity.ok(staffAssembler.assemble(staff));
        }


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
