package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String Id;
    private String staffId;
    private String patientId;
    private LocalDate date;
    private String time;
    //this should be an enum but I dont have time
    private String appointmentType;


    public static Appointment newInstance(){
        Appointment newInstance = new Appointment();
        newInstance.Id = UUID.randomUUID().toString();
        return newInstance;
    }
}
