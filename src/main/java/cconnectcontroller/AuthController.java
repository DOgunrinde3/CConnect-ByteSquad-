package cconnectcontroller;

import dtos.UserInformationDto;
import dtos.UserLoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import service.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public UserInformationDto login(@RequestBody UserLoginDto userLoginDto){
        return userService.login(userLoginDto);
    }

    @PostMapping("/register")
    public UserLoginDto register(@RequestBody UserLoginDto userLoginDto){
        return userService.register(userLoginDto);
    }

    @GetMapping("/{userId}")
    public UserLoginDto getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }


}
