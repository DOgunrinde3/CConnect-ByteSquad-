package com.bytesquad.CConnect.cconnectapp.dtos.user;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginDto {
    private String username;
    private String email;
    private String password;
}
