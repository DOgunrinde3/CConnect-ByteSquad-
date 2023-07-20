package com.bytesquad.CConnect.cconnectapp.cconnectcontroller;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<?> book(@RequestBody AppointmentDto appointmentDto) {
        return appointmentService.book(appointmentDto);
    }

    @PostMapping("/bulk-book")
    public List<ResponseEntity<?>> bulkBook(@RequestBody List<AppointmentDto> appointmentDto) {
        return appointmentService.bulkBook(appointmentDto);
    }

    @GetMapping("user/{userId}")
    public List<AppointmentDto> getAllUsersAppointments(@PathVariable String userId) {
        return appointmentService.getAllUserAppointments(userId);
    }

    @GetMapping(value = "doctor/{doctorId}")
    public List<AppointmentDto> getAppointmentsByDoctor(@PathVariable String doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @PutMapping(value = "update/{appointmentId}")
    public AppointmentDto updateAppointment(@PathVariable String appointmentId, @RequestBody AppointmentDto appointment) {
        return appointmentService.update(appointmentId, appointment);
    }

}
