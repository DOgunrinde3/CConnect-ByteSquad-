package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Accessors(chain = true)
@Document()
@Getter
@Setter
public class UnregisteredUser {
    private String firstName;
    private String lastName;
}
