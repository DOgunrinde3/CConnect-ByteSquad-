package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
@CompoundIndex(def = "{'doctorId': 1, 'date': 1, 'time': 1, 'appointmentStatus': 1}", unique = true)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String doctorId;
    private String patientId;
    @Indexed(name = "date", expireAfterSeconds = 3600)
    private LocalDate date;
    private String time;
    //these should be an enum but I dont have time
    private String appointmentType;
    private String appointmentStatus;


    public static Appointment newInstance() {
        Appointment newInstance = new Appointment();
        newInstance.id = UUID.randomUUID().toString();
        return newInstance;
    }
}
