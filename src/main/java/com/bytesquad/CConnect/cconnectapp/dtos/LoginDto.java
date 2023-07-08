package com.bytesquad.CConnect.cconnectapp.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;

@Data
@Accessors(chain = true)
public class LoginDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
