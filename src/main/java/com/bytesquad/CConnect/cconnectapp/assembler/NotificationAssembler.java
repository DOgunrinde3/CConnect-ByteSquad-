package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class NotificationAssembler {

    private final AppointmentAssembler appointmentAssembler;

    public NotificationDto assemble(Notification notification){
        return new NotificationDto()
                .setId(notification.getNotificationId())
                .setNotifiedUserId(notification.getNotifiedUserId())
                .setAppointment(appointmentAssembler.assemble(notification.getAppointment()))
                .setNotifiedFromId(notification.getNotifiedFromId());
    }

    public Notification disassemble(NotificationDto notificationDto){
        return disassembleInto(Notification.newInstance(), notificationDto);
    }

    public Notification disassembleInto(Notification notification, NotificationDto notificationDto) {


        return notification
                .setNotifiedUserId(notificationDto.getNotifiedUserId())
                .setAppointment(appointmentAssembler.disassembleForNotification(new Appointment(), notificationDto.getAppointment()))
                .setNotifiedFromId(notificationDto.getNotifiedFromId());
    }

}
