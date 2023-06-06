package service;


import assembler.UserAssembler;
import dtos.UserInformationDto;
import dtos.UserLoginDto;
import lombok.RequiredArgsConstructor;
import org.jvnet.hk2.annotations.Service;
//import repository.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

  //  private final UserRepository userRepository;

    private final UserAssembler userAssembler;
    public UserInformationDto login(UserLoginDto userLoginDto){
        return new UserInformationDto()
                .setUserId(new UUID(0,5))
                .setFirstName("Daniel")
                .setLastName("Ogunrinde")
                .setEmail("daniel@adspark.ca")
                .setPhoneNumber("306-519-2188")
                .setBio("real ass nigga");
//        User user = userRepository.findById(userDto.getUserId()).orElseThrow();
//        return userAssembler.assemble(user);
    }

    public UserLoginDto register(UserLoginDto userLoginDto){
//        User user = userAssembler.disassemble(userDto);
//        userRepository.save(user);
//        return userAssembler.assemble(user);
        return null;
    }

    public UserLoginDto getUser(UUID userId){
//        User user = userRepository.findById(userId).orElseThrow();
//        return userAssembler.assemble(user);
        return null;
    }
}
