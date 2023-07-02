package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.AppointmentAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {

    private final MongoTemplate mongoTemplate;

    private final AppointmentRepository appointmentRepository;

    private final AppointmentAssembler appointmentAssembler;

    public AppointmentDto book(AppointmentDto appointmentDto){

        if(appointmentDto.getStaffId() == null){
           appointmentDto.setStaffId(getRandomAvailableDoctor(appointmentDto.getAppointmentDate(), appointmentDto.getAppointmentTime()));
        }

        Appointment appointment = appointmentAssembler.disassemble(appointmentDto);

        appointmentRepository.insert(appointment);
        return appointmentAssembler.assemble(appointment);

    }

    private String getRandomAvailableDoctor(String date, String time){
      List<Staff> allDoctors = mongoTemplate.findAll(Staff.class);



        Query query = new Query();
        query.addCriteria(Criteria.where("date").is(date));
        query.addCriteria(Criteria.where("time").is(time));

        Set<String> unAvailableDoctors = mongoTemplate.find(query, Appointment.class)
                .stream()
                .map(Appointment::getStaffId)
                .collect(Collectors.toSet());

      return allDoctors.stream().filter( staff -> !unAvailableDoctors.contains(staff.getUserId())).findFirst().orElse(new Staff().setUserId("daniel")).getUserId();

    }


}
