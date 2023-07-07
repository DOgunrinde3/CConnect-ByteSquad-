package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.NotificationAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationAssembler notificationAssembler;
    private final NotificationRepository notificationRepository;
    private final MongoTemplate mongoTemplate;


    public NotificationDto createNotification(NotificationDto notificationDto){

        Notification notification = notificationAssembler.disassemble(notificationDto);

        notificationRepository.insert(notification);

        return notificationAssembler.assemble(notification);

    }

    public List<NotificationDto> getUserNotifications(String userId){

        Query query = new Query();
        query.addCriteria(Criteria.where("notifiedUserId").is(userId));

        List<Notification> notifications = mongoTemplate.find(query, Notification.class)
                .stream()
                .collect(Collectors.toList());

        return notifications.stream().map(notificationAssembler::assemble).collect(Collectors.toList());


    }
}
