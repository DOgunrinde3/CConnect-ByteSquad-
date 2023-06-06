package com.bytesquad.CConnect.cconnectapp.assembler;

import com.bytesquad.CConnect.cconnectapp.dtos.UserInformationDto;
import com.bytesquad.CConnect.cconnectapp.dtos.UserLoginDto;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {


    public UserInformationDto assemble(User user){
        return new UserInformationDto();
    }

    public User disassemble(UserLoginDto userLoginDto){
        return disassembleInto(User.newInstance(), userLoginDto);
    }

    public User disassembleInto(User user, UserLoginDto userLoginDto){

        return user
                .setBio(userLoginDto.getUserInformationDto().getBio())
                .setEmail(userLoginDto.getUserInformationDto().getEmail())
                .setPassword(userLoginDto.getPassword())
                .setIsAdmin(userLoginDto.getUserInformationDto().getIsAdmin())
                .setPhoneNumber(userLoginDto.getUserInformationDto().getPhoneNumber())
                .setCompanyCode(userLoginDto.getCompanyCode());
    }
}
