package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.configuration.JwtResponse;
import com.bytesquad.CConnect.cconnectapp.configuration.JwtTokenUtil;
import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.StaffRepository;
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

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {

  private final MongoTemplate mongoTemplate;

  private final UserRepository userRepository;

    private final StaffAssembler staffAssembler;

    private final UserAssembler userAssembler;
    private final StaffRepository staffRepository;
    private final CustomAuthenticationProvider authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final StaffUserDetailsService staffUserDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;

    private String ROLE_USER = "ROLE_USER";
    private String ROLE_STAFF = "ROLE_STAFF";




    private LocalDate minYear = LocalDate.now().minusYears(18);



    public ResponseEntity<?> login(LoginDto loginDto, boolean isStaff) {
        String token;
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()), isStaff
            );

            if(isStaff){
                UserDetails staffDetails = staffUserDetailsService.loadUserByUsername(loginDto.getEmail());
                token = jwtTokenUtil.generateToken(staffDetails, true);

            }
            else {
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
                 token = jwtTokenUtil.generateToken(userDetails, false);

            }

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }



    public ResponseEntity<?> registerUser(UserRegistrationDto userRegistrationDto){
         User user = userAssembler.disassemble(userRegistrationDto);
        if(!isUserOldEnough(user.getBirthdate())){
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is too young");
        }

        String encryptPassword = encryptPassword(user.getPassword());

        user.setPassword(encryptPassword);

        try {
            userRepository.insert(user);
        } catch (DuplicateKeyException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

            LoginDto login = new LoginDto().setEmail(user.getEmail()).setPassword(user.getPassword());

       return ResponseEntity.ok(HttpStatus.CREATED);

    }


    public ResponseEntity<?> registerStaff(StaffRegistrationDto staffRegistrationDto){
        Staff staff = staffAssembler.disassemble(staffRegistrationDto);

        if(isUserOldEnough(staff.getBirthdate()) == false){
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is too young");
        }

        String encryptPassword = encryptPassword(staff.getPassword());


        staff.setPassword(encryptPassword);

        try {
            staffRepository.insert(staff);
        } catch (DuplicateKeyException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        LoginDto login = new LoginDto().setEmail(staff.getEmail()).setPassword(staff.getPassword());

        return ResponseEntity.ok(HttpStatus.CREATED);

    }

    public boolean isUserOldEnough(LocalDate birthdate){
        if(birthdate.isAfter(minYear) || birthdate.isEqual(minYear) ){
            return false;
        }

        return true;
    }

    public String encryptPassword(String password){
        return passwordEncoder.encode(password);
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


    public String getStaffName(String doctorId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(doctorId));

        Staff staff = mongoTemplate.findOne(query, Staff.class);
        if(staff == null){
            throw new NotFoundException("Staff Not Found");
        }

        return String.format(staff.getFirstName() + " " + staff.getLastName());
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

    public List<StaffDto> getAllStaff(){
        List<Staff> allStaff = staffRepository.findAll();
        return allStaff.stream()
                .map(staffAssembler::assemble)
                .collect(Collectors.toList());

    }

    public List<UserDto> getAllUser(){
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream()
                .map(userAssembler::assemble)
                .collect(Collectors.toList());

    }

}
