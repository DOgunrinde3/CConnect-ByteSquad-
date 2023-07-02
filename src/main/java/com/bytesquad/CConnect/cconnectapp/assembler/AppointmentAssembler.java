package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.Locale;

@Component

public class AppointmentAssembler {
    public AppointmentDto assemble(Appointment appointment){
        return new AppointmentDto()
                .setStaffId(appointment.getStaffId())
                .setPatientId(appointment.getPatientId())
                .setAppointmentDate(appointment.getDate().toString())
                .setAppointmentTime(appointment.getTime().toString())
                .setAppointmentType(appointment.getAppointmentType());
    }

    public Appointment disassemble(AppointmentDto appointmentDto){
        return disassembleInto(Appointment.newInstance(), appointmentDto);
    }

    public Appointment disassembleInto(Appointment appointment, AppointmentDto appointmentDto) {


        LocalDate date = LocalDate.parse(appointmentDto.getAppointmentDate());

        return appointment
                .setStaffId(appointmentDto.getStaffId())
                .setPatientId(appointmentDto.getPatientId())
                .setDate(date)
                .setTime(appointmentDto.getAppointmentTime())
                .setAppointmentType(appointmentDto.getAppointmentType());
    }

}
