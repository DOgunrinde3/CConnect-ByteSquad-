package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.assembler.CompanyAssembler;
import com.bytesquad.CConnect.cconnectapp.dtos.CompanyDto;
import com.bytesquad.CConnect.cconnectapp.entity.Company;
import com.bytesquad.CConnect.cconnectapp.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyAssembler companyAssembler;
    private final UserService userService;
    private final CompanyRepository companyRepository;

    public CompanyDto create(CompanyDto companyDto){
        Company company = companyAssembler.disassemble(companyDto);
       return companyAssembler.assemble(companyRepository.insert(company));
    }
}
