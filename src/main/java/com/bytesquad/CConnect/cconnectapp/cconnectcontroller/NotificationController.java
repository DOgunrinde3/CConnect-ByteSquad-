package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.NotificationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.StaffRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.dtos.user.UserDto;
import com.bytesquad.CConnect.cconnectapp.entity.Notification;
import com.bytesquad.CConnect.cconnectapp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/create-notification")
    public NotificationDto createNotification(@RequestBody NotificationDto notificationDto){
        return notificationService.createNotification(notificationDto);
    }

    @GetMapping("{userId}")
    public List<NotificationDto> getNotifications(@PathVariable String userId){
        return notificationService.getUserNotifications(userId);
    }
}
