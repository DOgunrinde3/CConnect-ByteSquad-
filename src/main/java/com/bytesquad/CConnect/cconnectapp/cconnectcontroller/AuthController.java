package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.LoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto, false);
    }

    @PostMapping("/login-staff")
    public ResponseEntity<?> loginStaff(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto, true);
    }


    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userRegistrationDto) {
        return userService.registerUser(userRegistrationDto);
    }

    @PostMapping("/register-staff")
    public ResponseEntity<?> registerStaff(@RequestBody StaffRegistrationDto staffRegistrationDto) {
        return userService.registerStaff(staffRegistrationDto);
    }

    @GetMapping(value = "/user/{email}", params = "role")
    public ResponseEntity<?> getUser(@PathVariable String email, @RequestParam String role) {
        return userService.getUser(email, role);
    }

    @PutMapping("/user/update/{userId}")
    public UserDto User(@PathVariable String userId, @RequestBody UserDto userDto) {
        return userService.update(userId, userDto);
    }


    @GetMapping("/staff")
    public List<StaffDto> getAll() {
        return userService.getAllStaff();
    }

//    @PutMapping("/staff/update/{userId}")
//    public StaffDto Staff(@PathVariable String userId, @RequestBody StaffDto staffDto){
////        return userService.update(userId, staffDto);
//    }
}
