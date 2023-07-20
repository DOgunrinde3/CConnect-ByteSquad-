package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.AppointmentAssembler;
import com.bytesquad.CConnect.cconnectapp.assembler.StaffAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.AppointmentDto;
import com.bytesquad.CConnect.cconnectapp.entity.Appointment;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {

    private final MongoTemplate mongoTemplate;

    private final AppointmentRepository appointmentRepository;

    private final AppointmentAssembler appointmentAssembler;

    private final StaffAssembler staffAssembler;


    public List<ResponseEntity<?>> bulkBook(List<AppointmentDto> appointmentDto) {

        return appointmentDto
                .stream()
                .map(appointmentDto1 -> book(appointmentDto1))
                .collect(Collectors.toList());


    }

    public ResponseEntity<?> book(AppointmentDto appointmentDto) {

        if (appointmentDto.getDoctor() == null) {
            appointmentDto.setDoctor(getRandomAvailableDoctor(appointmentDto));
        }

        Appointment appointment = appointmentAssembler.disassemble(appointmentDto);


        try {
            Appointment createdAppointment = appointmentRepository.insert(appointment);

            return ResponseEntity.ok(createdAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Appointment already exists");
        }

    }

    public List<AppointmentDto> getAllUserAppointments(String userid) {

        if (userid.isEmpty() || userid == null) {
            return List.of();
        }
        Query query = new Query();
        query.addCriteria(Criteria.where("patientId").is(userid));

        List<Appointment> appointmentDtos = mongoTemplate.find(query, Appointment.class);

        return appointmentDtos.stream().map(appointmentAssembler::assemble).collect(Collectors.toList());

    }

    public List<AppointmentDto> getAppointmentsByDoctor(String doctorId) {

        Query query = new Query();
        query.addCriteria(Criteria.where("doctorId").is(doctorId));

        List<Appointment> appointmentDtos = mongoTemplate.find(query, Appointment.class);

        return appointmentDtos.stream().map(appointmentAssembler::assemble).collect(Collectors.toList());
    }

    public AppointmentDto update(String appointmentId, AppointmentDto appointment) {
        Query query = new Query();
        query.addCriteria(Criteria.where("Id").is(appointmentId));

        if (appointment.getAppointmentStatus().equals("Cancelled")) {
            Query newQuery = new Query();
            newQuery.addCriteria(Criteria.where("time").is(appointment.getAppointmentTime()));
            newQuery.addCriteria(Criteria.where("date").is(LocalDate.parse(appointment.getAppointmentDate())));
            newQuery.addCriteria(Criteria.where("appointmentStatus").is("Cancelled"));


            mongoTemplate.remove(newQuery, Appointment.class);
        }

        Update update = new Update().set("appointmentStatus", appointment.getAppointmentStatus());
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);


        Appointment updatedAppointment = mongoTemplate.findAndModify(query, update, options, Appointment.class);

        return appointmentAssembler.assemble(updatedAppointment);
    }

    private String getRandomAvailableDoctor(AppointmentDto appointmentDto) {
        List<Staff> allDoctors = mongoTemplate.findAll(Staff.class);


        Query query = new Query();
        query.addCriteria(Criteria.where("date").is(appointmentDto.getAppointmentDate()));
        query.addCriteria(Criteria.where("time").is(appointmentDto.getAppointmentTime()));

        Set<String> unAvailableDoctors = mongoTemplate.find(query, Appointment.class)
                .stream()
                .map(Appointment::getDoctorId)
                .collect(Collectors.toSet());

        return staffAssembler.getStaffName(allDoctors
                .stream()
                .filter(staff -> !unAvailableDoctors.contains(staff.getUserId()) && staff.getServices().contains(appointmentDto.getAppointmentType()))
                .findFirst()
                .orElseThrow(NotFoundException::new)
                .getUserId());


    }


}
