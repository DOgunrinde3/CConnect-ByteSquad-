package assembler;

import dtos.UserDto;
import entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {

    public UserDto assemble(User user){
        return new UserDto();
    }

    public User disassemble(UserDto userDto){
        return new User();
    }

    public User disassembleInto(User entity, UserDto userDto){
        return new User();
    }
}
