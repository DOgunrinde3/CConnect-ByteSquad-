package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class Appointment {
}
