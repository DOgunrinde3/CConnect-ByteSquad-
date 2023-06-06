package service;


import assembler.UserAssembler;
import dtos.UserDto;
import entity.User;
import lombok.RequiredArgsConstructor;
import org.jvnet.hk2.annotations.Service;
//import repository.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

  //  private final UserRepository userRepository;

    private final UserAssembler userAssembler;
    public UserDto login(UserDto userDto){
//        User user = userRepository.findById(userDto.getUserId()).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }

    public UserDto register(UserDto userDto){
//        User user = userAssembler.disassemble(userDto);
//        userRepository.save(user);
//        return userAssembler.assemble(user);
        return null;
    }

    public UserDto getUser(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
