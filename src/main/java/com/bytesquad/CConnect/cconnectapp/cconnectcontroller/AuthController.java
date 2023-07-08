package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.service.StaffService;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final StaffService staffService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        return userService.login(loginDto);
    }

    @PostMapping("/login-staff")
    public StaffDto loginStaff(@RequestBody LoginDto loginDto){
        return staffService.login(loginDto);
    }


    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userRegistrationDto){
        return userService.register(userRegistrationDto);
    }

    @PostMapping("/register-staff")
    public StaffDto registerStaff(@RequestBody StaffRegistrationDto staffRegistrationDto){
        return staffService.register(staffRegistrationDto);
    }

    @GetMapping(value = "/user/{email}", params = "role")
    public ResponseEntity<?> getUser(@PathVariable String email, @RequestParam String role){
           return userService.getUser(email, role);
    }

//    @PutMapping("/user/{userId}")
//    public UserDto User(@PathVariable String userId, @RequestBody UserDto userDto){
//        return userService.getUser(userId);
//    }


}
