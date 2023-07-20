package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public List<UserDto> getAll() {
        return userService.getAllUser();
    }

    @PutMapping(value = "update/{userId}")
    public UserDto updateUser(@PathVariable String userId, @RequestBody UserDto user) {
        return userService.update(userId, user);
    }

}