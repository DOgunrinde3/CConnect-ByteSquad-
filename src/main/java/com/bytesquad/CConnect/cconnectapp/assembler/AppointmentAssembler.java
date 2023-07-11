package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class AppointmentAssembler {

    private final UserService userService;
    public AppointmentDto assemble(Appointment appointment){
        return new AppointmentDto()
                .setId(appointment.getId())
                .setDoctor(userService.getStaffName(appointment.getDoctorId()))
                .setPatient(userService.getUserName(appointment.getPatientId()))
                .setAppointmentDate(appointment.getDate().toString())
                .setAppointmentTime(appointment.getTime().toString())
                .setAppointmentType(appointment.getAppointmentType())
                .setAppointmentStatus(appointment.getAppointmentStatus());
    }

    public Appointment disassemble(AppointmentDto appointmentDto){
        return disassembleInto(Appointment.newInstance(), appointmentDto);
    }

    public Appointment disassembleInto(Appointment appointment, AppointmentDto appointmentDto) {


        LocalDate date = LocalDate.parse(appointmentDto.getAppointmentDate());

        return appointment
                .setDoctorId(userService.getStaffId(appointmentDto.getDoctor()))
                .setPatientId(userService.getUserId(appointmentDto.getPatient()))
                .setDate(date)
                .setTime(appointmentDto.getAppointmentTime())
                .setAppointmentType(appointmentDto.getAppointmentType())
                .setAppointmentStatus(appointmentDto.getAppointmentStatus());
    }

    public Appointment disassembleForNotification(Appointment appointment, AppointmentDto appointmentDto) {


        LocalDate date = LocalDate.parse(appointmentDto.getAppointmentDate());

        return appointment
                .setId(appointmentDto.getId())
                .setDoctorId(userService.getStaffId(appointmentDto.getDoctor()))
                .setPatientId(userService.getUserId(appointmentDto.getPatient()))
                .setDate(date)
                .setTime(appointmentDto.getAppointmentTime())
                .setAppointmentType(appointmentDto.getAppointmentType())
                .setAppointmentStatus(appointmentDto.getAppointmentStatus());
    }



}
