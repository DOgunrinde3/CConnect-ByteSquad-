package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.CompanyRegistrationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.entity.Company;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

@Component
public class CompanyAssembler {

    public Company disassemble(CompanyRegistrationDto companyRegistrationDto){
        return Company.newInstance(companyRegistrationDto.getCompanyName());
    }

//    public Company updateUnregisteredUsers(CompanyRegistrationDto companyRegistrationDto, Company company){
//        return company
//                .setCompanyName(company.getCompanyName());
//    }

}
