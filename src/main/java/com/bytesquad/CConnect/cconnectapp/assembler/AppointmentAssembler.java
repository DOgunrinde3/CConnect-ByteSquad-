package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component

public class AppointmentAssembler {
    public AppointmentDto assemble(Appointment appointment){
        return new AppointmentDto()
                .setDoctorId(appointment.getDoctorId())
                .setPatientId(appointment.getPatientId())
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
                .setDoctorId(appointmentDto.getDoctorId())
                .setPatientId(appointmentDto.getPatientId())
                .setDate(date)
                .setTime(appointmentDto.getAppointmentTime())
                .setAppointmentType(appointmentDto.getAppointmentType())
                .setAppointmentStatus(appointmentDto.getAppointmentStatus());
    }

}
