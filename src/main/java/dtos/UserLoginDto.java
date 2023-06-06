package dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Optional;

@Data
@Accessors(chain = true)
public class UserLoginDto {
    private String username;
    private String password;
    private Integer companyCode;
    private Optional<UserInformationDto> userInformationDto;

}
