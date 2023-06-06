package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UnregisteredUser {
    private String firstName;
    private String lastName;
}
