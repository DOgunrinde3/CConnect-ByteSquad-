package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.dtos.RegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.staff.StaffDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component

public class AppointmentAssembler {
    public AppointmentDto assemble(Appointment appointment){
        return new AppointmentDto()
                .setStaffId(appointment.getStaffId())
                .setPatientId(appointment.getPatientId())
                .setDate(appointment.getDate().toString())
                .setTime(appointment.getTime().toString());
    }

    public Appointment disassemble(AppointmentDto appointmentDto){
        return disassembleInto(Appointment.newInstance(), appointmentDto);
    }

    public Appointment disassembleInto(Appointment appointment, AppointmentDto appointmentDto){
        LocalDate date = LocalDate.parse(appointmentDto.getDate());
        LocalTime time = LocalTime.parse(appointmentDto.getTime());


        return appointment
                .setStaffId(appointmentDto.getStaffId())
                .setPatientId(appointmentDto.getPatientId())
                .setDate(date)
                .setTime(time);
    }
}
