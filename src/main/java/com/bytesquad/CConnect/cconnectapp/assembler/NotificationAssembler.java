package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class NotificationAssembler {
    public NotificationDto assemble(Notification notification){
        return new NotificationDto()
                .setId(notification.getId())
                .setNotifiedUserId(notification.getNotifiedUserId())
                .setAppointmentId(notification.getAppointmentId());
    }

    public Notification disassemble(NotificationDto notificationDto){
        return disassembleInto(Notification.newInstance(), notificationDto);
    }

    public Notification disassembleInto(Notification notification, NotificationDto notificationDto) {


        return notification
                .setNotifiedUserId(notificationDto.getNotifiedUserId())
                .setAppointmentId(notificationDto.getAppointmentId());
    }

}
