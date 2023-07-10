package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.NotificationAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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
    private final UserService userService;


    public NotificationDto createNotification(NotificationDto notificationDto){

        Notification notification = notificationAssembler.disassemble(notificationDto);

        notificationRepository.insert(notification);

        return notificationAssembler.assemble(notification);

    }

    public NotificationDto updateNotification(NotificationDto notification, boolean toStaff){
        Query query = new Query();
        query.addCriteria(Criteria.where("Id").is(notification.getId()));
        String notifiedUserId ="";

        if(toStaff){
            notifiedUserId = userService.getStaffId(notification.getNotifiedUserId());
        }
        else{
            notifiedUserId = userService.getUserId(notification.getNotifiedUserId());
        }

        Update update = new Update()
                .set("appointment", notification.getAppointment())
                .set("notifiedUserId", notifiedUserId)
                .set("notifiedFromId", notification.getNotifiedFromId());
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        Notification updatedNotification = mongoTemplate.findAndModify(query, update, options, Notification.class);

        return notificationAssembler.assemble(updatedNotification);
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
