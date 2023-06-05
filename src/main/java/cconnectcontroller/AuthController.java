package cconnectcontroller;

import dtos.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import service.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/login")
    public UserDto login(@RequestBody UserDto userDto){
        return userService.login(userDto);
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto){
        return userService.register(userDto);
    }

    @GetMapping("/{userId}")
    public UserDto getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }


}
