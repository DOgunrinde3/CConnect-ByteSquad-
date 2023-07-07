package com.bytesquad.CConnect.cconnectapp.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class NotificationDto {
    private String Id;
    private String appointmentId;
    private String apointmentStatus;
    private String notifiedUserId;
    private String notifiedFromId;

}
