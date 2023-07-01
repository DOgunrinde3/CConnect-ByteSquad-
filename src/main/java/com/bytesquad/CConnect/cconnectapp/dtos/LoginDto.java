package com.bytesquad.CConnect.cconnectapp.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginDto {
    private String email;
    private String password;
}
