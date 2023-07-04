package com.bytesquad.CConnect.cconnectapp.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AppointmentDto {
    private String doctorId;
    private String patientId;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentType;
    private String appointmentStatus;
}
