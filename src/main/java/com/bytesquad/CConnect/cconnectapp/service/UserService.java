package com.bytesquad.CConnect.cconnectapp.service;


import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
//import repository.UserRepository;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

  //  private final UserRepository userRepository;

    private final UserAssembler userAssembler;
    public UserInformationDto login(UserLoginDto userLoginDto){
        return new UserInformationDto()
                .setUserId(new UUID(0,5))
                .setFirstName("Daniel")
                .setLastName("Ogunrinde")
                .setEmail("daniel@adspark.ca")
                .setPhoneNumber("306-519-2188")
                .setBio("real ass nigga");
//        User user = userRepository.findById(userDto.getUserId()).orElseThrow();
//        return userAssembler.assemble(user);
    }

    public UserLoginDto register(UserLoginDto userLoginDto){
//        User user = userAssembler.disassemble(userDto);
//        userRepository.save(user);
//        return userAssembler.assemble(user);
        return null;
    }

    public UserLoginDto getUser(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
