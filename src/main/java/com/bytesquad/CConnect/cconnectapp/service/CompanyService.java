package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.CompanyAssembler;
import com.bytesquad.CConnect.cconnectapp.assembler.UserAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.CompanyRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.entity.Company;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyAssembler companyAssembler;
    private final UserService userService;
    private final CompanyRepository companyRepository;

    public UserInformationDto create(CompanyRegistrationDto companyRegistrationDto){

        Company company = companyAssembler.disassemble(companyRegistrationDto);
        companyRepository.insert(company);
        companyRegistrationDto
                .getCompanyAdmin()
                .getUserInformationDto()
                .setIsAdmin(true);
       return  userService.register(companyRegistrationDto.getCompanyAdmin());
    }
}
