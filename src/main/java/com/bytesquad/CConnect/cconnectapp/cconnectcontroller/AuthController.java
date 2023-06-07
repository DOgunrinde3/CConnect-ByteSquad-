package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.CompanyRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
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
    public UserInformationDto createCompany(@RequestBody CompanyRegistrationDto companyRegistrationDto, @RequestBody UserLoginDto userLoginDto){
        return companyService.create(companyRegistrationDto);
    }

    @GetMapping("/{userId}")
    public UserLoginDto getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }


}
