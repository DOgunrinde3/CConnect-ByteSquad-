package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.CompanyDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.service.CompanyService;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final CompanyService companyService;

    @PostMapping("/login")
    public UserInformationDto login(@RequestBody UserLoginDto userLoginDto){
        return userService.login(userLoginDto);
    }

    @PostMapping("/create-company")
    public CompanyDto createCompany(@RequestBody CompanyDto companyDto){
        return companyService.create(companyDto);
    }

    @PostMapping("/register-user")
    public UserInformationDto registerUser(@RequestBody UserRegistrationDto userRegistrationDto){
        return userService.register(userRegistrationDto);
    }

    @GetMapping("/{userId}")
    public UserLoginDto getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }


}
