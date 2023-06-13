package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.doctor.StaffInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public UserDto login(@RequestBody UserLoginDto userLoginDto){
        return userService.login(userLoginDto);
    }


    @PostMapping("/register-user")
    public UserDto registerUser(@RequestBody RegistrationDto registrationDto){
        return userService.register(registrationDto);
    }

    @PostMapping("/register-doctor")
    public StaffInformationDto registerDoctor(@RequestBody RegistrationDto registrationDto){
        return userService.register(registrationDto);
    }

    @GetMapping("/{userId}")
    public UserLoginDto getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }


}
