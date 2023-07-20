package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.AppointmentAssembler;
import com.bytesquad.CConnect.cconnectapp.assembler.NotificationAssembler;
import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import com.bytesquad.CConnect.cconnectapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationAssembler notificationAssembler;
    private final AppointmentAssembler appointmentAssembler;

    private final NotificationRepository notificationRepository;
    private final MongoTemplate mongoTemplate;
    private final UserAssembler userAssembler;
    private final StaffAssembler staffAssembler;


    public NotificationDto createNotification(NotificationDto notificationDto) {

        Notification notification = notificationAssembler.disassemble(notificationDto);

        notificationRepository.insert(notification);

        return notificationAssembler.assemble(notification);

    }

    public ResponseEntity<?> updateNotification(NotificationDto notification, boolean toStaff, String notificationId) {

        Query query = new Query();
        query.addCriteria(Criteria.where("appointment.id").is(notificationId));
        String notifiedUserId = "";

        if (toStaff) {
            notifiedUserId = staffAssembler.getStaffId(notification.getNotifiedUserId());
        } else {
            notifiedUserId = userAssembler.getUserId(notification.getNotifiedUserId());
        }

        Update update = new Update()
                .set("appointment", appointmentAssembler.disassembleForNotification(new Appointment(), notification.getAppointment()))
                .set("notifiedUserId", notifiedUserId)
                .set("notifiedFromId", notification.getNotifiedFromId());
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        try {
            Notification notification1 = mongoTemplate.findAndModify(query, update, options, Notification.class);

            return ResponseEntity.ok(notification1);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Appointment already exists");
        }


    }

    public List<NotificationDto> getUserNotifications(String userId) {

        Query query = new Query();
        query.addCriteria(Criteria.where("notifiedUserId").is(userId));

        List<Notification> notifications = mongoTemplate.find(query, Notification.class);

        Iterator<Notification> iterator = notifications.iterator();
        while (iterator.hasNext()) {
            Notification notification = iterator.next();
            Query appointmentQuery = new Query();
            appointmentQuery.addCriteria(Criteria.where("id").is(notification.getAppointment().getId()));

            if (mongoTemplate.findOne(appointmentQuery, Appointment.class) == null) {
                Query delete = new Query();
                delete.addCriteria(Criteria.where("notificationId").is(notification.getNotificationId()));
                mongoTemplate.remove(delete, Notification.class);
                iterator.remove(); // Remove the deleted notification from the list
            }


        }

        return notifications.stream().map(notificationAssembler::assemble).collect(Collectors.toList());

    }
}
