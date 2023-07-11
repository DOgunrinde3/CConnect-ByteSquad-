package com.bytesquad.CConnect.cconnectapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Getter
@Setter
@Data
@Document()
@Accessors(chain = true)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String notificationId;
    private Appointment appointment;
    private String notifiedUserId;
    private String notifiedFromId;


    public static Notification newInstance(){
        Notification newInstance = new Notification();
        newInstance.notificationId = UUID.randomUUID().toString();
        return newInstance;
    }
}
