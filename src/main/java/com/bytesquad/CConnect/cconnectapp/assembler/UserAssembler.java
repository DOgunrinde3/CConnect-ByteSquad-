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
        return new User();
    }

    public User disassembleInto(User entity, UserLoginDto userLoginDto){
        return new User();
    }
}
