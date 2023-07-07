package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.service.StaffService;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/login-staff")
    public StaffDto loginStaff(@RequestBody LoginDto loginDto){
        return staffService.login(loginDto);
    }


    @PostMapping("/register-user")
    public UserDto registerUser(@RequestBody UserRegistrationDto userRegistrationDto){
        return userService.register(userRegistrationDto);
    }

    @PostMapping("/register-staff")
    public StaffDto registerStaff(@RequestBody StaffRegistrationDto staffRegistrationDto){
        return staffService.register(staffRegistrationDto);
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
