package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.service.StaffService;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final StaffService staffService;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginDto loginDto){
        return userService.login(loginDto);
    }


    @PostMapping("/register-user")
    public UserDto registerUser(@RequestBody RegistrationDto registrationDto){
        return userService.register(registrationDto);
    }

    @PostMapping("/register-doctor")
    public StaffDto registerDoctor(@RequestBody RegistrationDto registrationDto){
        return staffService.register(registrationDto);
    }

    @GetMapping("/user/{userId}")
    public UserDto getUser(@PathVariable String userId){
        return userService.getUser(userId);
    }

    @PutMapping("/user/{userId}")
    public UserDto getUser(@PathVariable String userId, @RequestBody UserDto userDto){
        return userService.getUser(userId);
    }


}
