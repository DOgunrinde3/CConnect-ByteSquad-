package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/create-notification")
    public NotificationDto createNotification(@RequestBody NotificationDto notificationDto) {
        return notificationService.createNotification(notificationDto);
    }

    @PutMapping(value = "/update-notification/{appointmentId}", params = "toStaff")
    public ResponseEntity<?> updateNotification(@PathVariable String appointmentId, @RequestBody NotificationDto notificationDto, @RequestParam boolean toStaff) {
        return notificationService.updateNotification(notificationDto, toStaff, appointmentId);
    }

    @GetMapping("{userId}")
    public List<NotificationDto> getNotifications(@PathVariable String userId) {
        return notificationService.getUserNotifications(userId);
    }
}
