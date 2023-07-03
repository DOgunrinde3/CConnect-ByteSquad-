package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.AppointmentAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.AppointmentRepository;
import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.ws.rs.NotFoundException;
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

        if(appointmentDto.getDoctorId() == null){
           appointmentDto.setDoctorId(getRandomAvailableDoctor(appointmentDto));
        }

        Appointment appointment = appointmentAssembler.disassemble(appointmentDto);

            appointmentRepository.insert(appointment);

        return appointmentAssembler.assemble(appointment);

    }

    private String getRandomAvailableDoctor(AppointmentDto appointmentDto){
      List<Staff> allDoctors = mongoTemplate.findAll(Staff.class);



        Query query = new Query();
        query.addCriteria(Criteria.where("date").is(appointmentDto.getAppointmentDate()));
        query.addCriteria(Criteria.where("time").is(appointmentDto.getAppointmentTime()));

        Set<String> unAvailableDoctors = mongoTemplate.find(query, Appointment.class)
                .stream()
                .map(Appointment::getDoctorId)
                .collect(Collectors.toSet());

      return allDoctors
              .stream()
              .filter( staff -> !unAvailableDoctors.contains(staff.getUserId()) && staff.getServices().contains(appointmentDto.getAppointmentType()))
              .findFirst()
              .orElseThrow(NotFoundException::new)
              .getUserId();


    }


}
