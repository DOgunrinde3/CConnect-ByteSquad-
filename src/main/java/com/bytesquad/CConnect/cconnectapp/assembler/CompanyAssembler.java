package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.CompanyDto;
import com.bytesquad.CConnect.cconnectapp.entity.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyAssembler {

    public Company disassemble(CompanyDto companyDto){
        return Company.newInstance(companyDto.getCompanyName());
    }

    public CompanyDto assemble(Company company){
        return new CompanyDto()
                .setCompanyName(company.getCompanyName())
                .setCompanyCode(company.getCompanyCode());
    }

    public Company disassembleInto(CompanyDto companyDto){
        return Company.newInstance(companyDto.getCompanyName());
    }



//    public Company updateUnregisteredUsers(CompanyRegistrationDto companyRegistrationDto, Company company){
//        return company
//                .setCompanyName(company.getCompanyName());
//    }

}
